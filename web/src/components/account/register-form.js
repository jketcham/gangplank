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


class RegisterForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    formValues: new Map(),
  };

  getFieldValue(value, field) {
    return this.state.formValues.getIn([field, value]);
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
            <Label for="name" sm={3}>Name</Label>
            <Col sm={9}>
              <Input
                type="text"
                id="name"
                value={this.getFieldValue('name')}
                onChange={this.handleChange('name')}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="email" sm={3}>Email</Label>
            <Col sm={9}>
              <Input
                type="email"
                id="email"
                value={this.getFieldValue('email')}
                onChange={this.handleChange('email')}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={3}>Password</Label>
            <Col sm={9}>
              <Input
                type="password"
                id="password"
                value={this.getFieldValue('password')}
                onChange={this.handleChange('password')}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="confirmPassword" sm={3}>Confirm password</Label>
            <Col sm={9}>
              <Input
                type="password"
                id="confirmPassword"
                value={this.getFieldValue('confirmPassword')}
                onChange={this.handleChange('confirmPassword')}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="newsletter" sm={3}>Subscribe to newsletter</Label>
            <Col sm={{ size: 10 }}>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    id="newsletter"
                    value={this.getFieldValue('newsletter')}
                    onChange={this.handleChange('newsletter')}
                  />{' '}
                  Yes
                </Label>
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button color="primary">Register</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}


export default RegisterForm;
