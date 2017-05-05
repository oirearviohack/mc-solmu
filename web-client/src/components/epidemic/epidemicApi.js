let frame = 0
const maxFrame = 85

export const getNextSimulationFrame = () => {
  frame = frame > maxFrame ? 0 : frame
  return fetch(`/static/simulations/epidemic1/frame_${frame++}.json`).then(data => data.json())
}