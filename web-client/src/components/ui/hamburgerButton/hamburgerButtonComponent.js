import React from 'react'
import PropTypes from 'prop-types'
import './hamburgerButton.scss'
import classnames from 'classnames'

const HamburgerButton = ({isOpen, onClick}) => (
  <button className={classnames('hbg-Button', {'is-Open': isOpen})} onClick={onClick}>
    <span className="hbg-Button_Line hbg-Button_Line-top" />
    <span className="hbg-Button_Line hbg-Button_Line-middle" />
    <span className="hbg-Button_Line hbg-Button_Line-bottom" />
    <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
  </button>
)

HamburgerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}

export default HamburgerButton