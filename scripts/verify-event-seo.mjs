// Dependency-free source/JSON checks; does not replace a Next build or DOM QA.
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const source = read('helpers/eventSeo.js')
const { eventSeo, faqStructuredData, serviceOffer } = vm.runInNewContext(
  source.replace(/export /g, '') + '\n;({ eventSeo, faqStructuredData, serviceOffer })'
)
const aliases = JSON.parse(read('jsconfig.json')).compilerOptions.paths

function dependencyH1Count(entry, seen = new Set()) {
  if (seen.has(entry)) return 0
  seen.add(entry)
  const text = read(entry)
  let count = (text.match(/<h1\b/g) || []).length
  const specifiers = [...text.matchAll(/(?:from\s*|import\s*\()\s*['"]([^'"]+)['"]/g)]
  for (const [, specifier] of specifiers) {
    let target
    if (specifier.startsWith('.')) target = path.join(path.dirname(entry), specifier)
    else if (specifier.startsWith('app/')) target = specifier
    else {
      for (const [alias, [destination]] of Object.entries(aliases)) {
        if (specifier.startsWith(alias.slice(0, -1))) {
          target = destination.slice(0, -1) + specifier.slice(alias.length - 1)
        }
      }
    }
    if (!target) continue
    const resolved = [target, `${target}.js`, `${target}/index.js`].find((candidate) =>
      fs.existsSync(path.join(root, candidate)) && fs.statSync(path.join(root, candidate)).isFile()
    )
    if (resolved && resolved.endsWith('.js')) count += dependencyH1Count(resolved, seen)
  }
  return count
}

const home = read('app/page.js')
const landing = read('app/components/EventLandingClient.js')
assert.match(landing, /\{hero.titleBefore\}\{' '\}\s*<br/)
assert.match(landing, /\{hero.titleAccent\}\s*<\/span>\{' '\}\s*<br/)
assert.match(landing, /Стоимость — \{priceLabel\}/)
assert.match(landing, /proofPoints = .*Стоимость — \$\{priceLabel\}/)
assert.equal((landing.match(/<FaqBlock\b/g) || []).length, 1)
assert.equal((landing.match(/<OtherFormatsBlock\b/g) || []).length, 1)
assert.equal((home.match(/<FaqBlock\b/g) || []).length, 1)
assert.equal((home.match(/<OtherFormatsBlock\b/g) || []).length, 1)
assert.match(home, /<OtherFormatsBlock current="home"/)
assert.match(home, /faqStructuredData\(eventSeo.home.faq\)/)
assert.match(read('blocks/titleComponents/Content.js'), /Стоимость — от 12 000 ₽; взрослые форматы — от 15 000 ₽/)
const otherFormats = read('blocks/OtherFormatsBlock.js')
assert.match(otherFormats, /formats.filter\(\(\{ slug \}\) => slug !== current\)/)
const slugs = [...otherFormats.matchAll(/slug: '([^']+)'/g)].map((m) => m[1])
assert.equal(new Set(slugs).size, 4)
const faqSignatures = new Set()

for (const [slug, data] of Object.entries(eventSeo)) {
  const pagePath = slug === 'home' ? 'app/page.js' : `app/${slug}/page.js`
  assert.equal(dependencyH1Count(pagePath), 1, `${slug}: source dependency graph must contain one h1`)
  const faq = JSON.parse(JSON.stringify(faqStructuredData(data.faq)))
  assert.equal(faq['@type'], 'FAQPage')
  assert.equal(faq.mainEntity.length, slug === 'home' ? 4 : 3)
  assert.equal(new Set(data.faq.map((item) => item.question)).size, data.faq.length)
  for (const [index, item] of faq.mainEntity.entries()) {
    assert.equal(item['@type'], 'Question')
    assert.equal(item.name, data.faq[index].question)
    assert.equal(item.acceptedAnswer['@type'], 'Answer')
    assert.equal(item.acceptedAnswer.text, data.faq[index].answer)
  }
  const signature = JSON.stringify(data.faq)
  assert(!faqSignatures.has(signature), `${slug}: copied full FAQ`)
  faqSignatures.add(signature)
  assert.equal(slugs.filter((item) => item !== slug).length, slug === 'home' ? 4 : 3)
  if (slug !== 'home') {
    const page = read(pagePath)
    const structuredDataExpression = page.match(/const structuredData = (\{[\s\S]*?\n  \})\n\n  return/)[1]
    const service = JSON.parse(JSON.stringify(vm.runInNewContext(`(${structuredDataExpression})`, { eventSeo, serviceOffer })))
    const expected = slug === 'detskiy-prazdnik' ? '12000' : '15000'
    assert.equal(service['@type'], 'Service')
    assert.equal(service.offers['@type'], 'Offer')
    assert.equal(service.offers.price, expected)
    assert.equal(service.offers.priceCurrency, 'RUB')
    assert.equal(service.offers.priceSpecification['@type'], 'PriceSpecification')
    assert.equal(service.offers.priceSpecification.minPrice, expected)
    assert.equal(service.offers.priceSpecification.priceCurrency, 'RUB')
    assert(page.includes(`faqStructuredData(eventSeo['${slug}'].faq)`))
    const clientFile = fs.readdirSync(path.join(root, `app/${slug}`)).find((name) => name.endsWith('Client.js'))
    assert(read(`app/${slug}/${clientFile}`).includes(`seoKey: '${slug}'`))
    console.log(`${slug}: h1=1 (source graph), FAQ=3, links=3, Service/Offer JSON valid, price=${expected}`)
  } else {
    console.log('home: h1=1 (source graph), FAQ=4, links=4, FAQPage JSON valid')
  }
}
for (const directory of ['app', 'blocks', 'helpers']) {
  for (const filename of fs.readdirSync(path.join(root, directory), { recursive: true })) {
    if (!/\.(js|jsx|json|md)$/.test(filename)) continue
    assert(!read(`${directory}/${filename}`).includes('22 года'), `${directory}/${filename}: stale experience`)
  }
}
console.log('PASS: no stale 22-year text; no duplicate FAQ blocks/questions/full FAQ sets; visible and JSON-LD FAQ share one data source.')
