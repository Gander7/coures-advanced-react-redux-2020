import React from 'react'
import { mount } from 'enzyme'
import Root from '../../Root'
import CommentBox from '../CommentBox'

let wrapped

beforeEach(() => {
    wrapped = mount(<Root><CommentBox /></Root>)
})

afterEach(() => {
    wrapped.unmount()
})

it('has a text area, a submit button, and a fetch button', () => {
    expect(wrapped.find('textarea').length).toEqual(1)
    expect(wrapped.find('button').length).toEqual(2)
})

describe('Text Area', () => {
    beforeEach(() => {
        wrapped.find('textarea').simulate('change', {
            target: { value: 'test comment' }
        })
        wrapped.update()
    })

    it('should allow text to be edited', () => {
        expect(wrapped.find('textarea').prop('value')).toEqual('test comment')
    })

    it('should empty textarea when button is clicked', () => {
        wrapped.find('form').simulate('submit')
        wrapped.update()
        expect(wrapped.find('textarea').prop('value')).toEqual('')
    })
})
