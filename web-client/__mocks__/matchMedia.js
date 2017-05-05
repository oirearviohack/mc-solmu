/**
 * MatchMedia API mock (for headless browser)
 */
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {}
  }
}