import React from 'react';
import './Organization.css';
import Perorg from './Perorg';
function Organization({ isLoaded, organizations, mode }) {
  return (
    (isLoaded ? (
      <div className="Organization">
        {organizations.map((org, index) => (
          <Perorg org={org} key={org.id} mode={mode} />
        ))}
      </div>
    ) :
      (<div> No Organization registered</div>))

  )
}

export default Organization;
