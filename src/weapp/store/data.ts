import { action, observable } from 'mobx'
import fetch from '@/api/fetch'
import { WEATHER_API } from '@/api/index'

class DataStore {
  @observable nowWeather = []

  @action
  getNowWeatherData = (param) => {
    let params = {
      url: WEATHER_API(param.type),
      method: 'GET',
      payload: {
        location: param.location || 'beijing',
        key: '7e27e89bf8bf4023b0e50401646fd1fb'
      },
      type: 2
    }

    const weather = fetch(params) || Promise.resolve()
    weather.then(res => {
      console.log('log --------- res: ', res)
      this.nowWeather = res
    }).catch(err => {
      console.log('log --------- : ', err)
    })
  }
}

export default DataStore

