import { useState, useEffect, useCallback, createContext } from 'react'

let logoutTimer

const AuthContext = createContext({
	token: '',
	login: () => {},
	logout: () => {},
	userId: null,
})

const calculateRemainingTime = exp => {
	const currentTime = new Date().getTime()
	const expTime = exp
	const remainingTime = expTime - currentTime
	return remainingTime
}

const getLocalData = () => {
	const storedToken = localStorage.getItem('token')
	const storedExp = localStorage.getItem('exp')
	const storedUserId = localStorage.getItem('userId')

	const remainingTime = calculateRemainingTime(storedExp)

	if (remainingTime <= 1000 * 60 * 30) {
		localStorage.removeItem('token')
		localStorage.removeItem('exp')
		return null
	}

	return {
		token: storedToken,
		duration: remainingTime,
		userId: storedUserId
	}
}

export const AuthContextProvider = props => {
	const localData = getLocalData()
	

	let initialToken
	if (localData) {
		initialToken = localData.token
	}
	

	const [token, setToken] = useState(initialToken)
	const [userId, setUserId] = useState(null)
	
	useEffect(() => {
		if (localData) setUserId(localData.userId)
	}, [localData, setUserId])
	
	const logout = () => {
    setToken(null)
    setUserId(null)

    localStorage.removeItem('exp')
    localStorage.removeItem('token')
	localStorage.removeItem('userId')

    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }
  }

	const login = (token, expirationTime, userId) => {
    setToken(token)
    setUserId(userId)

    localStorage.setItem('exp', expirationTime)
    localStorage.setItem('token', token)
	localStorage.setItem('userId', userId)

    const remainingTime = calculateRemainingTime(expirationTime)

    logoutTimer = setTimeout(logout, remainingTime)
  
	}

  const contextValue = {
    token,
    login,
    logout,
    userId,
  }

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthContext
