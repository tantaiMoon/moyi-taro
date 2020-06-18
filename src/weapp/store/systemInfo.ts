import Taro from '@tarojs/taro'
import { action, observable } from 'mobx'
import fetch from '@/api/fetch'
import { isLogin } from '@/utils/index'

class SystemInfo {
  @observable systemInfo = {}
  @observable locationInfo = {}
  @observable networkType: string = 'wifi'
  @observable isLogin: boolean = isLogin()

  @action
  getSystemInfo = () => {
    Taro.getSystemInfo()
      .then(res => {
        this.systemInfo = res
      })
  }

  @action
  getLocation = () => {
    return Taro.getLocation({
      isHighAccuracy: true,
      altitude: 'true'
    })
      .then(res => {
        console.log('log --------- loc: ', res)
        this.locationInfo = res
        // location=116.481488,39.990464&poitype=商务写字楼&radius=1000&extensions=all&batch=false&roadlevel=0
        return fetch({
          url: `v3/geocode/regeo`,
          payload: {
            location: `${res.longitude},${res.latitude}`,
            output: 'json',
            extensions: 'all',
            poitype: '商务写字楼',
            radius: 2000,
            roadlevel: 0,
            batch: false
          },
          type: 3
        })

      })
  }

  @action
  saveNetworkType = type => {
    this.networkType = type
  }

  @action
  setLoginStatus = status => {
    this.isLogin = status
  }
}

export default SystemInfo
