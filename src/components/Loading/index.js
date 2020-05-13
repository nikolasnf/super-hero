import React from 'react';

const Loading = ({ loading, children }) =>
  loading ? (
    <div
      style={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        zIndex: 1080,
        backgroundColor: 'rgba(255, 255, 255, 1)',
      }}
    >
      <div className="loading" />
    </div>
  ) : (
    children
  );

export default Loading;
