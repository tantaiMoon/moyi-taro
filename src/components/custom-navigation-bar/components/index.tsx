import Taro, { Component } from '@tarojs/taro'
import { View }     from '@tarojs/components'
import {inject, observer} from '@tarojs/mobx'
// eslint-disable-next-line no-unused-vars
import { ComponentType }  from 'react'

import './index.scss'

type IPropsType = {
  systemInfo: {
    statusBarHeight: number
  },
  bgColor?: any,
  bgImg: string,
  // color: string,
  children: any
}

type PageState = {

}

interface CustomNavigation {
  props: IPropsType
}

@inject('systemInfo')
@observer
class CustomNavigation extends Component<IPropsType, PageState> {
  static defaultProps = {
    color: 'black',
    bgColor: '#fff',
    bgImg: ''
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {
      systemInfo,
      bgColor,
      // color,
      bgImg
    } = this.props
    const barStyle = {
      paddingTop: `${(systemInfo && systemInfo.statusBarHeight) || 20}px`,
      backgroundColor: bgColor,
      backgroundImage: `url(${bgImg})`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      // color
    }
    return (
      <View className='navigation'>
        <View className='bar' style={barStyle}>
          {this.props.children}
        </View>
        <View className='placeholder' style={barStyle} />
      </View>
    )
  }
}

export default CustomNavigation as ComponentType
