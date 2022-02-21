
      import 'xioo';
      
          import WxInfo from '../app/server/service/auth/info';
        
          import WxAuth from '../app/server/service/auth/user';
        
          import Helper from '../app/server/service/common/Helper';
        
          import Query from '../app/server/service/common/Query';
        
          import Upload from '../app/server/service/common/Upload';
        
      declare module 'xioo' {
        
        export interface IService {
          
        WxInfo: WxInfo
      
        WxAuth: WxAuth
      
        Helper: Helper
      
        Query: Query
      
        Upload: Upload
      
        }
      }
    