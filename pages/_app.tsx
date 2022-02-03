import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useTheme, ThemeProvider } from '@primer/components'

import '@primer/css/index.scss'

import { defaultThemeProps } from 'components/lib/getThemeProps'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>GitHub Documentation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="alternate icon" type="image/png" href="/assets/images/site/favicon.png" />
        <link rel="icon" type="image/svg+xml" href="/assets/images/site/favicon.svg" />

        <meta
          name="google-site-verification"
          content="OgdQc0GZfjDI52wDv1bkMT-SLpBUo_h5nn9mI9L22xQ"
        />
        <meta
          name="google-site-verification"
          content="c1kuD-K2HIVF635lypcsWPoD4kilo5-jA_wBFyT4uMY"
        />

        <meta name="csrf-token" content="$CSRFTOKEN$" />
      </Head>
      <ThemeProvider>
        <SetTheme themeProps={pageProps.themeProps} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

const SetTheme = ({ themeProps }: { themeProps: typeof defaultThemeProps }) => {
  // Cause primer/components to re-evaluate the 'auto' color mode on client side render
  const { setColorMode } = useTheme()
  useEffect(() => {
    setTimeout(() => {
      setColorMode(themeProps.colorMode as any)
    })
  }, [])
  return null
}

export default App
