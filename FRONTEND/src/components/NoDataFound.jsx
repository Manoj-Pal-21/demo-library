import React from 'react';

const NoDataFound = () => {
  return (
    <div className="container text-center my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="alert alert-info" role="alert">
            <h4 className="alert-heading">No Data Found</h4>
            <p>Sorry, but there seems to be no data available at the moment.</p>
            <hr />
            <p className="mb-0">Please check back later or contact support if you believe this is an error.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoDataFound;
