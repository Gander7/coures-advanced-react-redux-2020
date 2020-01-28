import React from 'react'

class CommentBox extends React.Component {
    state = { comment: '' }

    handleChange = (e) => {
        this.setState({ comment: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // TODO: save comment via action creator
        this.setState({ comment: '' })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h4>Add a comment</h4>
                <textarea 
                    value={this.state.comment} 
                    onChange={this.handleChange}
                />
                <button>
                    Submit Comment
                </button>
            </form>
        )
    }
}

export default CommentBox