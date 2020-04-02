import Taro  from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import {inject, observer} from '@tarojs/mobx'
import CustomNavigationBar from '@/components/custom-navigation-bar'
import Container from '@/components/container'
import './index.scss'

interface IProps {
  systemInfo: any
}


@inject('systemInfo')
@observer
class Mine extends Taro.PureComponent<IProps, {}> {

  config: Taro.Config = {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom'
  }

  getUserInfo = (e) => {
    try {
      // console.log('log --------- e: ', e)
      Taro.setStorageSync('USER_INFO', e.detail.userInfo)
      this.props.systemInfo.setLoginStatus(true)
    } catch (err) {
      console.log('log --------- err: ', err)
    }
  }

  render() {
    const {systemInfo: {isLogin}} = this.props
    return (
      <View>
        <CustomNavigationBar
          title='我的'
          back={false}
          bgImg=''
          txtColor='#000'
        />
        <Container>
          <View className='wrapper'>
            {
              !isLogin ? <View className='wx-login'>
                <Button
                  type='primary'
                  openType='getUserInfo'
                  onGetUserInfo={this.getUserInfo}
                >
                  微信登录
                </Button>
              </View> : null
            }
            wrapper mine
          </View>
        </Container>
        mine
      </View>
    )
  }
}

export default Mine
