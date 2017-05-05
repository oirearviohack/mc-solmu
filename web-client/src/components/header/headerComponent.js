import React from 'react'
import PropTypes from 'prop-types'
import './headerComponent.scss'
import Icon from '../ui/icon/iconComponent'

const Header = ({toggleNavigation}) => (
  <header className="hd-Header">
    <div className="row middle-xs">
      <div className="col-xs-6">
        <h1 className="hd-PageTitle">
          <span className="hd-LogoWrapper">
            <Icon glyph="donation" className="hd-Logo" />
          </span>

          Epidemiakartta
        </h1>
      </div>

      <div className="col-xs-6 hd-UserControlsWrapper">
        <button className="hd-UserControls" onClick={toggleNavigation}>
          Omat tietoni

          <Icon glyph="avatar" className="hd-UserControls_Button" />
        </button>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  isNavigationOpen: PropTypes.bool.isRequired,
  toggleNavigation: PropTypes.func.isRequired
}

export default Header