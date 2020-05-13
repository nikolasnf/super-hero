import React, { Component, Fragment } from 'react';
import { Row, Card, CardBody, Container, Col } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { connect } from 'react-redux';
import moment from 'moment';

class Waiting extends Component {
  render() {
    const { approved_at, approved, reproved_message } = this.props;
    return (
      <Card>
        <CardBody>
          <Container fluid>
            <Row>
              <Col>
                <h3>Solicitação de Cadastro</h3>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <h5>{`Solicitação atualizada em: ${moment(approved_at).format(
                  'DD/MM/YYYY - HH:mm:ss'
                )}`}</h5>
              </Col>
              <Col>
                <h5>{`Status: ${approved ? 'Aprovado' : 'Aguardando'}`}</h5>
              </Col>
            </Row>
            {reproved_message && (
              <Row>
                <Col>
                  <p>
                    <span>{`Mensagem: ${reproved_message}`}</span>
                  </p>
                </Col>
              </Row>
            )}
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  approved: state.authUser.approved,
  approved_at: state.authUser.approved_at,
  reproved_message: state.authUser.reproved_message,
});

export default connect(mapStateToProps)(Waiting);
