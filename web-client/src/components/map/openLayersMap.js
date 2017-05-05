import ol from 'openlayers'
import R from 'ramda'

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

const formatFeatures = features => R.map(formatFeature)

const formatData = data => ({
  ...data,
  features: formatFeatures(data.features)
})

const formatter = new ol.format.GeoJSON()

export const rawFeatureDataToVectorSourceFeatures = R.pipe(
  formatData,
  formatter.readFeatures
)


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

    const vectorSourceOptions = rawFeatureData && !R.empty(rawFeatureData) ?
      {features: rawFeatureDataToVectorSourceFeatures(rawFeatureData)} :
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
        center: ol.proj.fromLonLat([25.013974117045205, 62.516839522085604]),
        zoom: 9
      })
    })
  }

  updateVectorSource = rawFeatureData => {
    if (!rawFeatureData || R.empty(rawFeatureData)) {
      return
    }

    const features = rawFeatureDataToVectorSourceFeatures(rawFeatureData)
    this.vectorSource.clear()
    this.vectorSource.addFeatures(features)
  }
}