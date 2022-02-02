import { Component } from 'react'
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component  {
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    }

    // The object passed to setState is merged with the current state object
    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value,
            error: ''
        })
    }


    handleSubmit = async evt => {
        evt.preventDefault()
        try {
          // We don't want to send the 'error' or 'confirm' property,
          //  so let's make a copy of the state object, then delete them
          
          // Using spread operator and delete keyword
          // const formData = { ...this.state }
          // delete formData.error
          // delete formData.confirm

          // Object literal
          // const formData = {
          //   name: this.state.name,
          //   email: this.state.email,
          //   password: this.state.password
          // }

          // Deconstructing state
          const {name, email, password} = this.state;
          const formData = {name, email, password};
          
          // The promise returned by the signUp service method 
          // will resolve to the user object included in the
          // payload of the JSON Web Token (JWT)
          const user = await signUp(formData);
          // Baby step!
          this.props.setUser(user)

        } catch(err) {
          // An error occurred 
          console.log(err)
          this.setState({ error: 'Sign Up Failed - Try Again' });
        }
    }

    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
          <div>
            <div className="form-container">
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
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
        );
    }
}