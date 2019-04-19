import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleGrant } from '../../../../actions/programActions';
import PropTypes from 'prop-types';
import Page from '../../../common/Page';
import {
  GeneralSection,
  DescriptionSection,
  RequirementSection,
  ProcessSection,
  // GrantDetailsSection,
} from '../../../../containers/Programs';

import { Card, CardBody, Col, Row, Button } from 'reactstrap';

class EditGrant extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      success: false,
      errors: {},
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchSingleGrant(id);
  }

  componentWillReceiveProps(nextProps) {}

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = event => {
    event.preventDefault();

    const grantData = this.props.grants;
    const file = this.props.file;
    const attachments = this.props.attachments;

    this.props.createGrant(file, attachments, grantData);
  };

  render() {
    return (
      <Page>
        <Row>
          <GeneralSection />
          <DescriptionSection />
          <RequirementSection />
          <ProcessSection />
          {/* <GrantDetailsSection /> */}
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

EditGrant.propTypes = {
  errors: PropTypes.object,
};

const mapStateToProps = state => ({
  grants: state.program.grants,
  file: state.program.file,
  attachments: state.program.attachments,
});

export default connect(
  mapStateToProps,
  { fetchSingleGrant },
)(EditGrant);
