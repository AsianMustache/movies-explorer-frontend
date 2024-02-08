import "../NavTab/NavTab.css";

function NavTab() {
    return (
        <div className="nav-tab">
          <a href="#about" className="nav-tab__button-link"><button className="nav-tab__button">О проекте</button></a>
          <a href="#technology" className="nav-tab__button-link"><button className="nav-tab__button">Технологии</button></a>
          <a href="#student" className="nav-tab__button-link"><button className="nav-tab__button">Студент</button></a>
        </div>
    );
}

export default NavTab;