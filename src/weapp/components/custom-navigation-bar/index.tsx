
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import CustomNavigation from './components'

import './index.scss'

type PropsType = {
  title: string,
  goPath: string,
    back?: boolean,
    bgColor?: any,
    txtColor: string,
    bgImg: string,
  children?: any
}

type IState = {}


class CustomNavigationBar extends Component<PropsType, IState> {
  static defaultProps = {
    title: '',
    back: false,
    txtColor: '#000000',
    bgImg: '',
    bgColor: '#ffffff',
    goPath: ''
  }

  handleGoBack = () => {
    const {goPath} = this.props
    if (goPath) {
      Taro.reLaunch({
        url: goPath
      })
    } else {
      Taro.navigateBack()
    }
  }

  render() {
    const { title, back, txtColor } = this.props

    const titleStyle = {
      color: txtColor
    }

    return (
      <CustomNavigation
        {...this.props}
      >
        <View className='navigation'>
          {back && <AtIcon onClick={this.handleGoBack} value='chevron-left' color={txtColor} />}
          <View className='title-box'>
            <Text className='title' style={titleStyle}>
              {title}
            </Text>
          </View>
        </View>
      </CustomNavigation>
    )
  }
}

export default CustomNavigationBar
