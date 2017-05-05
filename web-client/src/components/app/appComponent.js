import React from 'react'
import PropTypes from 'prop-types'
import './appComponent.scss'
import HeaderContainer from '../header/headerContainer'
import Slideout from '../ui/slideout/slideoutComponent'
import Navigation from '../navigation/navigationComponent'

const App = ({toggleNavigation, isNavigationOpen}) => (
  <div className="app-AppContainer">
    <Slideout menuComponent={Navigation} onTranslateEnd={toggleNavigation} isOpen={isNavigationOpen}>
      <main className="app-MainContent">
        <HeaderContainer />

        <section className="app-PageContent">
          <pre>
            &nbsp;&nbsp;&nbsp;&nbsp;_____________<br />
            &nbsp;&nbsp;&nbsp;|             |<br />
            &nbsp;&nbsp;&nbsp;| Hello, App! |<br />
            &nbsp;&nbsp;&nbsp;|             |<br />
            &nbsp;&nbsp;&nbsp;/&#8254;&#8254;&#8254;&#8254;&#8254;&#8254;&#8254;&#8254;&#8254;&#8254;&#8254;&#8254;&#8254;<br />
            <span style={{fontSize: '2em'}}>🙋‍♂</span>️
          </pre>
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