import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './iconComponent.scss'

const Icon = ({glyph, className, style}) => (
  <svg className={classnames('icon-Icon', className)} style={style || {}}>
    <use xlinkHref={`#${glyph}`}></use>
  </svg>
)

Icon.propTypes = {
  glyph: PropTypes.string.isRequired
}

export default Icon
