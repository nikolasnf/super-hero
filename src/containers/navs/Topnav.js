import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input,
} from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import './Topnav.css';

import IntlMessages from '../../helpers/IntlMessages';
import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
  changeLocale,
  setSocket,
  setNotifications,
  setUnreadCount,
} from '../../redux/actions';

import {
  menuHiddenBreakpoint,
  searchPath,
  localeOptions,
  isDarkSwitchActive,
} from '../../constants/defaultValues';

import { MobileMenuIcon, MenuIcon } from '../../components/svg';
import TopnavEasyAccess from './Topnav.EasyAccess';
import TopnavNotifications from './Topnav.Notifications';
import TopnavDarkSwitch from './Topnav.DarkSwitch';

import { getDirection, setDirection } from '../../helpers/Utils';
import { init, subscribe } from '../../helpers/NotificationSocket';

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInFullScreen: false,
      searchKeyword: '',
      refreshNotifications: false,
      size: 10,
    };
  }

  async componentDidMount() {
    const socket = await init();
    this.socket = socket;
    const topic = subscribe(
      socket,
      this.props.setNotifications,
      this.state.size,
      this.addNotification,
      this.props.setUnreadCount
    );

    this.props.setSocket(topic);
  }

  componentWillUnmount() {
    if (this.socket) this.socket.close();
  }

  handleChangeLocale = (locale, direction) => {
    this.props.changeLocale(locale);

    const currentDirection = getDirection().direction;
    if (direction !== currentDirection) {
      setDirection(direction);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  handleSearchIconClick = e => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains('search')) {
        if (e.target.parentElement.classList.contains('search')) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains('search')
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains('mobile-view')) {
        this.search();
        elem.classList.remove('mobile-view');
        this.removeEventsSearch();
      } else {
        elem.classList.add('mobile-view');
        this.addEventsSearch();
      }
    } else {
      this.search();
    }
  };

  addEventsSearch = () => {
    document.addEventListener('click', this.handleDocumentClickSearch, true);
  };

  removeEventsSearch = () => {
    document.removeEventListener('click', this.handleDocumentClickSearch, true);
  };

  handleDocumentClickSearch = e => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('navbar') ||
        e.target.classList.contains('simple-icon-magnifier'))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains('simple-icon-magnifier')) {
        this.search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains('search')
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector('.mobile-view');
      if (input && input.classList) input.classList.remove('mobile-view');
      this.removeEventsSearch();
      this.setState({
        searchKeyword: '',
      });
    }
  };

  handleSearchInputChange = e => {
    this.setState({
      searchKeyword: e.target.value,
    });
  };

  handleSearchInputKeyPress = e => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  search = () => {
    this.props.history.push(`${searchPath}/${this.state.searchKeyword}`);
    this.setState({
      searchKeyword: '',
    });
  };

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    const docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    this.setState({
      isInFullScreen: !isInFullScreen,
    });
  };

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
    this.props.socket.close();
  };

  menuButtonClick = (e, menuClickCount, containerClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      this.props.selectedMenuHasSubItems
    );
  };

  mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  };

  seeMore = () => {
    this.setState({ size: this.state.size + 10 });
    this.props.socket.emit('refresh', this.state.size + 10);
  };

  addNotification = data => {
    const notifications = _.cloneDeep(this.props.notifications);
    this.props.setNotifications([data, ...notifications]);
  };

  renderName = () => {
    const { roles } = this.props;
    if (roles.includes('admin')) {
      return 'Administrador';
    }
    if (roles.includes('agency')) {
      return 'Imobiliária';
    }
    return '';
  };

  navClass = () => {
    const { roles } = this.props;
    if (roles.includes('admin')) {
      return 'navbar-admin';
    }
    if (roles.includes('agency')) {
      return 'navbar-agency';
    }
    return '';
  };

  render() {
    const { containerClassnames, menuClickCount, roles } = this.props;
    const { messages } = this.props.intl;
    return (
      <nav className={`navbar fixed-top ${this.navClass()}`}>
        <div className="d-flex align-items-center navbar-left ">
          <NavLink
            to="#"
            location={{}}
            className="menu-button d-none d-md-block"
            onClick={e =>
              this.menuButtonClick(e, menuClickCount, containerClassnames)
            }
          >
            <MenuIcon />
          </NavLink>
          <NavLink
            to="#"
            location={{}}
            className="menu-button-mobile d-xs-block d-sm-block d-md-none"
            onClick={e => this.mobileMenuButtonClick(e, containerClassnames)}
          >
            <MobileMenuIcon />
          </NavLink>
        </div>
        <a className="navbar-logo" href="/">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a>
        <div className="navbar-right">
          <div className="header-icons d-inline-block align-middle">
            <TopnavNotifications
              socket={this.props.socket}
              notifications={this.props.notifications}
              history={this.props.history}
              seeMore={this.seeMore}
              unreadCount={this.props.unreadCount}
              size={this.state.size}
            />
          </div>
          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
                <span className="name mr-1">{this.renderName()}</span>
                <span>
                  <img alt="Profile" src="/assets/img/profile-pic-l.jpg" />
                </span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                <DropdownItem onClick={() => this.handleLogout()}>
                  Sair
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ authUser, menu, settings }) => {
  const {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    notifications,
    unreadCount,
  } = menu;
  const { roles } = authUser;
  const { locale, socket } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
    notifications,
    socket,
    unreadCount,
    roles,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnames,
    clickOnMobileMenu,
    logoutUser,
    changeLocale,
    setSocket,
    setNotifications,
    setUnreadCount,
  })(TopNav)
);
