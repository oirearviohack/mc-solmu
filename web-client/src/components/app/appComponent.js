import React from 'react'
import PropTypes from 'prop-types'
import './appComponent.scss'
import HeaderContainer from '../header/headerContainer'
import Slideout from '../ui/slideout/slideoutComponent'
import Navigation from '../navigation/navigationComponent'
import Map from '../map/mapComponent'

export default class App extends React.Component {
  static propTypes = {
    toggleNavigation: PropTypes.func.isRequired,
    isNavigationOpen: PropTypes.bool.isRequired,
    getEpidemicLocationData: PropTypes.func.isRequired,
    epidemicLocationData: PropTypes.object
  }

  pollInterval = null

  render() {
    const {
      toggleNavigation,
      isNavigationOpen,
      epidemicLevel,
      epidemicLocationData
    } = this.props

    return (
      <div className="app-AppContainer">
        <Slideout menuComponent={Navigation} onTranslateEnd={toggleNavigation} isOpen={isNavigationOpen}>
          <main className="app-MainContent">
            <HeaderContainer />

            <section className="app-PageContent">

              <div className="wrapper">
                <div className="row">
                  <div className="col-xs-6">
                    <div className="pn-Panel">
                      <h1>{epidemicLevel}</h1>
                    </div>
                  </div>
                  <div className="col-xs-6">
                    <div className="pn-Panel">
                      <Map data={epidemicLocationData} />
                    </div>
                  </div>
                </div>
              </div>

            </section>
          </main>
        </Slideout>
      </div>
    )
  }

  componentDidMount() {
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.props.getEpidemicLocationData, 500)
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) {
      clearInterval()
    }
  }
}