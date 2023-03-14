// import logo from './logo.svg';
import './App.css';
import Home from './pages/home page';
import Auth from './pages/auth';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUserFromSession } from './utilities/user-functions';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from './context';
import axios from 'axios';

function App() {
  const [callWasMade, setCallWasMade] = useState(false);

  let { user, setUser, setTask, setCompletedTask } = useContext(AppContext);

  // this will only run when we first open our app, or refresh the page

  // get user
  useEffect(() => {
    const getSession = async () => {

      let userResponse = await getUserFromSession();
      console.log(userResponse)
      setUser(userResponse)
      setCallWasMade(true)
    }
    getSession();

  }, []);


  // get items and set in context
  useEffect(() => {
    console.log(user)
    const getTask = async (user) => {
      if (user) {
        let response = await axios('/get_task/' + user._id)
        let task = response.data;
        setTask(task)
      }

    }
    getTask(user)
  }, [user])

  // useEffect(() => {
  //   const completedTask = async () => {
  //     let response = await axios('/get_completed_task')
  //     let completedTask = response.data;
  //     setCompletedTask(completedTask)
  //   }
  //   completedTask()
  // }, [])


  // get cart




  return (
    <div className="App">
      {/* {callWasMade}

      } */}
      <>
        {user ?
          <div className="page-wrapper">
            <Routes>
              <Route path="/home" element={<Home />} />

              <Route path="/*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
          :
          <Auth />
        }
      </>
    </div>
  );
}

export default App;
