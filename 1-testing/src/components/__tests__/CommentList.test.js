import React from 'react'
import { mount } from 'enzyme'

import CommentList from '../CommentList'
import Root from '../../Root'

let wrapped

beforeEach(() => {
    const initialState = {
        comments: ['Comment 1', 'Comment 2']
    }
    wrapped = mount(
        <Root initialState={initialState}>
            <CommentList />
        </Root>
    )
})

it('creates one list item per comment', () => {
    expect(wrapped.find('li').length).toEqual(2)
})

it('shows each comment text', () => {
    expect(wrapped.render().text()).toContain('Comment 1')
    expect(wrapped.render().text()).toContain('Comment 2')
})