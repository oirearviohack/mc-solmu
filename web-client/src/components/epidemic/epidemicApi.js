let frame = 0
const maxFrame = 169

export const fetchNextSimulationFrame = () => {
  frame = frame > maxFrame ? 0 : frame
  return fetch(`/static/simulations/epidemic2/frame_${frame++}.json`).then(data => data.json())
}

export const fetchEpidemicLevel = (lat, lon, time) =>
  fetch(`//0.0.0.0:6085/epidemic-level?lat=${lat}&lon=${lon}&t=${time}`).then(data => data.json())