import Taro from '@tarojs/taro'
import { action, observable } from 'mobx'

class SystemInfo {
  @observable systemInfo = {}

  @action
  getSystemInfo = () => {
    Taro.getSystemInfo()
      .then(res => {
        this.systemInfo = res
      })
  }
}

export default SystemInfo
