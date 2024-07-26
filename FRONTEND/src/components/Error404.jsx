import React from 'react';

const Error404 = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h1 className="display-4 mt-5">404</h1>
          <p className="lead">Oops! Page not found.</p>
          <p className="lead">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
          <a href="/" className="btn btn-primary mt-3">Go to Homepage</a>
        </div>
      </div>
    </div>
  );
};

export default Error404;
