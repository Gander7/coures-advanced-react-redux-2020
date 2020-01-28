import React from 'react'
import { connect } from 'react-redux'
import { Route, Link, Switch } from 'react-router-dom'
import * as actions from '../actions'
import CommentBox from './CommentBox'
import CommentList from './CommentList'

class App extends React.Component {

    renderButton() {
        if (this.props.auth) {
            return <button onClick={() => this.props.changeAuth(false)}>Sign Out</button>
        } else {
            return <button onClick={() => this.props.changeAuth(true)}>Sign In</button>
        }
    }

    renderHeader() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/post">Post a Comment</Link>
                    </li>
                    <li>
                        {this.renderButton()}
                    </li>
                </ul>
            </div>
        )
    }
    render() {
        return (
            <div>
                {this.renderHeader()}
                <Switch>
                    <Route path="/post" component={CommentBox} />
                    <Route path="/" exact component={CommentList} />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, actions)(App)