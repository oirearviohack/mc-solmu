import {fetchEpidemicLevel, fetchNextSimulationFrame} from './epidemicApi'

const POLL_EPIDEMIC_LOCATION_DATA = 'app/epidemic/POLL_EPIDEMIC_LOCATION_DATA'
const RECEIVE_EPIDEMIC_LOCATION_DATA = 'app/epidemic/RECEIVE_EPIDEMIC_LOCATION_DATA'
const POLL_EPIDEMIC_LEVEL_DATA = 'app/epidemic/POLL_EPIDEMIC_LEVEL_DATA'
const RECEIVE_EPIDEMIC_LEVEL_DATA = 'app/epidemic/RECEIVE_EPIDEMIC_LEVEL_DATA'

const initialState = {
  epidemicLocationData: null,
  isLoadingEpidemicLocationData: false,
  isLoadingEpidemicLevelData: false,
  epidemicLevel: null
}

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case POLL_EPIDEMIC_LOCATION_DATA: {
      return {
        ...state,
        isLoadingEpidemicLocationData: true
      }
    }
    case RECEIVE_EPIDEMIC_LOCATION_DATA: {
      return {
        ...state,
        isLoadingEpidemicLocationData: false,
        epidemicLocationData: action.data
      }
    }
    case POLL_EPIDEMIC_LEVEL_DATA: {
      return {
        ...state,
        isLoadingEpidemicLevelData: true
      }
    }
    case RECEIVE_EPIDEMIC_LEVEL_DATA: {
      return {
        ...state,
        isLoadingEpidemicLevelData: false,
        epidemicLevel: action.data
      }
    }
    default: {
      return state
    }
  }
}

export const pollEpidemicLocationData = () => ({
  type: POLL_EPIDEMIC_LOCATION_DATA
})

export const receiveEpidemicLocationData = data => ({
  type: RECEIVE_EPIDEMIC_LOCATION_DATA,
  data
})

export const pollEpidemicLevelData = () => ({
  type: POLL_EPIDEMIC_LEVEL_DATA
})

export const receiveEpidemicLevelData = data => ({
  type: RECEIVE_EPIDEMIC_LEVEL_DATA,
  data
})

// Async actions

export const getEpidemicLocationData = () => {
  return dispatch => {
    dispatch(pollEpidemicLocationData())
    fetchNextSimulationFrame().then(data => dispatch(receiveEpidemicLocationData(data)))
  }
}

export const getEpidemicLevelData = (lat, lon, time) => {
  return dispatch => {
    dispatch(pollEpidemicLevelData())
    fetchEpidemicLevel(lat, lon, time).then(data => dispatch(receiveEpidemicLevelData(data)))
  }
}