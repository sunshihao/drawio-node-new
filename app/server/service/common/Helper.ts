import { Service } from 'xioo';

export default class Helper extends Service {
  /** 下划线转驼峰 */
  toHump(arr) {
    if (!arr) return undefined;
    if (Array.isArray(arr)) {
      return arr.map(item => {
        const obj = {}
        Object.keys(item).forEach(key => {
          const newKey = key.toLowerCase().replace(/\_(\w)/g, function (all, letter) {
            return letter.toUpperCase();
          })
          obj[newKey] = item[key]
        })
        item = obj
        return item
      })
    } else if (typeof arr === 'object') {
      const obj = {}
      Object.keys(arr).forEach(key => {
        const newKey = key.toLowerCase().replace(/\_(\w)/g, function (all, letter) {
          return letter.toUpperCase();
        })
        obj[newKey] = arr[key]
      })
      return obj
    } else {
      return arr.toLowerCase().replace(/\_(\w)/g, function (all, letter) {
        return letter.toUpperCase();
      })
    }
  }

  /** 驼峰转下划线 */
  toUline(arr) {
    if (!arr) return undefined;
    function workToData(str) {
      let works = str.match(/[A-Z]/g);
      if (!Array.isArray(works)) works = [];
      let result = str;
      works = new Set(works);
      works = [...works];

      works.forEach(work => {
        const reg = new RegExp(`${work}`, 'g');
        result = result.replace(reg, `_${work}`)
      });

      return result.toLowerCase();
    }

    function objToData(obj) {
      const result = {};
      Object.keys(obj).forEach(key => {
        const finalKey = workToData(key);
        result[finalKey] = obj[key];
      })

      return result;
    }

    if (Array.isArray(arr)) {
      return arr.map(item => {
        const res = objToData(item);
        return res;
      })
    } else if (typeof arr === 'object') {
      return objToData(arr);
    } else {
      return workToData(arr);
    }
  }

  /** 用户满意度 */
  computeSatisfaction({ u, uv, errCount, errs, lu, lCount, eu, eCount }) {
    return this.computeErrorSatisfaction({ u, uv, errCount, errs }) * 0.7 + this.computeRequestSatisfaction({ lu, lCount, eu, eCount, uv }) * 0.3
  }

  /** 错误用户满意度 */
  computeErrorSatisfaction({ u, uv, errCount, errs }) {
    if (errCount === 0) {
      return 100;
    }
    return 100 / ((u / (2 * uv) * errCount) + 2 + errs / (1000 * uv)) * 2;
  }

  /** 请求的用户满意度 */
  computeRequestSatisfaction({ lu, lCount, eu, eCount, uv }) {
    if (uv === 0) {
      return 100;
    }
    return 100 / (((lu * lCount) / 2 + eu * eCount) / uv + 1)
  }

  /** 生成随机密码 */
  makeRandomString(digit = 4) {
    const vals = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    let str = '';
    for(let i = 0; i < digit; i++) {
      const index = Math.floor(Math.random() * 36);
      str += vals[index];
    }
    return str;
  }
}