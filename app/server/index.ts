import App from 'xioo'; 

(async ()=> {
  const app = new App();
  app.start();
})()



// const event = require('../../scripts/client');
// const app = new App();

// app['socket']

// console.red('我应该是红色的')

// if (process.env.RUN_ENV === 'dev') {

//   const client = net.createConnection({
//     host: '127.0.0.1',
//     port: 2003
//   })

//   // client.on('data', (data) => {
//   //   console.log('我是服务端要推送消息了')
//   //   setTimeout(() => {
//   //     console.red('我是推送了')
//   //     app['socket'] && app['socket'].cots['/admin'] && app['socket'].cots['/admin'].emit('reload', '我是服务端推送来的')
//   //   }, 4000);
//   //   // client.end();
//   // });
// }

