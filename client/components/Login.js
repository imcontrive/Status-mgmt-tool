import React, { Component } from 'react';
import {connect} from 'react-redux';


class Login extends Component {
  state = {
    company:"",
    email:"",
    password:""
  }


  // handleChange
  handleChange = e => {
    const { name, value } = e.target;
    console.log("Login...",name,"Vs",value);
    this.setState({
      [name]: value
    });
  };

  // HandleLogin

  handleLogin = () => {
    // e.preventDefault();
    const {company,email,password}= this.state;
    const data = {company,email,password};
    console.log("checkpoint in login",data);

    fetch("http://localhost:3000/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then( data => {
        console.log("in Loginhandler",data);
        if(data.success){
          localStorage.setItem("jwt", data.token);
          this.props.dispatch({ type: "REGISTER_USER", payload:data });
          this.setState({ user: {} });
          this.props.history.push('/');
        }
      })

  }


  render() {
    const { companies } = this.props;

    return (
      <div className="isWrapper isLoginWrapper">
        <form className="isForm">
          <h2 className="formHeading">Log In</h2>
          <label htmlFor="company">Organisation
            <select className="select" name="company" onChange={this.handleChange}>
              <option disabled selected>Choose your Organisation</option>
              {
                companies ? companies.map(company =>  <option key={company._id} value={company._id}>{company.name}</option>): ''
              }
            </select>
          </label>
          <label htmlFor="email">Email
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
          </label>
          <label htmlFor="password">Password
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
          </label>
        </form>
        <div className="submit-signup">
          <button className="btn" type="submit" onClick={this.handleLogin} >Log In</button>
          <a href="#">Don't have an account?<small>Sign Up</small></a>
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  console.log("test case",state)
  return {
    companies: state.companies.companies || []
  }
}

export default connect(mapStateToProps)(Login);