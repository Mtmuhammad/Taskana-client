// text input to search and filter tasks

const FilterInput = ({ handleChange }) => {
  return (
    <div className="p-3 border-bottom">
      <div data-testid="input-container" className="input-group searchbar">
        <span
          data-testid="input-icon"
          className="input-group-text text-muted"
          id="search"
        >
          <i className="bx bx-search-alt-2"></i>
        </span>
        <input
          data-testid="input-search"
          type="text"
          className="form-control"
          placeholder="Search Tasks Here"
          id="task-search"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default FilterInput;
