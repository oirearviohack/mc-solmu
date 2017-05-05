import React from 'react'
import PropTypes from 'prop-types'
import './appComponent.scss'
import HeaderContainer from '../header/headerContainer'
import Slideout from '../ui/slideout/slideoutComponent'
import Navigation from '../navigation/navigationComponent'
import Map from '../map/mapComponent'

const App = ({toggleNavigation, isNavigationOpen}) => (
  <div className="app-AppContainer">
    <Slideout menuComponent={Navigation} onTranslateEnd={toggleNavigation} isOpen={isNavigationOpen}>
      <main className="app-MainContent">
        <HeaderContainer />

        <section className="app-PageContent">

          <Map data={[]} />

        </section>
      </main>
    </Slideout>
  </div>
)

App.propTypes = {
  toggleNavigation: PropTypes.func.isRequired,
  isNavigationOpen: PropTypes.bool.isRequired
}

export default App