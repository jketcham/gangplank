import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';


class ActivateAccount extends Component {
  static propTypes = {
    activateAccount: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.activateAccount();
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


export default ActivateAccount;
