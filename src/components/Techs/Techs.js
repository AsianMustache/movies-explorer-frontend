import "../Techs/Techs.css";

function Techs() {
  return (
    <div className="techs">
      <div className="techs__header">
        <p id="technology" className="techs__header-title">Технологии</p>
      </div>
      <div className="techs__content">
        <p className="techs__subtitle">7 технологий</p>
        <div className="techs__description">
          <p className="techs__description-text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        </div>
      <div className="techs__buttons">
        <button className="techs__button">HTML</button>
        <button className="techs__button">CSS</button>
        <button className="techs__button">JS</button>
        <button className="techs__button">React</button>
        <button className="techs__button">Git</button>
        <button className="techs__button">Express.js</button>
        <button className="techs__button">mongoDB</button>
      </div>
      </div>
    </div>
  );
}

export default Techs;
