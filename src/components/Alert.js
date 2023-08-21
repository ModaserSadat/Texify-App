import React from 'react';

function Alert(props) {
  return (
    // Check if alert prop is not null and display the alert
    props.alert && (
      <div
        className="alert alert-success alert-dismissible fade show"
        role="alert"
        style={{
          position: 'fixed',      // Fix the position of the alert
          top: '0',               // Position it at the top
          left: '50%',            // Center it horizontally
          transform: 'translateX(-50%)', // Center it using transform
          zIndex: '1000',         // Ensure the alert appears on top
        }}
      >
        <strong>{props.alert.type}</strong>: {props.alert.msg}
      </div>
    )
  );
}

export default Alert;
