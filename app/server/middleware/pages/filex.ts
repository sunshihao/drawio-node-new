import { MiddleClass, Middle, Middleware } from 'xioo';

@MiddleClass()
export default class PageRedirect extends Middleware {
  @Middle()
  async changePage() {
    const { ctx, next} = this;
    // if(ctx.url === '/page' || ctx.url === '/') {
    //   ctx.redirect('/main')
    // }

    await next();
  }
}