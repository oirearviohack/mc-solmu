import {fetchEpidemicLevel, fetchNextSimulationFrame, queryDSS} from './epidemicApi'

const POLL_EPIDEMIC_LOCATION_DATA = 'app/epidemic/POLL_EPIDEMIC_LOCATION_DATA'
const RECEIVE_EPIDEMIC_LOCATION_DATA = 'app/epidemic/RECEIVE_EPIDEMIC_LOCATION_DATA'
const POLL_DSS_DATA = 'app/epidemic/POLL_DSS_DATA'
const RECEIVE_DSS_DATA = 'app/epidemic/RECEIVE_DSS_DATA'
const UPDATE_USER_DATA = 'app/epidemic/UPDATE_USER_DATA'
const DATA_MISSING = 'app/epidemic/DATA_MISSING'
const UPDATE_EPIDEMIC_LEVEL = 'app/epidemic/SET_EPIDEMIC_LEVEL'

const initialState = {
  epidemicLocationData: null,
  isLoadingEpidemicLocationData: false,
  isLoadingDSSData: false,
  DSSData: null,
  epidemicLevel: [],
  userData: {
    address: 'Mustankivenkuja 5, Espoo',
    healthLevel: 5,
    age: 80
  }
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
    case UPDATE_USER_DATA: {
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.data
        }
      }
    }
    case UPDATE_EPIDEMIC_LEVEL: {
      return {
        ...state,
        epidemicLevel: action.epidemicLevel
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

export const dataMissing = () => ({
  type: DATA_MISSING
})

export const setUserData = data => ({
  type: UPDATE_USER_DATA,
  data
})

export const setEpidemicLevel = epidemicLevel => ({
  type: UPDATE_EPIDEMIC_LEVEL,
  epidemicLevel
})

// Async actions

export const getEpidemicLocationData = () => {
  return dispatch => {
    dispatch(pollEpidemicLocationData())
    Promise.all([
      fetchNextSimulationFrame(50),
      fetchNextSimulationFrame(80),
      fetchNextSimulationFrame(100)
    ])
    .then(data => dispatch(receiveEpidemicLocationData(data)))
    .catch(() => dispatch(dataMissing()))
  }
}

export const getEpidemicLevelData = (lat, lon, time) => {
  return dispatch => {
    dispatch(pollDSSData())
    fetchEpidemicLevel(lat, lon, time).then(data => {
      dispatch(setEpidemicLevel(data))
      dispatch(postDSSData(data))
    })
  }
}

export const postDSSData = (epidemicLevel) => {
  return (dispatch, getState) => {
    const {epidemic: {userData: {age, healthLevel}}} = getState()
    queryDSS(epidemicLevel, age, healthLevel).then(data => dispatch(receiveDSSData(data)))
  }
}

export const updateUserData = data => {
  return (dispatch, getState) => {
    const {epidemic: {epidemicLevel}} = getState()
    dispatch(setUserData(data))
    dispatch(postDSSData(epidemicLevel))
  }
}