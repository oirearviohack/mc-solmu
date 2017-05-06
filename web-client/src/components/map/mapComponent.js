/**
 * Wrapper component for OpenLayers
 */
import React from 'react'
import PropTypes from 'prop-types'
import OpenLayersMap from './openLayersMap'
import './mapComponent.scss'

export default class Map extends React.Component {
  static propTypes = {
    dataSets: PropTypes.array
  }

  containerId = 'js-map' + new Date().getTime()

  componentWillReceiveProps(nextProps) {
    this.map.updateMap(nextProps.dataSets)
  }

  render = () => <div className="map-Map" id={this.containerId} />

  componentDidMount() {
    this.map = new OpenLayersMap(this.containerId)
  }
}
