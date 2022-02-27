import { MiddleClass, Middle, Middleware } from 'xioo';
import { getCommonApi } from '../../common/util';

import fs from 'fs';
import path from 'path';

const page = fs.readFileSync(path.join(process.cwd(), './static/drawio/src/main/webapp/index.html'), 'utf-8');

@MiddleClass()
export default class AuthMiddleware extends Middleware {
  @Middle('front')
  async commonApiCreate() {
    const { ctx, next, app: { service: { redis } } } = this;
    // console.log(ctx.path);
    if(ctx.path === '/webapp') {
      ctx.body = page;
      return;
    }

    await next();
    return;
    console.log('我是url');
    console.log(ctx.url)
    console.log(ctx.request.body);
    
    console.log(/\/(index|main|login|css|js|image|testdata)\/?(a-z)*/.test(ctx.url) || ctx.url === '/');
    if(/\/(index|main|login|css|js|image)\/?(a-z)*/.test(ctx.url) || ctx.url === '/') {
      await next()
      return;
    }
    let res: any = await redis.getString('commonApi');
    if(res) {
      res = JSON.parse(res);
      const apiValue = getCommonApi(res, ctx.url, ctx.method);
      if(apiValue) {
        const apiAuth = apiValue.api.apiAuth;
        console.red(apiAuth);
        if(apiAuth === 'none') {
          return await next();
        }
      }
    }

    console.red('我是token--------');

    const token = ctx.headers.token;
    if(ctx.url === '/api/xiooview/user/login') return await next();
    if (!token) {
      ctx.body = {
        status: '403001',
        message: 'token不存在',
        data: []
      }
      return;
    }
    let userStr = await redis.getString(token);
    if(!userStr) {
      ctx.body = {
        status: '403002',
        message: 'token已过期',
        data: []
      }
      return;
    }

    const user = JSON.parse(userStr);
    const crtTime = new Date().getTime();
    const startTime = user.timestamp || new Date().getTime();
    const insTime = (crtTime - startTime) / 1000 / 60 / 60;
    if(user.username !== 'admin') {
      if(insTime > 2) {
        ctx.body = {
          status: '403002',
          message: 'token已过期',
          data: []
        }
        redis.setString(token, null);
        return;
      }
    }
    await next();
  }
}