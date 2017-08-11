import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';


class Pagination extends Component {
  static propTypes = {
    uri: PropTypes.object.isRequired,
    meta: ImmutablePropTypes.map.isRequired,
  };

  constructor(props) {
    super(props);

    this.query = this.props.uri.extract(location.search);
  }

  getQuery(query) {
    const nextQuery = _.assign({}, this.query, this.props.uri.extract(`?${query}`));
    return this.props.uri.expand(nextQuery);
  }

  renderPrevious() {
    const prev = this.props.meta.get('prev');

    if (!prev) {
      return null;
    }

    return (
      <Link to={this.getQuery(prev)}>
        Previous
      </Link>
    );
  }

  renderNext() {
    const next = this.props.meta.get('next');

    if (!next) {
      return null;
    }

    return (
      <Link to={this.getQuery(next)}>
        Next
      </Link>
    );
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div className="float-left">
              {this.renderPrevious()}
            </div>
          </Col>
          <Col>
            <div className="float-right">
              {this.renderNext()}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}


export default Pagination;
