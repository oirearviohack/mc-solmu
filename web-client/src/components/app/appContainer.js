import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import App from './appComponent'
import {toggleNavigation} from '../ui/uiReducer'

const mapStateToProps = state => ({
  isNavigationOpen: state.ui.isNavigationOpen
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleNavigation
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)