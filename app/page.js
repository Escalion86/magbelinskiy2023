import TitleBlock from '@/blocks/TitleBlock'

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-between min-h-screen overflow-x-hidden">
      <TitleBlock />
      {/* <div
        style={{
          maskMode: 'alpha',
          background:
            'linear-gradient(180deg, #D9D9D9 83.34%, rgba(217, 217, 217, 0.00) 100%)',
        }}
        className="absolute top-0 w-full h-full -z-10 shrink-0"
      ></div>
      <div
        className="absolute w-full h-full -z-10"
        style={{
          background: '#0E0E1C',
        }}
      /> */}
      <div
        style={{
          maskMode: 'alpha',
          background:
            'linear-gradient(180deg, #D9D9D9 83.34%, rgba(217, 217, 217, 0.00) 100%)',
        }}
        className="absolute top-0 w-full h-full overflow-hidden -z-20 shrink-0"
      >
        {/* Фон */}
        <div
          className="w-full h-full"
          style={{
            background: '#0E0E1C',
          }}
        />
        <div
          className="absolute w-full h-full"
          style={{
            opacity: 0.3,
            background:
              'url("/img/noise.png"), lightgray 0% 0% / 100px 100px repeat',
            mixBlendMode: 'soft-light',
          }}
        />
      </div>
    </main>
  )
}
