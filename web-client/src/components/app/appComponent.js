import React from 'react'
import PropTypes from 'prop-types'
import './appComponent.scss'
import HeaderContainer from '../header/headerContainer'
import Slideout from '../ui/slideout/slideoutComponent'
import Map from '../map/mapComponent'
import Panel from '../ui/panel/panelComponent'
import UserProfileContainer from '../userProfile/userProfileContainer'
import Icon from '../ui/icon/iconComponent'

export default class App extends React.Component {
  static propTypes = {
    toggleNavigation: PropTypes.func.isRequired,
    isNavigationOpen: PropTypes.bool.isRequired,
    getEpidemicLocationDataForHomeLocation: PropTypes.func.isRequired,
    getEpidemicLocationData: PropTypes.func.isRequired,
    epidemicLocationData: PropTypes.array,
    DSSData: PropTypes.string,
    DSSDataHome: PropTypes.string,
    isLoadingDSSData: PropTypes.bool.isRequired,
    address: PropTypes.string
  }

  pollInterval = null

  render() {
    const {
      toggleNavigation,
      isNavigationOpen,
      epidemicLocationData,
      DSSData,
      DSSDataHome,
      address
    } = this.props

    return (
      <div className="app-AppContainer">
        <Slideout menuComponent={UserProfileContainer} onTranslateEnd={toggleNavigation} isOpen={isNavigationOpen}>
          <main className="app-MainContent">
            <HeaderContainer />

            <section className="app-PageContent">

              <div className="wrapper">
                <div className="row">
                  <div className="col-xs-6">
                    <Panel>
                      <section className="app-DSSSection">
                        <h2 className="app-DSSSection_Title">
                          <span className="app-DSSSection_IconWrapper">
                            <Icon glyph="location" />
                          </span>
                          Tämänhetkinen sijaintisi
                        </h2>
                        {
                          DSSData ? (
                            <div className="app-DSSResult animated fadeIn" dangerouslySetInnerHTML={{__html: DSSData}} />
                          ) : (
                            <div className="app-DSSResult animated fadeIn">
                              <p>Alueella ei tarvita erityistoimenpiteitä.</p>
                            </div>
                          )
                        }
                      </section>

                      <section className="app-DSSSection">
                        <h2 className="app-DSSSection_Title">
                          <span className="app-DSSSection_IconWrapper">
                            <Icon glyph="web-page-home" />
                          </span>
                          { address }
                        </h2>
                        {
                          DSSDataHome ? (
                            <div className="app-DSSResult animated fadeIn" dangerouslySetInnerHTML={{__html: DSSDataHome}} />
                          ) : (
                            <div className="app-DSSResult animated fadeIn">
                              <p>Alueella ei tarvita erityistoimenpiteitä.</p>
                            </div>
                          )
                        }
                      </section>
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

    setTimeout(this.props.getEpidemicLocationDataForHomeLocation, 500)
  }

  componentWillUnmount() {
    if (this.pollInterval) {
      clearInterval()
    }
  }
}