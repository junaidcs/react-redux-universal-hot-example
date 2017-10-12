import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div className={styles.masthead}>
          <div className="container">
            <h1>{config.app.title}</h1>

            <h2>{config.app.description}</h2>

            <p>

            </p>

          </div>
        </div>

        <div className="container">

        some testing


        </div>
      </div>
    );
  }
}
