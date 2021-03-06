import R from 'ramda'

let frame = 0
const maxFrame = 169

const POSTHeaders =  {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}
const getWindowOrigin = () => window.location.protocol + '//' + window.location.hostname

export const fetchNextSimulationFrame = level => {
  frame = frame > maxFrame ? 0 : frame
  return fetch(getWindowOrigin() + `:8090/static/simulations/epidemic3/polys${level}_${frame++}.json`).then(data => data.json())
}

export const fetchEpidemicLevel = (lat, lon) =>
  fetch(getWindowOrigin() + `:9085/epidemic-level/all?lat=${lat}&lon=${lon}&t=0`).then(data => data.json())

const parseDSSResult = R.pipe(
  R.values,
  R.head
)

export const queryDSS = (epidemicLevel, age, healthLevel) => fetch(getWindowOrigin() + ":9086/dss", {
  ...POSTHeaders,
  body: JSON.stringify({
    epidemicLevel: epidemicLevel,
    age,
    healthLevel
  })
})
  .then(data => data.json())
  .then(parseDSSResult)