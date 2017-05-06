import {fetchEpidemicLevel, fetchNextSimulationFrame, queryDSS} from './epidemicApi'

const POLL_EPIDEMIC_LOCATION_DATA = 'app/epidemic/POLL_EPIDEMIC_LOCATION_DATA'
const RECEIVE_EPIDEMIC_LOCATION_DATA = 'app/epidemic/RECEIVE_EPIDEMIC_LOCATION_DATA'
const POLL_DSS_DATA = 'app/epidemic/POLL_DSS_DATA'
const RECEIVE_DSS_DATA = 'app/epidemic/RECEIVE_DSS_DATA'

const initialState = {
  epidemicLocationData: null,
  isLoadingEpidemicLocationData: false,
  isLoadingDSSData: false,
  DSSData: null
}

export default function epidemicReducer(state = initialState, action) {
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
    case POLL_DSS_DATA: {
      return {
        ...state,
        isLoadingDSSData: true,
        DSSData: null
      }
    }
    case RECEIVE_DSS_DATA: {
      return {
        ...state,
        isLoadingDSSData: false,
        DSSData: action.data
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

export const pollDSSData = () => ({
  type: POLL_DSS_DATA
})

export const receiveDSSData = data => ({
  type: RECEIVE_DSS_DATA,
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
    dispatch(pollDSSData())
    fetchEpidemicLevel(lat, lon, time).then(data => {
      dispatch(postDSSData(data))
    })
  }
}

export const postDSSData = (epidemicLevel, age, healthLevel) => {
  return dispatch => {
    queryDSS(epidemicLevel, age, healthLevel).then(data => dispatch(receiveDSSData(data)))
  }
}