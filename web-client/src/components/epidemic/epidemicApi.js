import R from 'ramda'

let frame = 0
const maxFrame = 169

const POSTHeaders =  {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

export const fetchNextSimulationFrame = level => {
  frame = frame > maxFrame ? 0 : frame
  return fetch(`/static/simulations/epidemic3/polys${level}_${frame++}.json`).then(data => data.json())
}

export const fetchEpidemicLevel = (lat, lon, time) =>
  fetch(`//localhost:6085/epidemic-level/all?lat=${lat}&lon=${lon}&t=0`).then(data => data.json())

const parseDSSResult = R.pipe(
  R.values,
  R.head
)

export const queryDSS = (epidemicLevel, age, healthLevel) => fetch('//localhost:6086/dss', {
  ...POSTHeaders,
  body: JSON.stringify({
    epidemicLevel: epidemicLevel,
    age,
    healthLevel
  })
})
  .then(data => data.json())
  .then(parseDSSResult)