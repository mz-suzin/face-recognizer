import React from "react";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            regEmail: '',
            regPassword: '',
            regName: ''
        }
    }

    onNameChange = (event) => {
        this.setState({regName: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({regEmail: event.target.value})
    }
    
    onPasswordChange = (event) => {
        this.setState({regPassword: event.target.value})
    }

    onSubmitRegister = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.regEmail,
                password: this.state.regPassword,
                name: this.state.regName
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                console.log(user);
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-light-blue hover-black w-100" 
                                type="text" 
                                name="name"  
                                id="name"
                                onChange={this.onNameChange}/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-light-blue hover-black w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={this.onEmailChange}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-light-blue hover-black w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={this.onPasswordChange}/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register"
                            onClick={this.onSubmitRegister}/>
                            {/* defining the function using arrow notation so that the onRouteChange is not called when the component is mounted */}
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;