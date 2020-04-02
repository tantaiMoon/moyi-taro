import Taro  from '@tarojs/taro'
import { View } from '@tarojs/components'
import CustomNavigationBar from '@/components/custom-navigation-bar'
import Container from '@/components/container'
import './index.scss'

class Mine extends Taro.PureComponent {

  config: Taro.Config = {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom'
  }

  render() {
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
            wrapper mine
          </View>
        </Container>
        mine
      </View>
    )
  }
}

export default Mine
