import { Head, Html, Main, NextScript } from 'next/document'

const themeScript = `
  let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)')

  function updateTheme(theme) {
    theme = theme ?? window.localStorage.theme ?? 'system'

    if (theme === 'dark' || (theme === 'system' && isDarkMode.matches)) {
      document.documentElement.classList.add('dark')
    } else if (theme === 'light' || (theme === 'system' && !isDarkMode.matches)) {
      document.documentElement.classList.remove('dark')
    }

    return theme
  }

  function updateThemeWithoutTransitions(theme) {
    updateTheme(theme)
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  document.documentElement.setAttribute('data-theme', updateTheme())

  new MutationObserver(([{ oldValue }]) => {
    let newValue = document.documentElement.getAttribute('data-theme')
    if (newValue !== oldValue) {
      try {
        window.localStorage.setItem('theme', newValue)
      } catch {}
      updateThemeWithoutTransitions(newValue)
    }
  }).observe(document.documentElement, { attributeFilter: ['data-theme'], attributeOldValue: true })

  isDarkMode.addEventListener('change', () => updateThemeWithoutTransitions())
`

export default function Document() {
  return (
    <Html className="antialiased [font-feature-settings:'ss01']" lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/default.min.css"></link>

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LHNGRFM22V"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());
            gtag('config', 'G-LHNGRFM22V');
            `
          }} />

      </Head>
      <body className="bg-white dark:bg-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
