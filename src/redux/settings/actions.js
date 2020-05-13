import { CHANGE_LOCALE, SET_SOCKET } from '../actions';

export const changeLocale = locale => {
  localStorage.setItem('currentLanguage', locale);
  return {
    type: CHANGE_LOCALE,
    payload: locale,
  };
};

export const setSocket = socket => {
  return {
    type: SET_SOCKET,
    payload: socket,
  };
};
