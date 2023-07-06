const path = require('path');

console.log(path.resolve('./public/static/locales'));

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'th']
  },
  localePath: path.resolve('./public/static/locales')
  // localeStructure: '{{ns}}',
  // async rewrites() {
  //   return [
  //     {
  //       source: '/en',
  //       destination: '/en/another',
  //       locale: false
  //     },
  //     {
  //       source: '/th',
  //       destination: '/th/another',
  //       locale: false
  //     },
  //     {
  //       source: '/(.*)',
  //       destination: '/another'
  //     }
  //   ];
  // }
};
