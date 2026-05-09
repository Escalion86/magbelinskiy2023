import dns from 'dns'
import https from 'https'
import { SocksProxyAgent } from 'socks-proxy-agent'

const contentType = 'application/json'
const TELEGRAM_PROXY_URL =
  process.env.TELEGRAM_PROXY_URL || process.env.TELEGRAM_SOCKS_PROXY_URL
const TELEGRAM_REQUEST_TIMEOUT_MS = Number(
  process.env.TELEGRAM_REQUEST_TIMEOUT_MS || 15000
)

const lookupIPv4 = (hostname, options, callback) => {
  if (typeof options === 'function') {
    return dns.lookup(hostname, { family: 4 }, options)
  }

  return dns.lookup(hostname, { ...(options || {}), family: 4 }, callback)
}

const telegramAgent = TELEGRAM_PROXY_URL
  ? new SocksProxyAgent(TELEGRAM_PROXY_URL)
  : new https.Agent({
      keepAlive: true,
      lookup: lookupIPv4,
      family: 4,
    })

const postJson = (url, form) =>
  new Promise((resolve, reject) => {
    const parsedUrl = new URL(url)
    const body = JSON.stringify(form)
    const req = https.request(
      {
        method: 'POST',
        protocol: parsedUrl.protocol,
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || undefined,
        path: `${parsedUrl.pathname}${parsedUrl.search}`,
        agent: telegramAgent,
        timeout: TELEGRAM_REQUEST_TIMEOUT_MS,
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        let raw = ''
        res.setEncoding('utf8')
        res.on('data', (chunk) => {
          raw += chunk
        })
        res.on('end', () => {
          if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
            reject(
              new Error(
                `Telegram request failed with status ${res.statusCode ?? 'unknown'}`
              )
            )
            return
          }

          try {
            resolve(raw ? JSON.parse(raw) : {})
          } catch (error) {
            reject(new Error(`Telegram response parse error: ${error.message}`))
          }
        })
      }
    )

    req.on('timeout', () => {
      req.destroy(new Error('Telegram request timeout'))
    })
    req.on('error', reject)
    req.write(body)
    req.end()
  })

export const telegramPost = async (
  url,
  form,
  callbackOnSuccess = null,
  callbackOnError = null,
  resJson = false
) => {
  try {
    const json = await postJson(url, form)
    const result = resJson ? json : (json?.result ?? json?.data)

    if (callbackOnSuccess) callbackOnSuccess(result)

    return result
  } catch (error) {
    console.log('Failed to add (POST) on ' + url)
    console.log(error)
    if (callbackOnError) callbackOnError(error)
    return null
  }
}

export default telegramPost
