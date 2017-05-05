var _sessionStorage = {}

window.sessionStorage = window.sessionStorage || {
  setItem: function(key, val) {
    _sessionStorage[key] = val
  },
  getItem: function(key) {
    return _sessionStorage[key] || null
  },
  removeItem: function(key) {
    delete _sessionStorage[key]
  },
  clear: function() {
    _sessionStorage = {}
  }
}