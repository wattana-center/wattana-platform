const fs = require('fs')
const globby = require('globby')
const prettier = require('prettier')

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc')

  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    'src/pages/**/*{.js,.mdx,.tsx,.ts}',
    '!src/pages/_*.tsx',
    '!src/pages/**/[id]',
    '!src/pages/**/*[id].tsx',
    '!src/pages/admins',
    '!src/pages/api'
  ])
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace('src/', '')
                  .replace('pages', '')
                  .replace('.js', '')
                  .replace('.mdx', '')
                  .replace('.tsx', '')
                  .replace('.ts', '')
                  .replace('/index', '')
                const route = path === '/index' ? '' : path

                return `
                        <url>
                            <loc>${`https://www.buddyclubs.in.th${route}`}</loc>
                        </url>
                    `
              })
              .join('')}
        </urlset>
    `

  // If you're not using Prettier, you can remove this.
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  })

  fs.writeFileSync('public/sitemap.xml', formatted)
})()
