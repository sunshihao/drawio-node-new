import { Service } from 'xioo';

import fs from 'fs';
import path from 'path';

export default class Upload extends Service {
  async upload(data) {
    const { app } = this;
    const { file } = data;

    const readFile = fs.createReadStream(file.path);

    const filePath = path.join(app.projectRoot, `./assets/pdf/${file.name}`);

    const wrireFile = fs.createWriteStream(path.join(app.projectRoot, `./assets/pdf/${file.name}`));

    readFile.pipe(wrireFile);
  }

  async uploadImage(uploadFiles) {
    const { app: { xios: { file }, service: { redis, Query } } } = this;
    const iacToken = await Query.getIacToken();
    // const uploadFiles = ctx.request['files'] || ctx.request.body
    const tenant = process.env['public.iac.tenantid']
    // return {
    //   status: '0',
    //   data: iacToken
    // }
    console.log(tenant);
    console.log(iacToken);
    const res = await file.upload<any>(`/${tenant}/v1/upload`, uploadFiles.file, {
      headers: { "x-iac-token": iacToken },
      data: {
        categoryId: "EUS_ERROR_IMAGE"
      }
    })

    console.log(res);

    const data = JSON.parse(res);

    if (data.status !== '0') {
      return {
        status: '0',
        data: '',
        message: '上传文件失败'
      }
    }
    return {
      status: '0',
      data: data.data.result.fileId,
      message: '上传文件成功'
    }
  }
}