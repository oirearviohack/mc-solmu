import React from 'react'
import PropTypes from 'prop-types'
import './headerComponent.scss'
import HamburgerButton from '../ui/hamburgerButton/hamburgerButtonComponent'

const Header = ({isNavigationOpen, toggleNavigation}) => (
  <header className="hd-Header">
    <HamburgerButton isOpen={isNavigationOpen} onClick={toggleNavigation} />

    <h1 className="hd-PageTitle">
      App Title
    </h1>
  </header>
)

Header.propTypes = {
  isNavigationOpen: PropTypes.bool.isRequired,
  toggleNavigation: PropTypes.func.isRequired
}

export default Header