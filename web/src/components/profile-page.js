import React, { Component } from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { getPerson } from '../store/users/selectors';
import { fetchUser } from '../store/users/actions';


class ProfilePage extends Component {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
    profile: ImmutablePropTypes.map.isRequired,
    match: PropTypes.object.isRequired,
  };

  static defaultProps = {
    profile: new Immutable.Map(),
  };

  componentDidMount() {
    this.props.fetchUser({ id: this.props.match.params.userId });
  }

  render() {
    return (
      <div>
        profile page
        <h3>{this.props.profile.get('name')}</h3>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  profile: getPerson(state, props),
});

const mapDispatchToProps = {
  fetchUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(ProfilePage);
