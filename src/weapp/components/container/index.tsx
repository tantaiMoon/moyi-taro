import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { ComponentType } from 'react'
import './index.scss'
import {inject, observer} from '@tarojs/mobx'

type IProps = {
  children: any,
}

interface IState {
  systemInfo: {
    systemInfo: {
      windowHeight: number,
      statusBarHeight: number,
      system: string
    }
  },
}

interface Container {
  props: IProps
}

@inject('systemInfo')
@observer
class Container extends Taro.PureComponent<IProps, IState>{
  constructor(props) {
    super(props)
    this.state = {
      systemInfo: props.systemInfo
    }
  }

  render() {
    const {
      systemInfo: {
        systemInfo: {
          windowHeight,
          statusBarHeight,
          system
        }
      }
    } = this.state
    let navBarHeight = 44
    if (system && system.indexOf('IOS') > -1) {
      navBarHeight = 48
    }
    const connStyle = {
      minHeight: `${windowHeight && (windowHeight - (statusBarHeight || 20) - navBarHeight)}px`
    }
    return (
      <View className='container' style={connStyle}>
        {this.props.children}
      </View>
    )
  }
}
export default Container
