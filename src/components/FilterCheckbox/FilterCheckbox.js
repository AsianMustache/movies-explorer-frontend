import React, { useState } from "react";
import "../FilterCheckbox/FilterCheckbox.css";
import tumblerOn from "../../images/tumbler-on.svg"
import tumblerOff from "../../images/tumbler-off.svg"

function FilterCheckbox() {
    const [isActive, setIsActive] = useState(true);

    const toggleButton = () => {
      setIsActive(!isActive);
    };

    return (
        <section className="filter-checkbox">
            <button onClick={toggleButton} className={`filter-checkbox__button ${isActive ? "filter-checkbox__button_active" : ""}`}>
                <img src={isActive ? tumblerOn : tumblerOff} alt={isActive ? "Включено" : "Выключено"} />
            </button>
            <p className="filter-checkbox__label">Короткометражки</p>
        </section>
    );
}

export default FilterCheckbox;