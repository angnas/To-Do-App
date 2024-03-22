import { useState } from "react"


function Auth() {
  const [isLogIn, setIsLogin] = useState(true)
  
  const [error, setError] = useState(null)

const viewLogin = (status) => {
  setError(null)
  setIsLogin(status)
}

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogIn ? 'Log In' : 'Sign Up'}</h2>
          <input type="email" placeholder="email"/>
          <input type="password" placeholder="password"/>
          {!isLogIn && <input type="password" placeholder="confirm password"/>}
<input type="submit" className="create"/>
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