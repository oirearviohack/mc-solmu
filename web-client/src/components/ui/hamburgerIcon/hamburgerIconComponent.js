import React from 'react'
import PropTypes from 'prop-types'
import './hamburgerIcon.scss'
import classnames from 'classnames'

const HamburgerIcon = ({isOpen}) => (
  <span className={classnames('hbg-Button', {'is-Open': isOpen})}>
    <span className="hbg-Button_Line hbg-Button_Line-top" />
    <span className="hbg-Button_Line hbg-Button_Line-middle" />
    <span className="hbg-Button_Line hbg-Button_Line-bottom" />
    <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
  </span>
)

HamburgerIcon.propTypes = {
  isOpen: PropTypes.bool.isRequired
}

export default HamburgerIcon