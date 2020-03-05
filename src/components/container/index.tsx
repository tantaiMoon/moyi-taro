import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { ComponentType } from 'react'
import './index.scss'
import {inject, observer} from '@tarojs/mobx'

type IProps = {
  children: any,
  systemInfo: {
    systemInfo: {
      screenHeight: number,
      statusBarHeight: number,
      system: string
    }
  },
  // screenHeight: number,
  // statusBarHeight: number
}

interface Container {
  props: IProps
}

@inject('systemInfo')
@observer
class Container extends Taro.PureComponent<IProps, {}>{
  constructor(props) {
    super(props)
  }

  render() {
    const {
      systemInfo: {
        systemInfo: {
          screenHeight,
          statusBarHeight,
          system
        }
      }
    } = this.props
    let navBarHeight = 44
    if (system && system.indexOf('IOS') > -1) {
      navBarHeight = 48
    }
    const connStyle = {
      minHeight: `${screenHeight && (screenHeight - (statusBarHeight || 20) - navBarHeight)}px`
    }
    return (
      <View className='container' style={connStyle}>
        {this.props.children}
      </View>
    )
  }
}
export default Container
