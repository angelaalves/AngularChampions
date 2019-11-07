const proxy = [
    {
      context: '/api',
      target: 'http://localhost:4200',
      pathRewrite: {'^/login' : 'players/Login?email=${email}&password=${password}'}
    }
  ];
  module.exports = proxy;