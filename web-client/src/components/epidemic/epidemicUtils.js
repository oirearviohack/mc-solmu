import {getEpidemicLevelData} from './epidemicReducer'
import {store} from '../../setup'

export const dispatchGetEpidemicLevelData = (lat, lon) => store.dispatch(getEpidemicLevelData(lat, lon, 0))