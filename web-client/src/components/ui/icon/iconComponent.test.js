import React from 'react'
import Icon from './iconComponent'
import {shallow} from 'enzyme'

describe('<Icon />', () => {
  it('should render an svg-element', () => {
    const component = shallow(<Icon glyph="test" />)
    expect(component.find('svg').length).toBe(1)
  })

  it('should pass className to svg-element', () => {
    const testClass = 'test-class'
    const component = shallow(<Icon glyph="test" className={testClass} />)
    expect(component.find('svg').hasClass(testClass)).toBe(true)
  })
})
