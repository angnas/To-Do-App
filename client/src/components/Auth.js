import { useState } from "react"
import { useCookies } from "react-cookie"


function Auth() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [isLogIn, setIsLogin] = useState(true)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  
  const [error, setError] = useState(null)

console.log(cookies)

const viewLogin = (status) => {
  setError(null)
  setIsLogin(status)
}

const handleSubmit =async (e, endpoint) => {
  e.preventDefault()
  if (!isLogIn && password !== confirmPassword) {
    setError('Make sure passwords match!')
    return
  }

  const endpoint = isLogIn ? "login" : "signup";
    const formData = {
      email,
      password,
    }; 

    try {

    
const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
  method: 'POST',
  headers: {'Content-Type' : 'application/json'},
  body: JSON.stringify({email, password})
    })
    const data = await response.json()

    if (data.detail) {
      setError(data.detail)
    } else {
      setCookie('Email', data.email)
      setCookie('AuthToken', data.token)
      window.location.relocate();
    }
} catch (error) {
  setError(error.message || 'An error occurred')

}
}


  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogIn ? 'Log In' : 'Sign Up'}</h2>
          <input type="email" 
          placeholder="email" 
          onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" 
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}/>
          {!isLogIn && <input 
          type="password" 
          placeholder="confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}/>}
<input type="submit" className="create" onClick={(e) => handleSubmit(e, isLogIn ? 'Login' : 'Sign Up')}/>
{error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button onClick={() => viewLogin(false)}>Sign Up</button>
          <button onClick={() => viewLogin(true)}>Login</button>

        </div>

      </div>

    </div>
  )
}

export default Auth