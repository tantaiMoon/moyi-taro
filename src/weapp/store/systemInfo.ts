import Taro from '@tarojs/taro'
import { action, observable } from 'mobx'

class SystemInfo {
  @observable systemInfo = {}
  @observable networkType = 'wifi'

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
}

export default SystemInfo
