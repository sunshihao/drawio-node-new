import { Service } from 'xioo';
export default class Query extends Service {
  async query(sql: string, token: string) {
    const { app: { service: { pg, redis } } } = this;
    if (!token) {
      return [];
    }
    let user: any = await redis.getString(token);
    if(user) {
      user = JSON.parse(user);
    }
    const isql = `rele_id in ('${user.id}')`
    if(sql.includes('where')) {
      sql += ` and ${isql}`
    } else {
      sql += ` where ${isql}`
    }

    console.log(sql)

    return pg.query(sql);
  }

  /** 获取iac-token */
  async getIacToken() {
    const { app: { xios: { itapis }, service: { redis } } } = this;
    const appid = process.env['public.iac.appid'];
    const secret = process.env['public.iac.secret'];

    let iacToken = await redis.getString('eus_iac_token');

    if(iacToken) {
      return iacToken;
    }

    const res = await itapis.requset<any>({
      url: '/iac/app/access_token',
      method: 'get',
      params: {
        appid,
        secret
      }
    })

    if(res.status !== 200) {
      return;
    }

    iacToken = res.data.accessToken
    await redis.setString('eus_iac_token', iacToken, 60 * 60 * 2);

    return iacToken;
  }
}