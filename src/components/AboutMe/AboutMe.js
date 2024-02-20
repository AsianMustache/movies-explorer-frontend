import "../AboutMe/AboutMe.css";
import photo from "../../images/photo.png"
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
    return (
      <section className="about-me">
        <div className="about-me__header">
          <p id="student" className="about-me__title">Студент</p>
        </div>
        <article className="about-me__info">
            <img src={photo} className="about-me__image" alt="Me" />
          <div className="about-me__details">
            <p className="about-me__name">Александр</p>
            <div className="about-me__bio">
              <p className="about-me__profession">Фронтенд-разработчик, 36 лет</p>
              <p className="about-me__text">Родился в Хабаровске. Живу в Краснодаре. В 2009 году окончил Хабаровскую Государственную Академию Экономики и Права - факультет Аудитор по специальности Бухгалтерский Учет, Анализ и Аудит. 
              У меня есть жена. Работаю в Web Студии Краснодара Top Man с 2018 года. На данный момент являюсь руководителем отдела SEO продвижения. Интересно стало заниматься кодом в тот момент, когда возникла необходимость делать мелкие доработки 
              на сайте наших клиентов. Далее планирую развиваться в данном направлении и Яндекс Практикум мне в этом сильно помогает.</p>
            </div>
            <a href="https://github.com/AsianMustache/" target="_blank" rel="noreferrer" className="about-me__github-link">Github</a>
          </div>
          
          
        </article>
        <Portfolio />
      </section>
    );
  }

export default AboutMe;