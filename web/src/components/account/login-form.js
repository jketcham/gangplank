import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';


class LoginForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    formValues: new Map(),
  };

  getFieldValue(field, property) {
    return this.state.formValues.getIn([field, property], '');
  }

  handleChange = field => (event) => {
    const value = event.target.value;
    this.setState(({ formValues }) => ({
      formValues: formValues.updateIn(
        [field, 'value'],
        '',
        fv => value,
      ),
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = this.state.formValues.reduce((result, value, key) => {
      result[key] = value.get('value');
      return result;
    }, {});
    this.props.onSubmit(data);
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label for="email" sm={2}>Email</Label>
            <Col sm={10}>
              <Input
                type="text"
                id="email"
                value={this.getFieldValue('email', 'value')}
                onChange={this.handleChange('email')}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={2}>Password</Label>
            <Col sm={10}>
              <Input
                type="password"
                id="password"
                value={this.getFieldValue('password', 'value')}
                onChange={this.handleChange('password')}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button color="primary">Login</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}


export default LoginForm;
