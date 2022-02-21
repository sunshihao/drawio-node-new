import { Post, Route, Controller, Get } from 'xioo';


@Route('/promise/wx/auth')
class WxAuth extends Controller {
  /** 获取用户的openId */
  @Post('/getUserOpenId')
  async getUserOpenId() {
    const { app, ctx } = this;
    this.app
    const code = ctx.request.body.code;

    const { config: { other }, xios: { wx }, service } = app;
    // service
    let res:any = await service.WxAuth.getUserOpenId({
      appId: other.wx.appId,
      secret: other.wx.secret,
      code
    });

    return {
      data: JSON.parse(res),
      status: '0',
      message: '成功!'
    }
  }

  /**登录 */
  @Post('/login')
  async login() {
    const { app, ctx } = this;
    const { code, ...userInfo } = ctx.request.body;
    const { config: { other }, xios: { wx }, service } = app;
    let res: any = await service.WxAuth.getUserOpenId({
      appId: other.wx.appId,
      secret: other.wx.secret,
      code
    });
    res = JSON.parse(res);

    const openId = res.openid;

    const data = {
      ...userInfo,
      openId
    }

    const userData = await service.WxAuth.login(data);

    return userData;
  }

  /** 校验jwt */
  @Post('/verifyToken')
  async verifyToken() {
    const { app, ctx } = this;
    const { service } = app;
    const data = ctx.request.body;

    let res:any = await service.WxAuth.verifyJwtToken(data);

    if(!res) {
      return {
        data: [],
        status: 40001,
        message: '校验失败'
      }
    }
    return {
      data: res,
      status: 0,
      message: '成功'
    }
  }


  @Post('/getAccessToken')
  async getAccessToken() {
    
  }

  @Post('/getData')
  async getData() {
    this.app.service.WxAuth.getData()
  }

  async getAuth() {
    this.app.service.WxAuth.getAuth()
    this.app.service.WxAuth.getName()
    this.app.service.WxInfo.getInfo()
    this.app.service.WxInfo.getMyName()
    this.app.service.WxInfo.getData()
  }


  @Get('/xioopg')
  async xioopg() {
    const { app: { service: { pg } } } = this;

    const data = await pg.query('select * from xioo.action_view');
    return {
      status: '0',
      data,
      message: ''
    }
  }
}

export = WxAuth;