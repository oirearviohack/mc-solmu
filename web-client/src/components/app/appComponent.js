import React from 'react'
import PropTypes from 'prop-types'
import './appComponent.scss'
import HeaderContainer from '../header/headerContainer'
import Slideout from '../ui/slideout/slideoutComponent'
import Navigation from '../navigation/navigationComponent'
import Map from '../map/mapComponent'
import Panel from '../ui/panel/panelComponent'

export default class App extends React.Component {
  static propTypes = {
    toggleNavigation: PropTypes.func.isRequired,
    isNavigationOpen: PropTypes.bool.isRequired,
    getEpidemicLocationData: PropTypes.func.isRequired,
    epidemicLocationData: PropTypes.array,
    DSSData: PropTypes.string,
    isLoadingDSSData: PropTypes.bool.isRequired
  }

  pollInterval = null

  render() {
    const {
      toggleNavigation,
      isNavigationOpen,
      epidemicLocationData,
      DSSData
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
                    <Panel>
                      {
                        DSSData ? (
                          <h1 className="animated fadeIn">{DSSData}</h1>
                        ) : (
                          <p className="animated fadeIn">Toimenpiteitä ei tarvita</p>
                        )
                      }
                    </Panel>
                  </div>
                  <div className="col-xs-6">
                    <Panel>
                      <Map dataSets={epidemicLocationData} />
                    </Panel>
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