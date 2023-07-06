import '@app/styles/main.css'

import type { AppProps } from 'next/app'
import { CacheProvider } from '@emotion/react'
import { DialogResponse } from '@app/components/common/DialogResponse'
import { EmotionCache } from '@emotion/utils'
import FirebaseInit from '@app/helpers/useAuth'
import Head from 'next/head'
import Layout from '@app/layout'
import { Loading } from '@app/components/common/Loading'
import { Provider } from 'react-redux'
import React from 'react'
import { ThemeProvider } from '@mui/material'
import WattanaTheme from '@app/config/theme'
import createEmotionCache from '@app/libs/createEmotionCache'
import { store } from '@app/redux-store'
import { useRouter } from 'next/router'

FirebaseInit()

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  const handleStart = () => {
    setOpen(true)
  }
  const handleComplete = () => {
    setOpen(false)
  }

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  React.useEffect(() => {
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
  }, [router])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>id9property.com :)</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={WattanaTheme}>
          {router.pathname.startsWith('/auth') ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
          <Loading open={open} />
          <DialogResponse />
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  )
}

export default MyApp
