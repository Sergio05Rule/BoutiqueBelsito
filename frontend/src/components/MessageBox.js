import React from 'react';

export default function MessageBox(props) /* parameter error msg (props.variant) */{
  return (
    <div className={`alert alert-${props.variant || 'info'}`}>
      {props.children}
    </div>
  );
}