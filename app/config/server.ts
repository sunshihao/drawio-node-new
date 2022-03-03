/**
 * xioo服务配置
 * @version: 0.0.1
 * @Author: dee
 * @Date: 2021-01-19 19:40:17
 * @LastEditors: dee
 * @LastEditTime: 2021-01-19 19:51:46
 */

/** 数据服务的基础配置 */
import { XiooConfig, IServerConfig } from 'xioo';  
interface IModelSQL {
  /** 端口号 默认80 */
  port?: number;
  /** 地址 */
  host: string;
  /** 密码 */
  password?: string;
  /** 是否启动 */
  launch?: boolean;
}

/** MySQL */
interface IMySQL extends IModelSQL {
  user: string;
  database?: string;
  useConnectionPooling?: boolean;
}

/** Redis */
interface IRedis extends IModelSQL {
  /** 数据库号 */
  db?: number;
}

interface ISource<T> {
  [key: string]: T
}

/** http服务配置 */
interface IHtppServer {
  port: number;
}

interface IConfig {
  /** redis配置 */
  redis: ISource<IRedis>;
  /** http服务配置 */
  httpServer: IHtppServer;
}

interface ISocket {
  redis: IRedis;
  launch: boolean;
}

export = class Config implements IServerConfig {
  redis = {};

  /** es配置 */


  httpServer: IHtppServer = {
    port: 2301
  };


  openResource = [
    {
      openPath: 'static',
      options: {
        maxAge: 60 * 60 * 1000 * 2
      }
    },
    {
      openPath: 'static/drawio/src/main',
      options: {
        maxAge: 60 * 60 * 1000 * 2
      }
    },
    {
      openPath: 'static/drawio/src/main/webapp',
      options: {
        maxAge: 60 * 60 * 1000 * 2
      }
    }
  ]
};
