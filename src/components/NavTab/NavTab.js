import "../NavTab/NavTab.css";

function NavTab() {
    return (
        <section className="nav-tab">
          <a href="#about" className="nav-tab__button">О проекте</a>
          <a href="#technology" className="nav-tab__button">Технологии</a>
          <a href="#student" className="nav-tab__button">Студент</a>
        </section>
    );
}

export default NavTab;