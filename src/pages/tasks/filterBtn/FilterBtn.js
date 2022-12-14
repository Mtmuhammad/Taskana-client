// Button to filter task results by status, completion, or importance
import React from 'react'

const FilterBtn = ({ onClick, title, icon, tasks }) => {
  return (
    <div className="col-12 col-lg-4">
      <div
        data-testid="filter-btn"
        id={title}
        onClick={onClick}
        className="task-filter"
      >
        <div data-testid="filter-icon" className="task-filter-icon">
          <i className={`d-none d-sm-block ${icon}`}></i>
        </div>
        <div className="d-flex align-items-center justify-content-between w-100">
          <h3 data-testid="filter-title" className="task-filter-title">
            {title}
          </h3>
          <span
            data-testid="filter-number"
            className={`task-filter-count badge badge-pill px-3 ${title}`}
          >
            {tasks && tasks.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterBtn;
