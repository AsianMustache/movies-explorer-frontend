import searchButton from "../../images/search-button.svg"
import "../SearchForm/SearchForm.css"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
    return (
        <>
          <section className="search-form">
           
            <form  className="search-form__field">
              <input 
                placeholder="Фильм" 
                type="text" 
                className="search-form__input"
                required
              />
              
                <button className="search-form__icon-container">
                  <img
                      src={ searchButton }
                      className="search-form__icon"
                      alt="Search Icon"
                  />
                </button>
              
            </form>
                <FilterCheckbox />
              
          </section>
        </>
      );
    }

export default SearchForm;