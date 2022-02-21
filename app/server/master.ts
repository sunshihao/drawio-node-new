import * as childProcess from 'child_process';
import cluster from 'cluster';
import * as path from 'path';
import * as fs from 'fs';
import App, { Helper } from 'xioo';

// 先去生成声明文件，在去构建

console.log('我是开始的进程');

Helper.makeType('service', 'service');

childProcess.fork('./app/server/index', {
  env: {
    ...process.env,
    RUN_ENV: process.env.RUN_ENV ? process.env.RUN_ENV : 'dev' // 传了env以后控制台输出颜色就失效了，应该是process.env中有东西控制打印的颜色
  },
  // // detached: true,
  // silent: true
});

/**
 * {
  env: {
    RUN_ENV: process.env.RUN_ENV ? process.env.RUN_ENV : 'dev'
  }
}
 */

// if(cluster.isMaster) {
//     console.log('[master] ' + "start master...");

//     for (var i = 0; i < 4; i++) {
//         cluster.fork();
//     }

//     cluster.on('listening', function (worker, address) {
//         console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
//     });
// } else {
//     const app = new App();
// }

// setTimeout(() => {
//   console.log('我要启动进程了');

//   childProcess.fork('./app/server/index');

//   // const worker = childProcess.fork('./index.ts');
// }, 1000);