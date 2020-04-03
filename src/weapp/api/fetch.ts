// import CryptoJS from 'crypto-js'
import { stringify } from 'qs'
import { API_LOGIN } from '@/api/index'
// import { Base64 } from 'js-base64'
// import { getUuid } from '@/utils/index'
import Taro from '@tarojs/taro'
import store from '@/store/index'

const CODE_SUCCESS = 200
const CODE_AUTH_EXPIRED = 401

const base = process.env.BASE_URL
const api = process.env.API_URL
const map = process.env.MAP_URL
const mapKey = process.env.MAP_KEY
const USER_INFO = 'USER_INFO'

export default function fetch(options) {
  const { systemInfo } = store
  Taro.getNetworkType().then(res => {
    systemInfo.saveNetworkType(res.networkType)
  })
  const { networkType } = systemInfo
  if (networkType === 'none') {
    Taro.showToast({
      title: '网络连接失败，请检查网络',
      icon: 'none'
    })
    return
  }

  const userInfo = Taro.getStorageSync(USER_INFO)
  const publicKey = userInfo.data && userInfo.data.publicKey
  if (publicKey === '') {
    return
  }
  const currToken = userInfo.currToken
  Taro.showLoading({
    title: '正在加载中...',
    mask: true
  })
  const header = {
    Authorization: currToken || '',
    Accept: 'application/json',
    Version: '1.0'
  }
  const { url, payload, method = 'GET', showToast = true, type = 1 } = options
  let contentType
  if (method !== 'GET') {
    contentType = 'application/json;charset=UTF-8'
    header['Content-Type'] = contentType
  }
  if (type === 3) {
    payload.key = mapKey
  }
  const params = { url, method, contentType, payload, publicKey }
  const resultQuery = setUpDefaultQuery(params)
  const myUrl = url + '?' + stringify(resultQuery)

  return Taro.request({
    url: type === 1 ? base : (type === 2 ? api : map) + myUrl,
    method,
    data: payload,
    header
  })
    .then(res => {
      Taro.hideLoading()
      const response = res.data
      if (type === 1) {
        const { code, data } = response
        if (code !== CODE_SUCCESS) {
          return Promise.reject(response)
        } else {
          if (url === API_LOGIN && data !== null && data !== '') {
            Taro.setStorageSync(USER_INFO, response)
          }
          return data
        }
      } else if (type === 3) {
        const {status, regeocode} = response
        if (status === '1') {
          return regeocode
        } else {
          return Promise.reject(regeocode)
        }
      }

    })
    .catch(err => {
      Taro.hideLoading()
      const defaultMsg = err.code === CODE_AUTH_EXPIRED ? '登录信息已失效，请重新登录' : err.msg

      if (showToast) {
        Taro.showToast({
          title: defaultMsg,
          icon: 'none'
        })
      }

      if (err && err.code === CODE_AUTH_EXPIRED) {
        // systemInfo.logOut()
        Taro.reLaunch({
          url: '/subPagesMine/pages/user-login/login'
        })
      }
      return Promise.reject(err)
    })
}

function setUpDefaultQuery(params) {
  const { url, method, contentType, payload, publicKey } = params
  let dataRes
  if (payload && method === 'GET') {
    dataRes = payload
  }
  // dataRes.nonce = getUuid()
  // dataRes.timestamp = Math.round(new Date().getTime() / 1000).toString()
  const allKeys = Object.keys(dataRes)
  allKeys.sort()
  let queryString = ''
  allKeys.forEach((key, index) => {
    let value = dataRes[key]
    if (value === null || value === undefined) {
      value = ''
      dataRes[key] = ''
    }
    queryString = queryString + key + '=' + value + (index < allKeys.length - 1 ? '&' : '')
  })
  // const tmpUrl = parseUrl(base)

  // let sign =
  //   method + '\n' + tmpUrl.host + '\n' + tmpUrl.pathname + encodeURI(url) + '\n' + queryString
  // if (contentType) {
  //   sign = sign + '\n' + contentType
  // }
  //
  // if (method !== 'GET' && Object.keys(payload).length > 0) {
  //   sign = sign + '\n' + Base64.encode(JSON.stringify(payload))
  // }
  // sign = encryptHmacSHA256(sign, publicKey)
  // dataRes.sign = sign
  return dataRes
}

// function encryptHmacSHA256(value, publicKey) {
//   const cipherText = CryptoJS.HmacSHA256(value, publicKey || '')
//   const hashInBase64 = CryptoJS.enc.Base64.stringify(cipherText)
//   return hashInBase64
// }
