/**
 * Wrapper component for OpenLayers
 */
import React from 'react'
import PropTypes from 'prop-types'
import OpenLayersMap from './openLayersMap'
import './mapComponent.scss'

export default class Map extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  containerId = 'js-map' + new Date().getTime()

  componentWillReceiveProps(nextProps) {
    this.map.updateVectorSource(nextProps.data)
  }

  render = () => <div className="map-Map" id={this.containerId} />

  componentDidMount() {
    this.map = new OpenLayersMap(this.containerId, this.props.data)
  }
  
}
