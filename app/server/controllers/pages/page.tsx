import { Get, Route, Controller } from 'xioo';

import * as fs from 'fs';
import * as path from 'path';

let page = '';

if(process.env.READ_ENV === 'prod') {
  page = fs.readFileSync(path.join(__dirname, '../../../public/index.html'), 'utf-8');
}

@Route('/')
export default class Page extends Controller {
  @Get(/\/(index|main|login)\/?(a-z)*/)
  async getPage() {
    const { ctx }  = this;

    ctx.body = page;

    return null;
  }
}