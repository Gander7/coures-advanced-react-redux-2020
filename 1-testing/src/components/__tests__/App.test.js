import React from 'react'
import { shallow } from 'enzyme'
import ReactDOM from 'react-dom'

import App from '../App'
import CommentBox from '../CommentBox'
import CommentList from '../CommentList'

it('shows a comment box', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(CommentBox).length).toEqual(1)
})