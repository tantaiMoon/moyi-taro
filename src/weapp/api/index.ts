
export const API_LOGIN = `login`

export const WEATHER_API = (type, parameters) => {
  return `weather/${type}?${parameters}`
}

export const WEATHER_GRID_API = (gridType, parameters) => {
  return `weather/${gridType}?${parameters}`
}

