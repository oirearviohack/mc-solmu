import {createStore, applyMiddleware, combineReducers} from 'redux'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import {createBrowserHistory} from 'history'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import ui from './components/ui/uiReducer'

import {preloadIcons} from './components/ui/icon/iconUtils'

// Combine all our reducers to one root reducer
const rootReducer = combineReducers({
  ui
})

// Redux devtools composer
const composeEnhancers = composeWithDevTools({})

// Create history API handle
export const history = createBrowserHistory()

// Create the redux store
export const store = createStore(
  // Connect history to rootReducer
  connectRouter(history)(rootReducer),
  // Connect middlewares to redux devtools
  composeEnhancers(
    applyMiddleware(
      // Dispatches history actions
      routerMiddleware(history),
      // Thunked actions
      thunk
    )
  )
)

// Preload icons
preloadIcons()