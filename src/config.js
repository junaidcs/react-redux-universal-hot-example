require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'INSEADERS',
    description: 'The global venture booster for INSEAD',
    head: {
      defaultTitle: 'INSEADERS',
      titleTemplate: 'INSEADERS | %s',
      meta: [
        {name: 'description', content: 'The global venture booster for INSEAD'},
        {charset: 'utf-8'},
        {property: 'robots', content: 'index,follow'},
        {property: 'copyright', content: 'INSEADERS'},
        {property: 'author', content: 'INSEADERS'},
        {property: 'og:site_name', content: 'INSEADERS'},
        {property: 'og:image', content: 'http://inseaders.vc/images/logo-inseaders.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'INSEADERS'},
        {property: 'og:description', content: 'The global venture booster for INSEAD'},
        {property: 'og:site', content: 'INSEADERS'},
        {property: 'og:creator', content: 'INSEADERS'},
        {property: 'og:image:width', content: '470'},
        {property: 'og:image:height', content: '275'}
      ]
    }
  }
},environment);
