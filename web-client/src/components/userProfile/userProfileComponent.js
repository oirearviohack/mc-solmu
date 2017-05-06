import React from 'react'
import PropTypes from 'prop-types'
import './userProfileComponent.scss'

const healthOptions = [
  {value: 10, display: '10 - Erittäin hyvä'},
  {value: 9, display: '9'},
  {value: 8, display: '8'},
  {value: 7, display: '7'},
  {value: 6, display: '6'},
  {value: 5, display: '5 - Keskitasoa'},
  {value: 4, display: '4'},
  {value: 3, display: '3'},
  {value: 2, display: '2'},
  {value: 1, display: '1 - Erittäin huono'}
]

export default class UserProfile extends React.Component {
  static propTypes = {
    updateUserData: PropTypes.func.isRequired,
    address: PropTypes.string,
    age: PropTypes.string,
    healthLevel: PropTypes.string,
    email: PropTypes.string
  }

  onUpdateUserData = () => {
    this.props.updateUserData({
      age: this.ageInput.value,
      healthLevel: this.healthInput.value
    })
  }

  render() {
    const {email, address, healthLevel, age} = this.props

    return (
      <div className="up-Profile">
        <h2 className="up-Profile_Title">Omat tietoni</h2>

        <div className="up-Control">
          <label className="up-Control_Label">Sähköposti</label>
          <div className="up-InputWrapper">
            <input className="up-TextInput" defaultValue={email} />

            <label className="up-EpidemyAlerts">
              <input className="up-EpidemyAlerts_Check" type="checkbox" />
              Haluan ilmoituksen uhkaavista epidemioista sähköpostiini
            </label>
          </div>
        </div>

        <div className="up-Control">
          <label className="up-Control_Label">Kotiosoite</label>
          <div className="up-InputWrapper">
            <input className="up-TextInput" defaultValue={address} />
          </div>
        </div>

        <div className="up-Control">
          <label className="up-Control_Label">Ikä</label>
          <div className="up-InputWrapper up-AgeInputWrapper">
            <input type="text" defaultValue={age} className="up-AgeInput" ref={ref => this.ageInput = ref}  onBlur={this.onUpdateUserData} />
          </div>
        </div>

        <div className="up-Profile_Control">
          <label className="up-Control_Label">Terveydentilani</label>
          <div className="up-InputWrapper">
            <select className="up-HealthInput" defaultValue={healthLevel} ref={ref => this.healthInput = ref} onChange={this.onUpdateUserData}>
              { healthOptions.map(({value, display}) => <option value={value}>{display}</option>)}
            </select>
          </div>
        </div>
      </div>
    )
  }
}
