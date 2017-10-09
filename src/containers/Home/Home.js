import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import config from 'config';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

@connect(state => ({
  online: state.online
}))
export default class Home extends Component {
  static propTypes = {
    online: PropTypes.bool.isRequired
  };

  render() {
    const { online } = this.props;
    console.log('online: ', online);
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage} alt="presentation" />
              </p>
            </div>
            <h1>{config.app.title}</h1>

            <h2>{config.app.description}</h2>

            <p>
              <a
                className={styles.github}
                href="https://github.com/erikras/react-redux-universal-hot-example"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-github" /> View on Github
              </a>
            </p>

          </div>
        </div>

        <div className="container">

          <p>This starter boilerplate app uses the following technologies:</p>

          <h3>Features demonstrated in this project</h3>

          <p>Thanks for taking the time to check this out.</p>

          <p>– Erik Rasmussen</p>
        </div>
      </div>
    );
  }
}
