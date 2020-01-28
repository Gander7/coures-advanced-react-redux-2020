export default ({dispatch}) => (next) => (action) => {
    // Check to see if action has a promise in payload
    // if it doesn't have a promise, pass it on
    if (!action.payload || !action.payload.then) {
        return next(action)
    }

    // if it does have a promise, wait for it to resolve
    // create a new action and dispatch it
    action.payload.then(function(response) {
        const newAction = { ...action, payload: response }
        dispatch(newAction)
    })
}