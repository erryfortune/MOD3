import React, { useContext, useEffect, useState } from 'react'
import "./index.css"
import axios from 'axios'
import { AppContext } from '../../context'
import { getCompletedTask, getTask } from '../../utilities/user-functions'

const Home = () => {
    const { user, task, setTask, completedTask, setCompletedTask } = useContext(AppContext)
    const [newInput, setNewInput] = useState(undefined)

    useEffect(() => {

    }, [task, completedTask])

    const addTask = async (e) => {
        e.preventDefault()
        let userInput = document.getElementById('user-input').value


        console.log(userInput);
        let response = await axios("/add_task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: { userInput, userId: user._id }

        })
        let taskData = await getTask(user)
        setTask(taskData)


    }
    const handleChange = (e) => {
        // e.target.value
    }

    const edit = (e) => {
        // let { className, textContent } = e.target
        // console.log(className);
        if (e.target.textContent === 'Done') {
            e.target.textContent = "Edit"
        }
        else {
            e.target.textContent = 'Done'
        }
        // e.target.textContent = textContent
        // console.log(textContent);
        let taskInput = Array.from(document.getElementsByClassName('task-title'));
        console.log(taskInput);
        taskInput.forEach((item, idx) => {
            // console.log(idx, className);
            if (idx === +e.target.className && e.target.textContent === 'Done') {
                console.log('idx');
                if (item.disabled) {
                    item.removeAttribute('disabled')
                }

            }
        })

    }
    const deleteTask = async (e) => {
        let response = await axios(`/delete_task/${e.target.id}`, {
            method: "DELETE"

        })
        let responseData = await getTask(user)
        let task = responseData;
        setTask(task)



    }
    // useEffect(() => {
    //     const getTask = async () => {
    //         let response = await axios('/get_task')
    //         let task = response.data;
    //         setTask(task)

    //     }
    //     getTask()

    // }, [task])

    let taskJSX = []
    if (task !== undefined) {
        let taskList = [...task]
        taskJSX = taskList.map((task, idx) => {
            return (
                <div key={idx} className='task-container'>
                    <input type='text' className='task-title' value={task.title} disabled onChange={(e) => handleChange(e)} />
                    <div className='button-container'>
                        {/* <button type='button' className={idx} onClick={(e) => edit(e)}>Edit</button> */}
                        <button type='button' id={task._id} onClick={(e) => deleteTask(e)}>Delete</button>


                    </div>
                </div >
            )
        })
    }

    // let completedTaskList = [...completedTask]





    // let completedJSK = completedTaskList.map((task, idx) => {
    //     return (
    //         <div key={idx} className='task-container'>
    //             <p>{task.title}</p>
    //             <div className='button-container'>
    //                 <button type='button'>Delete</button>

    //             </div>
    //         </div >
    //     )
    // })




    return (
        <div id='home'>
            <h1>To-Do List</h1>

            <form id='form' onSubmit={(e) => addTask(e)}>
                <input id="user-input" type="text" />
                <button id="add" type='submit' >Add</button>
            </form>
            <div id="task">

                <div id="active">
                    <h3>To-Do Task</h3>
                    {taskJSX}
                </div>

                {/* <div id="completed">
                    <h3>Completed Task</h3>

                </div> */}

            </div>
        </div>
    )
}

export default Home