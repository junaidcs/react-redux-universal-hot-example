import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import LoginForm from 'components/LoginForm/LoginForm';
import * as authActions from 'redux/modules/auth';


@connect(state => ({ user: state.auth.user }), { ...authActions })
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string
    }),
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: null
  };

  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    if (this.props.authenticated) {
      this.props.pushState('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('LOGIN: componentWillReceiveProps, nextProps', nextProps)
    if (this.props.loading && !nextProps.loading && nextProps.authenticated) {
      if (this.props.location.query.redirect) {
        window.location.href = this.props.location.query.redirect
      } else {
        window.location.href = '/'
      }
    }
  }

  login = async data => {
    const result = await this.props.login(data);
    return result;
  };

  render() {
    const { user, logout } = this.props;
    return (
      <div className="container">
        <Helmet title="Login" />
        <h1>Login</h1>
        {!user && (
          <div>
            <LoginForm onSubmit={this.login} />
          </div>
        )}
        {user && (
          <div>
            <p>You are currently logged in as {user.email}.</p>

            <div>
              <button className="btn btn-danger" onClick={logout}>
                <i className="fa fa-sign-out" /> Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
