import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import { activate } from '../store/account/actions';


class ActivateAccountPage extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,

    activate: PropTypes.func.isRequired,
  };

  state = {
    response: null,
  };

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    this.props.activate({ id: params.get('id') });
  }

  renderContent() {
    return null;
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              Verify your email
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = {
  activate,
};

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(ActivateAccountPage);
