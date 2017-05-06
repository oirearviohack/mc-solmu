import R from 'ramda'
import ol from './openlayers'
import {dispatchGetEpidemicLevelData} from '../epidemic/epidemicUtils'

const formatFeature = feature => {
  const {coordinates, type} = feature.geometry

  return {
    ...feature,
    geometry: {
      coordinates: ol.proj.fromLonLat(coordinates),
      type
    }
  }
}

const formatFeatures = R.map(formatFeature)

const formatData = data => ({
  ...data,
  features: formatFeatures(data.features)
})

export const getStyleByFeatureType = (styles, feature) => styles[feature.getGeometry().getType()]

export default class OpenLayersMap {
  constructor(selector, rawFeatureData) {
    const image = new ol.style.Circle({
      radius: 5,
      fill: new ol.style.Fill({color: 'red'}),
      stroke: new ol.style.Stroke({color: 'red', width: 1})
    })

    const styles = {
      'Point': new ol.style.Style({image})
    }

    const vectorSourceOptions = rawFeatureData ?
      {features: new ol.format.GeoJSON().readFeatures(formatData(rawFeatureData))} :
      {}

    this.vectorSource = new ol.source.Vector(vectorSourceOptions)

    this.vectorLayer = new ol.layer.Vector({
      source: this.vectorSource,
      style: R.curry(getStyleByFeatureType)(styles)
    })

    this.map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        this.vectorLayer
      ],
      target: selector,
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }),
      view: new ol.View({
        center: ol.proj.fromLonLat([24.80835953847857, 60.41412413929856]),
        zoom: 9
      })
    })
    this.setUserLocation()
  }

  setUserLocation() {
    this.map.on('click', evt => {
      const [lon, lat] = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326')
      console.log('User has selected his or her location at this point[' + lon + ', ' + lat + ']')
      dispatchGetEpidemicLevelData(lat, lon)
    })
  }

  updateVectorSource = rawFeatureData => {
    if (!rawFeatureData) {
      return
    }

    const pointsOfInterest = {
      geometry: new ol.geom.Point(ol.proj.fromLonLat([24.847530717623886, 60.32469782329352])),
      properties: {
        name: 'Home-location'
      }
    }

    const formattedFeatures = formatData(rawFeatureData)
    this.vectorSource.clear()
    this.vectorSource.addFeatures(new ol.format.GeoJSON().readFeatures(formattedFeatures))

    var iconFeature = new ol.Feature(pointsOfInterest)

    const iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: '/static/images/home_location.png'
      })
    })

    iconFeature.setStyle(iconStyle)

    this.vectorSource.addFeature(iconFeature)
  }
}