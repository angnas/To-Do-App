import { useState } from "react"
import { useCookies } from "react-cookie"



function Modal({mode, setShowModal, getData, task}) {
  const [cookies, setCookie, removeCookie] = useCookies(null)


  // const mode = "create"
  const editMode = mode === 'edit' ? true : false

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date()
  })

  const authToken = cookies.AuthToken;

// posting a data
const postData = async (e) => {
  e.preventDefault()
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks`, {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json',
        authorization: authToken,
      },
      body: JSON.stringify(data)
    })
    if (response.status === 201) {
      console.log('data posted successfully')
      setShowModal(false)
      getData()
    }
    
  } catch(err) {
    console.error(err)
  }
}

//editing a data

const editData = async (e) => {
  e.preventDefault()
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks/${task.id}`, {
      method: "PUT",
      headers: {'Content-Type' : 'application/json',
      authorization: authToken,
    },
      body: JSON.stringify(data)
    })
    if (response.status === 200) {
      console.log("data edited successfully")
      setShowModal(false)
      getData()
    }
    
  } catch(err) {
    console.error(err)
  }
}



  const handleChange= (e) => {
    console.log('changing', e)

    const {name, value}= e.target

    setData(data => ({
      ...data, 
      [name] : value
    }))

  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
<h3>Let's {mode} your task</h3>
<button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form>
          <input 
          type="text"
          required
          maxLength={30}
          placeholder=" Your task goes here"
          name="title"
          value={data.title}
          onChange={handleChange}
          />
          <br />
          <label for="range">Drag to select your current progress</label>
          <input 
          required
          type="range"
          id="range"
          min="0"
          max="100"
          name="progress"
          value={data.progress}
          onChange={handleChange}
          />

          <input
          className={mode}
          type="submit"
          onClick={editMode ? editData : postData }
          />

        </form>

      </div>

    </div>
  )
}

export default Modal