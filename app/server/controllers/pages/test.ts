import { Get, Route, Controller } from 'xioo';
// import mfs from 'memory-fs';

const MemoryFileSystem = require('memory-fs');


var mfs = new MemoryFileSystem()
import * as path from 'path';

@Route('/api/view')
export default class MyTest extends Controller {
  @Get('getTest')
  getTest() {
    return [
      {
        name: 1,
        age: 'zhaodeezhu' 
      }
    ]
  }

  @Get('getCss')
  getCss() {
    // console.log(mfs);
    let res = mfs.readdirSync('/');

    return {
      public: res
    }
  }
}