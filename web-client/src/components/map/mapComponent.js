/**
 * Wrapper component for OpenLayers
 */
import React from 'react'
import PropTypes from 'prop-types'
import OpenLayersMap from './openLayersMap'

export default class Map extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  containerId = 'js-map' + new Date().getTime()

  componentWillReceiveProps(nextProps) {
    this.map.updateVectorSource(nextProps.data)
  }

  render() {
    return (
      <div className="map-Map">
        <div id={this.containerId} />
      </div>
    )
  }

  componentDidMount() {
    this.map = new OpenLayersMap(this.containerId, this.props.data)
  }
}
