import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import config from 'config';
import { asyncConnect } from 'redux-connect';

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState } }) => {
      const promises = [];

      if (!isAuthLoaded(getState())) {
        promises.push(dispatch(loadAuth()));
      }
      return Promise.all(promises);
    }
  }
])
@connect(
  state => ({
    user: state.auth.user
  }),
  { logout, pushState: push }
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    router: PropTypes.shape({
      location: PropTypes.object
    }).isRequired,
    user: PropTypes.shape({
      email: PropTypes.string
    }),
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static defaultProps = {
    user: null
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      const redirect = this.props.router.location.query && this.props.router.location.query.redirect;
      this.props.pushState(redirect || '/p/m.junaidcs');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const { user, children } = this.props;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />

        <header className={ `header-block navbar navbar-default`}>
          <a
            to="/"
            className='brand-logo'
          >
            <img src="/images/full-black-green.png" className='web' width='108' />
            <img src="/images/a-black-green.png" className='mob' width='21'/>
          </a>
          <div className='pull-right right-nav'>


            {user &&
            <ul className='links'>
              <li>
                <a to='#'>
                  <span>Notifications</span>
                  <img
                    src='/images/notification-icon@2x.png'
                    width='18'
                  />
                  <i className='badge orange'>5</i>
                </a>
              </li>
              <li>
                <a to='#'>
                  <span>Messages</span>
                  <img
                    src='/images/message-icon@2x.png'
                    width='18'
                  />
                  <i className='badge green'>5</i>
                </a>
              </li>
            </ul>
            }
            {user &&
            <div className='search'>
              <input
                type='text'
                className='form-control'
                placeholder='Search'
              />
              <button className='btn btn-success'>
                <img
                  src='/images/search-right-icon@2x.png'
                  width='10'
                />
              </button>
            </div>
            }
            {user &&
            <div className='profile-nav '>
              <div className='dropdown-toggle' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Wellcome,
                <span> {`${user.firstName} ${user.lastName}`}</span>
                <i className='icon'>
                  {`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}
                </i>
              </div>
              <ul className="dropdown-menu">
                  <li>
                    <a to="/logout" className='signup-link'>
                    <img src='/images/profile-icon@2x.png'/>
                    {'Logout'}
                  </a>
                  </li>
                </ul>
            </div>
            }

            <ul className='links'>
              {!user &&
              <li>
                <a to="/register" className='signup-link'>
                  <img src='/images/profile-icon@2x.png'/>
                  {'Sign Up'}
                </a>
              </li>
              }

              {!user &&
              <li>
                <a to="/login" className='signup-link'>
                  <img src='/images/profile-icon@2x.png'/>
                  {'Login'}
                </a>
              </li>
              }
            </ul>
          </div>

        </header>



        <div className={styles.appContent}>
          {children}
        </div>


      </div>
    );
  }
}
