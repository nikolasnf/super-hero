/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, Button } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import IntlMessages from '../../helpers/IntlMessages';
import { formatDate } from '../../helpers/Utils';

const NotificationItem = ({
  id,
  socket,
  message,
  created_at,
  read,
  redirect,
  history,
  size,
}) => {
  const handleClick = () => {
    const redirectObj = JSON.parse(redirect);
    socket.emit('read', { id, size });
    let changed = true;

    switch (redirectObj.type) {
      case 'agency_request':
        history.push(`/app/admin/agency/request/${redirectObj.id}`);
        break;
      case 'agent_request':
        history.push(`/app/admin/agent/request/${redirectObj.id}`);
        break;
      case 'agent_assign':
        history.push(`/app/agency/agent/request/${redirectObj.id}`);
        break;
      case 'agent_assign_accepted':
        history.push(`/app/agency/agent/info/${redirectObj.id}`);
        break;
      case 'ad_blocked':
      case 'agent_sold':
        history.push(`/app/agency/announcements/${redirectObj.id}`);
        break;
      case 'creci_request':
        history.push(`/app/admin/creci-requests/info/${redirectObj.id}`);
        break;
      case 'agent_try_to_unasign':
        history.push(`/app/agency/agent/info/${redirectObj.id}`);
        break;
      default:
        changed = false;
    }
    // eslint-disable-next-line no-undef
    changed && location.reload();
  };

  return (
    <div
      className="d-flex flex-row mb-3 pb-3 border-bottom"
      onClick={handleClick}
    >
      <a style={{ cursor: 'pointer', width: '100%' }}>
        <div className="pl-3 pr-2">
          <p className="font-weight-medium mb-1">{message}</p>
          <div className="d-flex flex-row ">
            <p className="text-muted mb-0 text-small">
              {formatDate(created_at)}
            </p>
            {!read && (
              <span className="mb-0 text-small ml-auto badge badge-pill badge-primary">
                NOVO
              </span>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};

const TopnavNotifications = ({
  socket,
  notifications,
  history,
  seeMore,
  unreadCount,
  size,
}) => {
  const [opened, setOpened] = useState(false);
  const [clear, setClear] = useState(false);
  useEffect(() => {
    if (opened) {
      setClear(true);
    } else if (!opened && clear) {
      setClear(false);
    }
  }, [opened]);

  return (
    <div className="position-relative d-inline-block">
      <Dropdown
        isOpen={opened}
        toggle={() => setOpened(!opened)}
        className="dropdown-menu-right"
      >
        <DropdownToggle
          className="header-icon notificationButton"
          color="empty"
        >
          <i className="simple-icon-bell" />
          <span className="count">{unreadCount}</span>
        </DropdownToggle>
        <DropdownMenu
          className="position-absolute mt-3 scroll"
          right
          id="notificationDropdown"
        >
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {notifications.map((notification, index) => {
              return (
                <NotificationItem
                  key={index}
                  {...notification}
                  socket={socket}
                  history={history}
                  size={size}
                />
              );
            })}
            {!notifications.length && (
              <span className="d-flex justify-content-center text-align-center">
                <IntlMessages id="menu.notifications_empty" />
              </span>
            )}
            {notifications.length ? (
              <span className="d-flex justify-content-center text-align-center">
                <Button color="link" onClick={seeMore}>
                  Ver mais
                </Button>
              </span>
            ) : null}
          </PerfectScrollbar>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default TopnavNotifications;
