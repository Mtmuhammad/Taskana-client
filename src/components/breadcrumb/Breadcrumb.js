// Breadcrumb component to indicate the current page's location
import React from 'react'

const Breadcrumb = ({ page }) => {
  return (
    <div data-testid="breadcrumb" className="page-breadcrumb border-bottom">
      <div className="row">
        <div
          className="
                col-lg-3 col-md-4 col-xs-12
                justify-content-start
                d-flex
                align-items-center
              "
        >
          <h5
            data-testid="breadcrumb-title"
            className="h3 font-weight-medium text-uppercase mb-0"
          >
            {page}
          </h5>
        </div>
        <div
          className="
                col-lg-9 col-md-8 col-xs-12
                d-flex
                justify-content-start justify-content-md-end
                align-self-center
              "
        >
          <nav data-testid="pages" aria-label="breadcrumb" className="mt-2">
            <ol className="breadcrumb mb-0 p-0">
              <li className="h4 breadcrumb-item">Home</li>
              <li className="h4 breadcrumb-item">{page}</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
