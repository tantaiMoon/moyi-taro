import { action, observable } from 'mobx'
import fetch from '@/api/fetch'
import { WEATHER_API } from '@/api/index'

class DataStore {
  @observable nowWeather = []

  @action
  getNowWeatherData = () => {
    let params = {
      url: WEATHER_API('now'),
      method: 'GET',
      payload: {
        location: 'beijing',
        key: '7e27e89bf8bf4023b0e50401646fd1fb'
      }
    }

    fetch(params)
      .then(res => {
        console.log('log --------- res: ', res)
      })
  }
}

export default DataStore

