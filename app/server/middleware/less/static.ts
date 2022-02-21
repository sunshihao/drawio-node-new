import * as path from 'path';
import koaStatic from 'koa-static';
let rootProject = process.cwd();

// 根据环境变量来判断当前执行的目录
if(process.env.READ_ENV === 'prod') {
    rootProject += '/package'
} else {
    rootProject += '/app'
}

export default () => koaStatic(path.join(rootProject, './public'));