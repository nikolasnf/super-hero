import React, { Component, Fragment, Suspense } from 'react';
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
import IssueList from './components/issueList';
import IntlMessages from '../../../../helpers/IntlMessages';
import {
  fetchIssues,
  readIssue,
  readIssueError,
} from '../../../../redux/issues/actions';
import DataTablePagination from '../../../../components/DatatablePagination';
import CustomSpinner from '../../../../components/customSpinner';

class PlansList extends Component {
  state = {
    search: '',
    markIsOpen: false,
    selectIsOpen: false,
    selected: [],
    all: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.props.fetchIssues();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
    this.props.fetchIssues();
  }

  shouldComponentUpdate(nextProps) {
    if (!this.props.ableSuccess && nextProps.ableSuccess) {
      this.onPageChange(this.props.page - 1);
      this.props.ablePlansReset();
      return false;
    }
    return true;
  }

  selectToggle = () => {
    const { selectIsOpen } = this.state;
    this.setState({ selectIsOpen: !selectIsOpen });
  };

  markToggle = () => {
    const { markIsOpen } = this.state;
    this.setState({ markIsOpen: !markIsOpen });
  };

  //-----------------------------------------------------------------------------

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

  //--------------------------------------------------------------

  resizeListener = () => {
    const width = window.innerWidth;
    this.setState({ width });
  };

  handleSearch = e => {
    this.setState({ search: e.target.value });
  };

  onPageChange = page => {
    this.props.fetchIssues({
      page: page + 1,
    });
  };

  searchName = () => {
    this.props.fetchIssues({
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
              <Col sm="12" md="4" lg="3">
                <div
                  className={classNames(
                    'justify-content-center',
                    'justify-content-md-start',
                    'd-flex flex-nowrap',
                    'align-items-center'
                  )}
                >
                  <div
                    className={classNames(
                      'text-truncate',
                      'text-nowrap',
                      'plans-tab',
                      'align-items-center',
                      'font-weight-bold'
                    )}
                  >
                    <h4
                      className={
                        (classNames('mb-0'),
                        classNames('mb-sm-5 mb-lg-0 mb-md-0'))
                      }
                    >
                      <IntlMessages id="issues.related-issues" />
                    </h4>
                  </div>
                </div>
              </Col>

              <Col sm="12" md="7" lg="5">
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
              <Col className="col mt-3 mt-lg-0" sm="6" md="2" lg="2">
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
              <Col className="col mt-3 mt-lg-0" sm="6" md="2" lg="2">
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
                        this.props.readIssue(
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
                        this.props.readIssue(
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
                <IssueList
                  selected={this.state.selected}
                  history={this.props.history}
                  issues={this.props.data}
                  page={this.props.page}
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
  page: state.issues.page,
  pages: state.issues.pages,
  data: state.issues.data,
  loading: state.issues.fetchLoading,
  error: state.issues.fetchError,
  readSucess: state.issues.readSucess,
});

const mapActionsToProps = {
  fetchIssues,
  readIssue,
  readIssueError,
};

export default connect(mapStateToProps, mapActionsToProps)(PlansList);
