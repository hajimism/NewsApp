// News
export type NewsProps = {
  author: string
  title: string
  url: string
  urlToImage: string
  publishedAt: string
}
// News」

// Weather
export type CurrentWeatherProps = {
  temp: number
  clouds: number
  weather: [
    conditions: {
      main: string
      icon: string
    }
  ]
}

export type DailyWeatherProps = {
  dt: number
  clouds: number
  temp: {
    min: number
    max: number
  }
  weather: [
    conditions: {
      id: number
      icon: string
    }
  ]
}

export interface WeatherNewsProps {
  weatherNews: {
    current: CurrentWeatherProps
    daily: DailyWeatherProps[]
  }
}
// Weather」
