const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    disable:
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'preview' ||
      process.env.NODE_ENV === 'production',
    dest: 'public',
    register: true
  },
  // swcMinify: true,
  reactStrictMode: true,
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    REACT_APP_API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT,
    REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
    REACT_APP_API_SECEET: process.env.REACT_APP_API_SECEET,
    PUBLIC_URL: process.env.PUBLIC_URL,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    ALGORITHM: process.env.ALGORITHM,
    SALT: process.env.SALT,
    IV: process.env.IV
  },
  i18n: {
    locales: ['en', 'th'],
    defaultLocale: 'th'
  },
  webpack: (config, { dev, isServer }) => {
    // if (!dev && !isServer) {
    //   Object.assign(config.resolve.alias, {
    //     react: 'preact/compat',
    //     'react-dom/test-utils': 'preact/test-utils',
    //     'react-dom': 'preact/compat'
    //   })
    // }
    return config
  },
  images: {
    domains: ['storage.googleapis.com', 'maps.googleapis.com']
  }
})
