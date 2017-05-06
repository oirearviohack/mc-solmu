import React from 'react'
import PropTypes from 'prop-types'
import './panelComponent.scss'

const Panel = ({children}) => <div className="pn-Panel">{children}</div>

Panel.propTypes = {
  children: PropTypes.node
}

export default Panel