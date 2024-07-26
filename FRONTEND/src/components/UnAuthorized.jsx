import React from 'react';

const UnAuthorized = () => {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8"> 
          <h5 className="text-center">Unauthorized Access</h5>
          <p className="text-center">
            Sorry, you are not authorized to view this page.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UnAuthorized;
