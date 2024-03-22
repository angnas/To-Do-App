import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Modal from "./components/Modal";
import ProgressBar from "./components/ProgressBar";
import TickIcon from "./components/TickIcon";


function App() {
  const userEmail = 'angela@test.com'
  const [tasks, setTasks] = useState(null)

const authToken = false

  const getData = async () => {

    try{
       const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
       const json = await response.json()
       
       setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (authToken) {
      getData()
    }

  }
  , [])
  console.log(tasks)

  //sort by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && 
      <>
      <ListHeader listName={'🏝 holiday tick list'} getData={getData}/>
      {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
      </>}
    </div>
  );
}

export default App;
