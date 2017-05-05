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

  render() {
    const {
      toggleNavigation,
      isNavigationOpen,
      epidemicLocationData
    } = this.props

    return (
      <div className="app-AppContainer">
        <Slideout menuComponent={Navigation} onTranslateEnd={toggleNavigation} isOpen={isNavigationOpen}>
          <main className="app-MainContent">
            <HeaderContainer />

            <section className="app-PageContent">

              <Map data={epidemicLocationData} />

            </section>
          </main>
        </Slideout>
      </div>
    )
  }

  componentDidMount() {
    this.props.getEpidemicLocationData()
  }
}