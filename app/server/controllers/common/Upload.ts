import { Get, Route, Controller, Post } from 'xioo';

@Route('/api/daoke/upload')
export default class Upload extends Controller {
  @Post('/uploadImage')
  async uploadImage() {
    const { ctx, app: { service } } = this;
    const uploadFiles = ctx.request['files'] || ctx.request.body
    const body = await service.Upload.upload(uploadFiles);
    return body;
  }
}