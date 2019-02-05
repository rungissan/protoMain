import base64 from 'base-64';
import { Platform } from 'react-native';

import env from '../../config';
import CommonStore from '../stores/common';

function getToken() {
  return CommonStore.getToken();
}

function updateToken(data) {
  CommonStore.updateToken(data);
}

class Api {

  static _instance = null;

  static getInstance() {
    if (!Api._instance) {
      Api._instance = new this();
    }

    return Api._instance;
  }

  // TODO encodeURIComponent doesn't work at backend
  makeQueryString(query) {
    let queryString = '';

    if (Object.keys(query).length) {
      queryString = `${Object.keys(query).map(key =>
        `${key}=${typeof query[key] === 'object' ? JSON.stringify(query[key]) : query[key]}`).join('&')}`
    }
    return queryString ? `?${queryString}` : '';
  }

  async callAuth(type = 'get', url, data) {
    let clientKey = (Platform.OS === 'ios') ? env.iosKey : env.androidKey;
    let href = env.domain + url;
    let config = {
      method: type,
      headers: {
        'authorization': `Basic ${base64.encode(`${clientKey.clientId}:${clientKey.clientSecret}`)}`,
        'content-type': 'application/json'
      }
    }

    if (type == 'get') {
      href = env.domain + url + this.makeQueryString(data);
    } else if (Object.keys(data).length) {
      config.body = JSON.stringify(data)
    }

    try {
      let response = await fetch(href, config);
      return response;
    } catch(err) {
      console.log(err)
    }
  }

  /**
   * Call api
   * @param  {[type]}  url          [description]
   * @param  {[type]}  conf         [type, data, token, file]
   * @param  {Boolean} refreshToken [description]
   * @return {[type]}               [description]
   */  
  async call(url, conf = {}, refreshToken = false) {
    conf.type = conf.type || 'get';
    conf.data = conf.data || {};

    let token = conf.token || getToken();
    let href = env.domain + url;
    let config = {
      method: conf.type || 'get',
      headers: {
        'authorization': `${token.token_type} ${token.access_token}`,
      }
    }

    //console.log(conf);

    if (!conf.file) {
      config.headers['content-type'] = 'application/json';
    }

    if (conf.type == 'get') {
      href = env.domain + url + this.makeQueryString(conf.data);
    } else if (Object.keys(conf.data).length) {
      config.body = conf.file ? conf.data : JSON.stringify(conf.data);
    }

    try {
      const response = await fetch(href, config);
      // console.log('response!', response);
      if(!response.ok && response.status == 422){
        return response
      }

      if (!response.ok && response.status == 403) {
        const isTokenRefreshed = await this.refreshToken(token);
        if (isTokenRefreshed && !refreshToken) {
          console.log('token has been refreshed, trying to request again...');
          const newToken = getToken();
          config.headers.authorization = `${newToken.token_type} ${newToken.access_token}`;
          const responseAfterRefresh = await fetch(href, config);
          return responseAfterRefresh;
        }
      }
      // if (!response.ok) {
      //   throw Error(response.statusText);
      // }

      return response;
    } catch(err) {
      console.log(err)
    }
  }

  async refreshToken(token) {
    try {
      const response = await this.callAuth('post', 'auth/oauth/token', {
        grant_type: "refresh_token",
        token: token.token,
        refresh_token: token.refresh_token
      });
      const responseText = await response.json();

      if(responseText.error){
        return false;
      }
      updateToken(responseText);

      return true;
    } catch(err) {
      console.log(err)
    }
  }

}

export default Api.getInstance();
