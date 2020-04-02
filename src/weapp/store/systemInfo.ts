import Taro from '@tarojs/taro'
import { action, observable } from 'mobx'
import { isLogin } from '@/utils/index'

class SystemInfo {
  @observable systemInfo = {}
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
  saveNetworkType = type => {
    this.networkType = type
  }

  @action
  setLoginStatus = status => {
    console.log('log --------- this.state : ', status)
    this.isLogin = status
  }
}

export default SystemInfo
