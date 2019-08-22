import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";

class LoggedInUser extends Component {

	// function for logout
  handleLogout = (e) => {
		window.localStorage.clear();
		this.props.history.push("/login");
  };

	render() {
		const {user} = this.props || null;
		return (
			<Link to="/user-profile">
				<div className="isUserPanel">
	        {
	          user ? 
	            <div className="isUserData">
	              {
	                <div className="avatar">
	                  <span>{user ? user.name.slice(0,1).toUpperCase() : "" }
										</span>
	                </div>
								}
								{ 
								<div className="isLoggedUser"> 
									<p className="isUserName capitalize">{user ? user.name : ""}</p>
									<a className="logout-btn" href="/" onClick={this.handleLogout}> Logout </a>
								</div>
								}
	            </div> 
	          : null
	        }
					
	      </div>
      </Link>
		);
	}
}

function mapStateToProps(state) {
  console.log("isLoggedIn Logged In test",state);
  return {
    user: state.userInfo.user,
  };
}

export default withRouter(connect(mapStateToProps)(LoggedInUser));

