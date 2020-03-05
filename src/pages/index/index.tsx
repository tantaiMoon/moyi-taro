// eslint-disable-next-line no-unused-vars
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {inject, observer} from '@tarojs/mobx'
import CustomNavigationBar from '@components/custom-navigation-bar'
import Container from '@components/container'
import './index.scss'


type IProps = {
  systemInfo: any
}

interface Index {
  props: IProps
}

@inject('systemInfo')
@observer
class Index extends Component<IProps> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页',
    navigationStyle: 'custom'
  }

  componentWillMount () { }

  componentDidMount () {
    this.props.systemInfo.getSystemInfo()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <CustomNavigationBar
          txtColor='#000'
          title='莫逸'
          bgColor='#F4F4F4'
          back={false}
          bgImg=''
        />
        <Container>
          <View className='wrapper'>
            <Text>Hello world!</Text>
          </View>
        </Container>

      </View>
    )
  }
}

export default Index
