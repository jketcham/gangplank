import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import { Map, List } from 'immutable';
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';


class ControlledForm extends Component {
  static propTypes = {
    actionTitle: PropTypes.string.isRequired,
    errors: ImmutablePropTypes.map.isRequired,
    fields: ImmutablePropTypes.orderedSet.isRequired,
    onSubmit: PropTypes.func.isRequired,

    onChange: PropTypes.func,
    row: PropTypes.bool,
    values: ImmutablePropTypes.map,
  };

  static defaultProps = {
    onChange: _.noop,
    row: false,
    values: null,
  };

  state = {
    formValues: new Map(),
  };

  componentWillMount() {
    if (this.props.values) {
      this.applyPropsValues();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.values !== nextProps.values) {
      this.applyPropsValues(nextProps);
    }
  }

  getFieldValue(field) {
    return this.state.formValues.getIn([field, 'value'], '');
  }

  getFieldError(fieldName) {
    // combine errors returned from API and component levels
    const errors = this.props.errors.getIn(['description', fieldName], new List())
      .merge(this.state.formValues.getIn([fieldName, 'error'], new List()));

    if (errors.isEmpty()) {
      return undefined;
    }
    return errors;
  }

  handleChange = field => (event) => {
    const value = _.get(event, 'target.value', event);
    const formValues = new Map(this.state.formValues).updateIn(
      [field, 'value'],
      '',
      fv => value,
    );

    this.setState({ formValues });

    this.props.onChange(formValues);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.validateFields()) {
      return;
    }
    const data = this.state.formValues.reduce((result, value, key) => {
      result[key] = value.get('value');
      return result;
    }, {});
    this.props.onSubmit(data);
  }

  applyPropsValues(props = this.props) {
    const formValues = props.values.reduce((result, value, key) => (
      result.set(key, new Map({ value }))
    ), new Map());
    this.setState({ formValues });
  }

  validateFields() {
    let isValid = true;

    const formValues = this.props.fields.reduce((result, value) => {
      if (value.get('required')
          && (!this.state.formValues.has(value.get('name'))
            || !this.state.formValues.getIn([value.get('name'), 'value']))) {
        isValid = false;
        return result.setIn([value.get('name'), 'error'], List(['Required value']));
      }
      return result.deleteIn([value.get('name'), 'error']);
    }, Map(this.state.formValues));

    this.setState({ formValues });

    return isValid;
  }

  renderFeedback(errors) {
    if (!errors) {
      return null;
    }
    if (typeof errors === 'string') {
      return <FormFeedback>{errors}</FormFeedback>;
    }
    return errors.map(error => <FormFeedback key={error}><em>{error}</em></FormFeedback>);
  }

  renderInput(field, errors) {
    if (field.get('type') === 'select') {
      return (
        <Input
          type={field.get('type')}
          id={`field-${field.get('name')}`}
          state={errors ? 'danger' : undefined}
          required={field.get('required') || false}
          value={this.getFieldValue(field.get('name'))}
          onChange={this.handleChange(field.get('name'))}
        >
          {field.get('options').map(option => (
            <option value={option} key={option}>{option}</option>
          ))}
        </Input>
      );
    }

    return (
      <Input
        type={field.get('type')}
        id={`field-${field.get('name')}`}
        state={errors ? 'danger' : undefined}
        required={field.get('required') || false}
        value={this.getFieldValue(field.get('name'))}
        onChange={this.handleChange(field.get('name'))}
      />
    );
  }

  renderGroup(field) {
    const errors = this.getFieldError(field.get('name'));

    return (
      <FormGroup
        row={this.props.row}
        color={errors ? 'danger' : undefined}
        key={field.get('name')}
        check={field.get('type') === 'checkbox'}
      >
        <Label for={`field-${field.get('name')}`} sm={3}>{field.get('title')}</Label>
        <Col sm={12}>
          {this.renderInput(field, errors)}
          {this.renderFeedback(errors)}
        </Col>
      </FormGroup>
    );
  }

  renderGroups() {
    return this.props.fields.map(field => this.renderGroup(field));
  }

  renderSubmitButton() {
    return (
      <Button color="primary">{this.props.actionTitle}</Button>
    );
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          {this.renderGroups()}
          <FormGroup row={this.props.row}>
            <Col>
              {this.renderSubmitButton()}
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}


export default ControlledForm;
