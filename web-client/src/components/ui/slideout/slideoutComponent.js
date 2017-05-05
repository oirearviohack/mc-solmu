import React from 'react'
import PropTypes from 'prop-types'
import SlideoutJS from 'slideout'
import classnames from 'classnames'
import './slideoutComponent.scss'

const DEFAULT_OPTIONS = {
  padding: 256,
  tolerance: 70,
  easing: 'cubic-bezier(.32,2,.55,.27)'
}

/**
 * Wrapper component for Slideout.js
 */
export default class Slideout extends React.Component {
  static propTypes = {
    menuComponent: PropTypes.func.isRequired,
    onTranslateEnd: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    menuClass: PropTypes.string,
    options: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    const options = this.props.options || {}

    this.options = {
      ...DEFAULT_OPTIONS,
      ...options
    }

    const id = new Date().getTime()
    this.menuId = `menu-${id}`
    this.panelId = `panel-${id}`
  }

  toggle() {
    this.slideout.toggle()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen) {
      this.slideout.open()
    } else {
      this.slideout.close()
    }
  }

  render() {
    const {
      menuComponent: MenuComponent,
      menuClass,
      children,
    } = this.props

    return (
      <div className="slideout-Slideout">
        <div id={this.menuId} className={classnames({menuClass})}>
          <MenuComponent />
        </div>

        <div id={this.panelId} className="slideout-Panel">
          { children }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.slideout = new SlideoutJS({
      ...this.options,
      menu: document.getElementById(this.menuId),
      panel: document.getElementById(this.panelId),
      side: 'right'
    })
    this.slideout.on('translateend', () => {
      this.props.onTranslateEnd()
    })
  }
}
