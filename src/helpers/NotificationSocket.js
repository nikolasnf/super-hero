import io from 'socket.io-client';

export const init = async oldSocket => {
  const token = sessionStorage.getItem('@access_token');
  const socket = io(process.env.REACT_APP_SOCKET_URL, {
    query: {
      token,
    },
  });
  return socket;
};

export const subscribe = (
  socket,
  setNotifications,
  size,
  addNotification,
  setUnreadCount
) => {
  socket.on('get', ({ data }) => {
    setNotifications(data);
  });
  socket.on('unread', count => {
    setUnreadCount(count);
  });
  socket.on('new', data => {
    addNotification(data);
  });
  socket.on('close', data => {
    console.log('close', data);
  });
  socket.on('error', data => {
    console.log('error', data);
  });
  socket.on('reconnect', () => {
    socket.emit('refresh', size);
  });
  socket.emit('refresh', size);
  return socket;
};
