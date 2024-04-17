import { useEffect, useState } from "react";
import Auth from "./Auth";
import ListHeader from "./ListHeader";
import ListItem from "./ListItem";
import { useCookies } from "react-cookie"
import { jwtDecode } from "jwt-decode";



function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const [tasks, setTasks] = useState(null)

  const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };


  const getData = async () => {

    try{
       const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`,
       {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          authorization: authToken,
        },
       })
       const json = await response.json()
       
       setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (authToken) {
        if (isTokenExpired(authToken)) {
            removeCookie('Email')
            removeCookie('AuthToken')
            window.location.reload();
          }
      getData()
    }
  }
  , [])


  //sort by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && 
      <>
      <ListHeader listName={'🏝 holiday tick list'} getData={getData}/>
      <p className="user-email">Welcome back {userEmail}</p>
      {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
      </>}
    </div>
  );
}

export default Home;
