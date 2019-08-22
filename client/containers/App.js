import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from 'react-router-dom';
import '../scss/index.scss';
import setAuthToken from '../../utils/setAuthToken';
import HomePage from '../components/HomePage';
import SignUp from '../components/SignUp';
import Header from '../components/Header';
import Login from '../components/Login';
import GenerateReport from '../components/GenerateReport';
import CreateProject from '../components/CreateProject';

const axios = require('axios');

class App extends Component {
  state = { 
    token: ""
  }

  componentDidMount() {
    const { jwt } = localStorage;
    if(jwt){
      setAuthToken(jwt)
      axios.get('http://localhost:3000/api/v1/users/me')
      .then(res => {
        if(res.data.success){
          this.props.dispatch({ type: "REGISTER_USER", payload: res.data });
        }
      })
      .catch(function (error) {
        console.error(error, "catch error");
      });
    }
  }

  render() {
    return (
      <>
      <Header />
      <hr />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route  path="/register" component={SignUp} />
        <Route  path="/login" component={Login} />
        <Route  path="/report" component={GenerateReport} />
        {/* <Route  path="/createReport" component={CreateReport} /> */}
        <Route  path="/create-projects" component={CreateProject} />

      </Switch>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("test cases","In APP>JS", state)
  return {
    currentUser: state
  }
}

export default connect(mapStateToProps)(App);





  