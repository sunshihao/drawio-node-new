import { Get, Route, Controller, Post } from 'xioo';
import fs from 'fs';
import path from 'path';

let a = 0;
@Route('/api/common')
export default class Common extends Controller {
  @Get('/heart')
  async heart() {
    console.log('我执行了---------------------->')

    const { ctx, app } = this;
    return {
      status: 200,
      data: 'ok'
    }
  }

  @Post('/testdata')
  async testData() {
    const { ctx } = this;
    const body = ctx.request.body;
    a++
    console.log('我是图片请求普通请求');
    console.log(body);
    console.log(ctx.query);
    return {
      status: '0',
      data: [],
      message: '成功'
    }
  }

  // @Get('/testdata')
  // async testData1() {
  //   const { ctx } = this;
  //   const body = ctx.request.body;
  //   const res = ctx.query;
  //   console.log('我是图片请求');
  //   console.log(res);

  //   console.log(body);

  //   return {
  //     status: '0',
  //     data: [],
  //     message: '成功'
  //   }
  // }

  /** 上传文件 */
  @Post('/upload')
  async uploadFile() {
    const { ctx, app } = this;

    /** 获取文件 */
    const file = ctx.request.files.file;
    if(!file) {
      return {
        status: 404001,
        data: '',
        message: '文件不存在'
      }
    }

    const readFile = fs.createReadStream(file.path);
    const wrireFile = fs.createWriteStream(path.join(app.projectRoot, `./assets/pdf/${file.name}`));

    readFile.pipe(wrireFile);

    return {
      status: 200,
      data: '',
      message: '上传成功'
    }
  }

  
}