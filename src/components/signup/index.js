import React, { Component } from 'react'
import { signUp } from '../../utilities/user-functions.js'

export default class Signup extends Component {
    state = {
        email: '',
        password: '',
        confirm: '',
        error: '',
    };
    handleChange = (event) => {
        let propertyName = event.target.name;
        this.setState({
            [propertyName]: event.target.value,
            error: ''
        });
    };
    handleSubmit = async (event) => {
        event.preventDefault(); // do not refresh the page
        console.log("submitting!");
        // check if password has special character (error handling)
        let data = { ...this.state };
        delete data.confirm;
        delete data.error;

        let response = await signUp(data);
        console.log(response);

        // make async call to server with the data
        // in a different file - we will bring in that function here
    }


    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
            <div>
                <div className="form-container">
                    <h1>Sign Up</h1>
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <label>Email</label>
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                        <label>Confirm</label>
                        <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                        <button type="submit" disabled={disable}>SIGN UP</button>
                    </form>
                </div>
                <p className="error-message">&nbsp;{this.state.error}</p>
            </div>
        )
    }
};
