import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import UserProfile from './userProfileComponent'
import {updateUserData} from '../epidemic/epidemicReducer'

const mapStateToProps = state => ({
  address: state.epidemic.userData.address,
  healthLevel: state.epidemic.userData.healthLevel,
  age: state.epidemic.userData.age
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateUserData
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)