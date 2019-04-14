import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGrant } from '../../../../actions/programActions';
import PropTypes from 'prop-types';
import Page from '../../../common/Page';
import {
  GeneralSection,
  DescriptionSection,
  RequirementSection,
  ProcessSection,
  GrantDetailsSection,
} from '../../../../containers/Programs';

import { Card, CardBody, Col, Row, Button } from 'reactstrap';

class CreateGrant extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      success: false,
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {}

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = event => {
    event.preventDefault();

    const grantData = this.props.grants;
    const file = this.props.file;
    this.props.createGrant(file, grantData);
  };

  render() {
    return (
      <Page>
        <Row>
          <GeneralSection />
          <DescriptionSection />
          <RequirementSection />
          <ProcessSection />
          <GrantDetailsSection />
          <Col xl={12} lg={12} md={12}>
            <Card>
              <CardBody>
                <Button color="secondary" onClick={this.submitForm}>
                  Submit
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

CreateGrant.propTypes = {
  errors: PropTypes.object,
};

const mapStateToProps = state => ({
  grants: state.program.grants,
  file: state.program.file,
});

export default connect(
  mapStateToProps,
  { createGrant },
)(CreateGrant);
