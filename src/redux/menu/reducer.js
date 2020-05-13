import {
  MENU_SET_CLASSNAMES,
  MENU_CONTAINER_ADD_CLASSNAME,
  MENU_CLICK_MOBILE_MENU,
  MENU_CHANGE_DEFAULT_CLASSES,
  MENU_CHANGE_HAS_SUB_ITEM_STATUS,
  SET_NOTIFICATIONS,
  SET_NOTIFICATIONS_UNREAD,
  RESET_NOTIFICATIONS,
} from '../actions';

import {
  defaultMenuType,
  subHiddenBreakpoint,
  menuHiddenBreakpoint,
} from '../../constants/defaultValues';

const INIT_STATE = {
  containerClassnames: defaultMenuType,
  subHiddenBreakpoint,
  menuHiddenBreakpoint,
  notifications: [],
  unreadCount: 0,
  menuClickCount: 0,
  selectedMenuHasSubItems: defaultMenuType === 'menu-default', // if you use menu-sub-hidden as default menu type, set value of this variable to false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case MENU_CHANGE_HAS_SUB_ITEM_STATUS:
      return { ...state, selectedMenuHasSubItems: action.payload };

    case MENU_SET_CLASSNAMES:
      return {
        ...state,
        containerClassnames: action.payload.containerClassnames,
        menuClickCount: action.payload.menuClickCount,
      };

    case MENU_CLICK_MOBILE_MENU:
      return {
        ...state,
        containerClassnames: action.payload.containerClassnames,
        menuClickCount: action.payload.menuClickCount,
      };

    case MENU_CONTAINER_ADD_CLASSNAME:
      return { ...state, containerClassnames: action.payload };

    case MENU_CHANGE_DEFAULT_CLASSES:
      return { ...state, containerClassnames: action.payload };
    case SET_NOTIFICATIONS:
      return { ...state, notifications: action.payload };
    case RESET_NOTIFICATIONS:
      return { ...state, notifications: [], unreadCount: 0 };
    case SET_NOTIFICATIONS_UNREAD:
      return { ...state, unreadCount: action.payload };

    default:
      return { ...state };
  }
};
