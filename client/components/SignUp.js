import React, { Component } from 'react';
import {connect} from 'react-redux';

class SignUp extends Component {
  state={
    company: "",
    name: "",
    email:"",
    password:"",
    confirmPassword:""
  }
 
  
  // handleChange
  handleChange = e => {
    const { name, value } = e.target;
    console.log("ishandle........",name,"val",value)
    this.setState({
      [name]: value
    });
  };

  //handleSubmit

  handleSubmit = () => {
    const {company, name, email,password,confirmPassword}= this.state;
    const data = {company, name, email,password,confirmPassword};
    console.log(data,"checkpoint 01");

    fetch("http://localhost:3000/api/v1/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res, "cp in signup");
      this.props.history.push("/Login");
    })
    .catch(error => console.error("Error:", error));
  }

  render() {
    const {company, name, email,password,confirmPassword}= this.state;
    const { companies } = this.props;
    return (
      <div className="isWrapper">
        <form className="isForm">
          <h2 className="formHeading">Sign Up</h2>
          <label htmlFor="company">Organisation
            <select className="select" name="company" onChange={this.handleChange}>
              <option  disabled selected>Choose your Organisation</option>
              {
                companies ? companies.map(company =>  <option key={company._id} value={company._id}>{company.name}</option>): ''
              }
            </select>
          </label>
          
          <label htmlFor="name">Name
            <input type="text" name="name"  value={this.state.name} onChange={this.handleChange}/>
          </label>
          <label htmlFor="email">Email
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
          </label>
          <label htmlFor="password">Password
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
          </label>
          <label htmlFor="confirmPassword">Confirm Password
            <input type="password" name="confirmPassword"  value={this.state.confirmPassword} onChange={this.handleChange}/>
          </label>
        </form>
        <p>
          {
            password && confirmPassword && password != confirmPassword ? <p className="danger">Password don't match</p> :""
          }
        </p>
        <div className="submit-signup"> 
        {
            company && name && email && password && confirmPassword ?
          <button className="btn" type="submit" onClick={this.handleSubmit} >Sign Up</button>
          :""
        }
          <a href="#">Already have an account?<small>Log In</small></a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    companies: state.companies.companies || []
  }
}

export default connect(mapStateToProps)(SignUp);