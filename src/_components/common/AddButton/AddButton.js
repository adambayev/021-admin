import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';

const AddButton = ({ buttonName }) => {
  return (
    <Row>
      <Col xl={12} lg={12} md={12}>
        <Link
          className="d-flex justify-content-end text-decoration-none"
          to={`/organizations/add`}
        >
          <Button color="primary">{buttonName}</Button>
        </Link>
      </Col>
    </Row>
  );
};

export default AddButton;
