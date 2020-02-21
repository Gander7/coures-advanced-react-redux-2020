import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const useAuth = () => {
    const { authenticated } = useSelector(state => state.auth)
    const history = useHistory()

    const shouldNavigateAway = () => {
        if (!authenticated)
            history.push('/')
    }

    useEffect(() => {
        shouldNavigateAway()
    }, [authenticated])
}

export default useAuth