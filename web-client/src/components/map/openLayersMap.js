import R from 'ramda'
import ol from './openlayers'
import {dispatchGetEpidemicLevelData} from '../epidemic/epidemicUtils'

const formatPointFeature = feature => {
  const {coordinates, type} = feature.geometry

  return {
    ...feature,
    geometry: {
      coordinates: ol.proj.fromLonLat(coordinates),
      type
    }
  }
}

const coordinateMatricetoLonLat = R.map(R.map(ol.proj.fromLonLat))

const formatPolygonFeature = feature => {
  const {coordinates, type} = feature.geometry

  return {
    ...feature,
    geometry: {
      coordinates: coordinateMatricetoLonLat(coordinates),
      type
    }
  }
}

const formatFeatures = R.ifElse(
  R.pathEq([0, 'geometry', 'type'], 'Polygon'),
  R.map(formatPolygonFeature),
  R.map(formatPointFeature)
)

const formatData = data => ({
  ...data,
  features: formatFeatures(data.features)
})

export const getStyleByFeatureType = (styles, feature) => styles[feature.getGeometry().getType()]

export default class OpenLayersMap {
  constructor(selector) {
    const image = new ol.style.Circle({
      radius: 5,
      fill: new ol.style.Fill({color: 'red'}),
      stroke: new ol.style.Stroke({color: 'red', width: 1})
    })

    const styles = {
      'Polygon': new ol.style.Style({
        fill: new ol.style.Fill({color:[0,0,255,0.2]}),
        stroke: new ol.style.Stroke({color: 'blue', width: 1})        
      }),
      'Point': new ol.style.Style({image})
    }

    this.vectorSource = new ol.source.Vector()
    this.vectorSourcePinned = new ol.source.Vector()

    this.vectorLayer = new ol.layer.Vector({
      source: this.vectorSource,
      style: R.curry(getStyleByFeatureType)(styles)
    })

    this.vectorLayerPinned = new ol.layer.Vector({
      source: this.vectorSourcePinned,
      //style: R.curry(getStyleByFeatureType)(styles)
    })

    this.map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        this.vectorLayer,
        this.vectorLayerPinned
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

      const userLocationPinned = {
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
        properties: {
          name: 'pinned-location'
        }
      }

      var iconFeature = new ol.Feature(userLocationPinned)

      const iconStyle = new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 30],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: '/static/images/pin.png'
        })
      })

      iconFeature.setStyle(iconStyle)
      this.vectorSourcePinned.clear()
      this.vectorSourcePinned.addFeature(iconFeature)

      dispatchGetEpidemicLevelData(lat, lon)
    })
  }

  updateHomePin = () => {
    const pointsOfInterest = {
      geometry: new ol.geom.Point(ol.proj.fromLonLat([24.847530717623886, 60.32469782329352])),
      properties: {
        name: 'Home-location'
      }
    }

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

  updateDataLayer = rawFeatureData => {
    if (!rawFeatureData) {
      return
    }

    const formattedFeatures = formatData(rawFeatureData)

    this.vectorSource.clear()
    this.vectorSource.addFeatures(new ol.format.GeoJSON().readFeatures(formattedFeatures))
  }

  updateMap = dataSets => {
    if (!dataSets || R.empty(dataSets)) {
      return
    }

    dataSets.map(this.updateDataLayer)
    this.updateHomePin()
  }
}