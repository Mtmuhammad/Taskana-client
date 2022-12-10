// Home page component for to display individual db info

import React from 'react'
import "./HomeBox.scss";

const HomeBox = ({ icon, type, number, bgColor }) => {
  return (
    <>
      <div className="pe-3 mb-5 col-lg-3 col-md-6">
        <div data-testid="homebox" className="card homebox">
          <div data-testid="homebox-body" className="card-body">
            <div className="d-flex flex-row">
              <div
              data-testid="icon-bg"
                style={{ backgroundColor: `${bgColor}` }}
                className="
              box-icon
              d-flex
              align-items-center
              justify-content-center
              rounded-circle
            "
              >
                <i data-testid="homebox-icon" className={icon}></i>
              </div>
              <div className="ms-4 align-self-center">
                <h3 data-testid="homebox-count" className="mb-2">{number}</h3>
                <h5 data-testid="homebox-type" className="mb-0">{type}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBox;
