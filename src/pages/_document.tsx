import Document, { Head, Html, Main, NextScript } from 'next/document'

import React from 'react'
import { ServerStyleSheets } from '@mui/styles'
import Theme from '@app/config/theme'
import createEmotionCache from '@app/libs/createEmotionCache'
import createEmotionServer from '@emotion/server/create-instance'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|"
          />
          <meta
            name="description"
            content="id9property แพลตฟอร์มจองโรงแรมออนไลน์"
          />
          <meta
            name="keywords"
            content="id9property, id9property.com,5 Star Resident Rental"
          />

          <meta name="theme-color" content={Theme.palette.primary.main} />

          <script>var PROCESS = 0; var STATUS = false</script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props) =>
        sheets.collect(<App emotionCache={cache} {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
      sheets.getStyleElement()
    ]
  }
}
