import React from 'react';
import './MyOrganization.css';
function MyOrganization(props) {
  return (
    <div className="MyOrganization">
      {props.name}
      {props.hourlyRate}
    </div>
  )
}

export default MyOrganization;
