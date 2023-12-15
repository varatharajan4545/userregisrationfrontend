import React from 'react';

function TextError(props) {
  return (
    <div
      style={{
        color: 'red',
        textAlign: 'left',
        fontWeight: 'bold'
      }}
    >
      {props.children}
    </div>
  );
}

export default TextError;
