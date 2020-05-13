import React, { Component, Suspense } from 'react';
import {
  Row,
  Container,
  Col,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  Card,
  CardBody,
  Spinner,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import classNames from 'classnames';
import { connect } from 'react-redux';
import AgentList from './components/AgentList';
import IntlMessages from '../../../../../helpers/IntlMessages';
import {
  fetchAgentsRating,
  readRating,
  readRatingError,
} from '../../../../../redux/rating/actions';
import DataTablePagination from '../../../../../components/DatatablePagination';
import CustomSpinner from '../../../../../components/customSpinner';

class AgentsList extends Component {
  state = {
    search: '',
    markIsOpen: false,
    selectIsOpen: false,
    selected: [],
    all: false,
  };

  componentDidMount() {
    this.props.fetchAgentsRating({ type: 'Agent' });
  }

  componentWillUnmount() {}

  handleSearch = e => {
    this.setState({ search: e.target.value });
  };

  selectToggle = () => {
    const { selectIsOpen } = this.state;
    this.setState({ selectIsOpen: !selectIsOpen });
  };

  markToggle = () => {
    const { markIsOpen } = this.state;
    this.setState({ markIsOpen: !markIsOpen });
  };

  onMark = id => {
    const getSelected = [...this.state.selected];
    const index = getSelected.findIndex(getSelectedId => getSelectedId === id);
    index !== -1 ? getSelected.splice(index, 1) : getSelected.push(id);
    this.setState({ selected: getSelected, all: false });
  };

  selectAll = () => {
    this.setState({ selected: this.props.data.map(e => e.id), all: true });
  };

  selectPage = () => {
    this.setState({ selected: this.props.data.map(e => e.id) });
  };

  selectReaded = () => {
    this.setState({
      selected: this.props.data
        .map(e => (e.read === 1 ? e.id : null))
        .filter(e => !!e),
    });
  };

  selectNotReaded = () => {
    this.setState({
      selected: this.props.data
        .map(e => (e.read === 0 ? e.id : null))
        .filter(e => !!e),
    });
  };

  onPageChange = page => {
    this.props.fetchAgentsRating({
      type: 'Agent',
      page: page + 1,
      name: this.state.search,
    });
  };

  searchName = () => {
    this.props.fetchAgentsRating({
      type: 'Agent',
      name: this.state.search,
    });
  };

  render() {
    const { selectIsOpen, markIsOpen } = this.state;
    return (
      <Card>
        <CardBody>
          <Container fluid>
            <Row className={classNames('align-items-center', 'mb-3')}>
              <Col sm="12" md="6" lg="4">
                <div
                  className={classNames(
                    'justify-content-center',
                    'justify-content-md-start',
                    'd-flex flex-nowrap',
                    'align-items-center',
                    'mb-2'
                  )}
                >
                  <div
                    className={classNames(
                      'text-truncate',
                      'text-nowrap',
                      'agent-tab',
                      'align-items-center',
                      'font-weight-bold'
                    )}
                  >
                    <p
                      className={
                        (classNames('mb-0'),
                        classNames('mb-sm-5 mb-lg-0 mb-md-0'))
                      }
                    >
                      <IntlMessages id="rating.agent-rating-and-comment" />
                    </p>
                  </div>
                </div>
              </Col>
              <Col sm="12" md="6" lg="4">
                <InputGroup>
                  <Input
                    placeholder="Pesquisar"
                    onKeyPress={e => e.key === 'Enter' && this.searchName()}
                    onChange={this.handleSearch}
                  />
                  <InputGroupAddon addonType="append">
                    <Button outline color="primary">
                      <i className="simple-icon-magnifier" />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
              <Col className="col mt-3 mt-lg-0" sm="6" md="3" lg="2">
                <Dropdown
                  isOpen={selectIsOpen}
                  toggle={this.selectToggle}
                  size="sm"
                >
                  <DropdownToggle caret>
                    <IntlMessages id="rating.select" />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.selectAll}>
                      <IntlMessages id="rating.all" />
                    </DropdownItem>
                    <DropdownItem onClick={this.selectPage}>
                      <IntlMessages id="rating.this-page" />
                    </DropdownItem>
                    <DropdownItem onClick={this.selectReaded}>
                      <IntlMessages id="rating.read" />
                    </DropdownItem>
                    <DropdownItem onClick={this.selectNotReaded}>
                      <IntlMessages id="rating.not-read" />
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Col>
              <Col className="col mt-3 mt-lg-0" sm="6" md="3" lg="2">
                <Dropdown
                  isOpen={markIsOpen}
                  toggle={this.markToggle}
                  size="sm"
                >
                  <DropdownToggle caret>
                    <IntlMessages id="rating.mark" />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() =>
                        this.props.readRating(
                          this.state.selected,
                          true,
                          this.state.all
                        )
                      }
                    >
                      <IntlMessages id="rating.as-read" />
                    </DropdownItem>
                    <DropdownItem
                      onClick={() =>
                        this.props.readRating(
                          this.state.selected,
                          false,
                          this.state.all
                        )
                      }
                    >
                      <IntlMessages id="rating.as-not-read" />
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </Row>
            <Row>
              <Suspense fallback={<div className="loading" />}>
                <AgentList
                  selected={this.state.selected}
                  history={this.props.history}
                  agent={this.props.data}
                  onMark={this.onMark}
                />

                {this.props.loading && <CustomSpinner />}
                <div className="mt-3 mb-3 col-12">
                  <DataTablePagination
                    pages={this.props.pages}
                    page={this.props.page - 1}
                    onPageChange={this.onPageChange}
                  />
                </div>
              </Suspense>
            </Row>
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  page: state.rating.page,
  pages: state.rating.pages,
  data: state.rating.data,
  loading: state.rating.fetchLoading,
  error: state.rating.fetchError,
  readSucess: state.rating.readSucess,
});

const mapActionsToProps = {
  fetchAgentsRating,
  readRating,
  readRatingError,
};

export default connect(mapStateToProps, mapActionsToProps)(AgentsList);
