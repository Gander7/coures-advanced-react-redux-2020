import React from 'react'
import ReactDOM from 'react-dom'

import App from '../App'
import CommentBox from '../CommentBox'
import CommentList from '../CommentList'

it('shows a comment box', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)

    expect(div.innerHTML).toContain('CommentBox')

    ReactDOM.unmountComponentAtNode(div)
})