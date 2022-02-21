import { Service } from 'xioo';
import { v1 } from 'uuid';
import jwt from 'jsonwebtoken';

export default class WxAuth extends Service {
  /** 获取微信用户的openId */
  async getUserOpenId(data) {
    const { app } = this;
    const { xios: { wx } } = app;

    let res = await wx.requset({
      url: `/sns/jscode2session?appid=${data.appId}&secret=${data.secret}&js_code=${data.code}&grant_type=authorization_code`,
      method: 'get'
    });

    return res;
  }

  /** 登录流程 */
  async login(data) {
    const { service: { mysql, redis } } = this.app;

    const openId = v1();
    const token = v1();
    const mpOpenId = data.openId;

    const searchSql = `select mpOpenId as openId, openId as id, avatar, nickName from muser where mpOpenId = '${mpOpenId}'`;

    const userData: any = await mysql.dbquery(searchSql);

    let user: any = {}

    if(userData && userData.length !== 0 ) {
      user = userData[0]
    } else {
      const sql = `insert into muser(mpOpenId, openId, avatar, nickName, userName) values(
        '${mpOpenId}', 
        '${openId}',
        '${data.avatar}',
        '${data.nickName}',
        '${data.nickName}'
      )`
  
      await mysql.dbquery(sql);
      
      user = {
        openId: mpOpenId,
        id: openId,
        avatar: data.avatar,
        nickName: data.nickName,
        userName: data.nickName
      }
    }

    let jwToken = jwt.sign(user, openId);

    redis.setString(openId, jwToken);
    redis.setString(token, JSON.stringify(user));

    return {
      userInfo: user,
      jwtToken: jwToken,
      token: token
    };
  }

  /** 校验jwtToken */
  async verifyJwtToken(data) {
    const { redis } = this.app;
    let token: any =  await redis.getString(data.openId);
    if(!token) return null;
    
    try {
      let user = jwt.verify(token, data.openId);
      return user;
    } catch(e) {
      return null;
    }
  }

  async getAccessToken() {

  }


  async getData() {
    // this.app.service.WxAuth.getData
  }

  async getAuth() {

  }

  async getName() {
    
  }
}