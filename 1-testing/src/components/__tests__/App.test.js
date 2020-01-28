import React from 'react'
import { shallow } from 'enzyme'
import ReactDOM from 'react-dom'

import App from '../App'
import CommentBox from '../CommentBox'
import CommentList from '../CommentList'

let wrapper

beforeEach(() => {
    wrapper = shallow(<App />)
})

it('shows a comment box', () => {
    expect(wrapper.find(CommentBox).length).toEqual(1)
})

it('shows a comment list', () => {
    expect(wrapper.find(CommentList).length).toEqual(1)
})