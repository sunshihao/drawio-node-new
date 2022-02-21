interface ICommonObj {
  [key:string]: string;
}

export const getCommonApi = (apis: ICommonObj[], url: string, method = 'get') => {
  const params: {[key: string]: string} = {};
  let api = apis.find(api => {
    const { apiUrl, apiMethod } = api;
    if(apiMethod.toLowerCase() !== method.toLowerCase()) return false;
    const paramsStrs = apiUrl.match(/\/:([a-zA-z]+)/g);
    if(apiUrl === '/api/xiooview/common/view/:appId/:moduleId/:progId') {
      console.red(paramsStrs);
    }
    if(apiUrl === url) {
      console.log(apiUrl, url);
    }
    // 如果url中没有存在params参数
    if(!paramsStrs) return apiUrl === url;
    // 存在参数
    const paramsUrlRegStr = apiUrl.replace(/\/:([a-zA-z]+)/g, '/([0-9a-zA-z\\-]+)');
    const paramsUrlReg = new RegExp(paramsUrlRegStr);
    if(!paramsUrlReg.test(url)) return false;
    
    const apiUrlArr = apiUrl.split('/');
    const urlArr = url.split('/');
    console.log(apiUrlArr);
    console.log(urlArr);
    apiUrlArr.forEach((key, index) => {
      if(key.indexOf(':') > -1) {
        const paramsKey = key.replace(':', '');
        const value = urlArr[index];
        params[paramsKey] = value;
      }
    })
    return true;
  })

  if(!api) return null;

  return {
    api,
    params
  }
}