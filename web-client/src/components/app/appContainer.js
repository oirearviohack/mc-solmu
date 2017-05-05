import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import App from './appComponent'
import {toggleNavigation} from '../ui/uiReducer'
import {getEpidemicLocationData} from '../epidemic/epidemicReducer'

const mapStateToProps = state => ({
  isNavigationOpen: state.ui.isNavigationOpen,
  epidemicLocationData: state.epidemic.epidemicLocationData,
  epidemicLevel: state.epidemic.epidemicLevel
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleNavigation,
  getEpidemicLocationData
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)