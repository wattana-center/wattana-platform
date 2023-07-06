import { init } from 'next-firebase-auth'

const TWELVE_DAYS_IN_MS = 12 * 60 * 60 * 24 * 1000

const firebaseConfig = {
  debug: false,
  authPageURL: '/auth',
  appPageURL: '/',
  loginAPIEndpoint: '/api/login',
  logoutAPIEndpoint: '/api/logout',
  firebaseAdminInitConfig: {
    credential: {
      projectId: process.env.FIREBASE_PROJECT_ID
        ? process.env.FIREBASE_PROJECT_ID
        : '',
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL
        ? process.env.FIREBASE_CLIENT_EMAIL
        : '',
      // Using JSON to handle newline problems when storing the
      // key as a secret in Vercel. See:
      // https://github.com/vercel/vercel/issues/749#issuecomment-707515089
      privateKey: process.env.FIREBASE_PRIVATE_KEY
        ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
        : undefined
    },
    databaseURL: process.env.FIREBASE_DATABASE_URL
      ? process.env.FIREBASE_DATABASE_URL
      : ''
  },
  firebaseClientInitConfig: {
    apiKey: process.env.FIREBASE_API_KEY ? process.env.FIREBASE_API_KEY : '',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID
  },
  cookies: {
    name: 'wattana',
    keys: [
      process.env.COOKIE_SECRET_CURRENT,
      process.env.COOKIE_SECRET_PREVIOUS
    ],
    httpOnly: true,
    maxAge: TWELVE_DAYS_IN_MS,
    overwrite: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'true',
    signed: true
  }
}

const firebaseAuth = () => {
  init(firebaseConfig)
}

export { firebaseConfig }

export default firebaseAuth
