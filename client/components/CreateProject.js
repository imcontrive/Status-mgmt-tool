import React, { Component } from 'react'

export default class CreateReport extends Component {
  state={
   name:"",
   description:"",
   company:"",
   assignedUser:""
  }

  handleChange= (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]:value
    })
  }
  render() {
    return (
      <div>
        <label for = "name">Date</label>
        <input type="date" name="name" value={this.state.name} onChange={this.handleChange}/> 

        <label for = "description">Description</label>
        <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/>

        <label for = "company">Company</label>
        <input type="text" name="company" value={this.state.company} onChange={this.handleChange}/>

        <label for = "assignedUser">Assigned User</label>
        <input type="text" name="assignedUser" value={this.state.assignedUser} onChange={this.handleChange}/>
      </div>
    )
  }
}
