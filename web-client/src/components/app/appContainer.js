import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import App from './appComponent'
import {toggleNavigation} from '../ui/uiReducer'
import {getEpidemicLocationData, getEpidemicLocationDataForHomeLocation} from '../epidemic/epidemicReducer'

const mapStateToProps = state => ({
  isNavigationOpen: state.ui.isNavigationOpen,
  epidemicLocationData: state.epidemic.epidemicLocationData,
  epidemicLevel: state.epidemic.epidemicLevel,
  DSSData: state.epidemic.DSSData,
  DSSDataHome: state.epidemic.DSSDataHome,
  isLoadingDSSData: state.epidemic.isLoadingDSSData,
  address: state.epidemic.userData.address
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleNavigation,
  getEpidemicLocationData,
  getEpidemicLocationDataForHomeLocation
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)