import React, { Component } from 'react';
import { withRouter,NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { getCompaniesList } from '../actions';
import LoggedInUser from './LoggedInUser';

 class Header extends Component {

  componentDidMount() {
    this.props.dispatch(getCompaniesList())
  }
  

  render() {
    const {user} = this.props;
    console.log("in render",user)
    return (
      <div className="header ">
        <div className="header-main">
          <div>
            <NavLink to="/" className="nav">
			  	    <img className="logo" src="/media/icon.png" alt="SRM" />
			      </NavLink > 
            
          </div>

          {
            localStorage.jwt ? 
           <>
            <div className="header-list">
              <ul>
                <li className="list-items">
                  <NavLink  to="/report" activeClassName = 'active'>Reports</NavLink>
                </li>
                <li className="list-items">
                <NavLink  to="/reports-status" activeClassName = 'active'>Status</NavLink>
                </li>
                {
                  user && user.isAdmin==true ? 
                  <div className="routesForAdmin">
                    <li className="list-items">
                      <NavLink  to="/create-projects" activeClassName = 'active'>Projects</NavLink>
                    </li>
                    <li className="list-items">
                      <NavLink  to="/assign-tasks" activeClassName = 'active'>Assign Task</NavLink>
                    </li>
                  </div>
                  :""
                }
              </ul>
            </div>
            <div className="isUserExist">
              <LoggedInUser />
            </div>
          </> : 
            <div className="control-btns">
            <NavLink  to="/login"    className="btn" type="submit">Login</NavLink >
            <NavLink  to="/register" className="btn" type="submit">Sign-Up</NavLink >
          </div> 
          }
          
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  // console.log(state.userInfo.user,"loggedInUser");
  return { user : state.userInfo.user }
}


export default withRouter(connect(mapStateToProps)(Header));