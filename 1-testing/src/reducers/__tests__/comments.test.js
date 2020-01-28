import commentsReducer from '../comments'
import { SAVE_COMMENT } from '../../actions/types'
import comments from '../comments'

it('handles actions of type save_comment', () => {
    const action = {
        type: SAVE_COMMENT,
        payload: 'Test Comment'
    }
    const newState = commentsReducer([],action)

    expect(newState).toEqual(['Test Comment'])
})

it('handles unknown type', () => {
    const newState = commentsReducer([], { action: 'GARBAGE' })
    expect(newState).toEqual([])
})