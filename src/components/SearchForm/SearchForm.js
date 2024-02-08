import searchButton from "../../images/search-button.svg"
import "../SearchForm/SearchForm.css"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
    return (
        <div className="search-form">
          <div className="search-form__field">
            <input 
              placeholder="Фильм" 
              type="text" 
              className="search-form__input"
            />
            <div className="search-form__icon-container">
              <button className="search-form__icon-container">
                <img
                    src={searchButton}
                    className="search-form__icon"
                    alt="Search Icon"
                />
              </button>
            </div>
          </div>
              <FilterCheckbox />
        </div>
      );
    }

export default SearchForm;