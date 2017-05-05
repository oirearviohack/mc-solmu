import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'

import {history, store} from './setup'
import App from './components/app/appContainer'

import './styles/index.scss'

const wrapper = document.querySelector('.js-app')

render(
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  wrapper
)

if (module.hot) {
  module.hot.accept('./components/app/appComponent', () => {
    const HotApp = require('./components/app/appContainer').default
    render(
      <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <HotApp />
          </ConnectedRouter>
        </Provider>
      </AppContainer>,
      wrapper
    )
  })
}