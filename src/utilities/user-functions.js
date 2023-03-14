
import axios from 'axios';



export const getUserFromSession = async () => {
    let response = await axios('/session-info')
    console.log(response);
    // WE HAVE THE LOGGED IN USER! :)
    if (response.data.session.passport) {
        let user = response.data.session.passport.user;
        console.log(user)
        return user;
    } else {
        return false
    }
}

export const signUp = async (formData) => {

    let serverResponse = await axios({
        method: "POST",
        url: "/users/signup", // route to do signup
        data: formData
    });

    return serverResponse;
}

export const logIn = async (formData) => {

    let serverResponse = await axios({
        method: "PUT",
        url: "/users/login",
        data: formData
    });
    console.log(serverResponse);

    return serverResponse;
}

export const getTask = async (user) => {
    let response = await axios('/get_task/' + user._id)
    let task = response.data;
    return task
}

export const getCompletedTask = async () => {
    let response = await axios('/get_completed_task')
    let completedTask = response.data;
    return completedTask
}

