import { useState } from "react"
import { useCookies } from "react-cookie"


function Auth() {
  const [cookies, setCookie] = useCookies(['Email', 'AuthToken',])
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [error, setError] = useState(false)


const viewLogin = (status) => {
  setError(null)
  setIsLogin(status)
}

const handleSubmit =async (e, endpoint) => {
  e.preventDefault()
  if (!email.trim() || !password.trim()) {
    setError('Please fill in all fields.');
    return;
  }
  if (!isLogin && password !== confirmPassword) {
    setError('Make sure passwords match!')
    return;
  }


try {
    
const response = await fetch(`${process.env.REACT_APP_SERVERURL}/users/${endpoint}`, {
  method: 'POST',
  headers: {'Content-Type' : 'application/json'},
  body: JSON.stringify({email, password})
    })

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json()

    if (data.detail) {
      setError(data.detail)
    } else {
      setCookie('Email', data.email)
      setCookie('AuthToken', data.token)
      window.location.reload();
    }
} catch (error) {
  console.error('Error:', error);
  setError('An error occurred. Please try again later.');
}
};


  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogin ? 'login' : 'signup'}</h2>

          <input type="email" 
          id="email"
          name="email"
          placeholder="email" 
          onChange={(e) => setEmail(e.target.value)}/>

          <input type="password" 
          id="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}/>

          {!isLogin && <input 
          type="text"
          id="password-check"
          name="password-check" 
          placeholder="confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}/>}

          <input type="submit" className="create" onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')}/>

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