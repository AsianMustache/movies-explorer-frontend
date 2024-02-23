import "../AboutProject/AboutProject.css"

function AboutProject() {
    return (
        <section className="about-project__details">
            <div className="about-project__description-header">
                <p id="about" className="about-project__header-title">О проекте</p>
            </div>
            <section className="about-project__details-content">
                <div className="about-project__details-block">
                    <p className="about-project__details-text">Дипломный проект включал 5 этапов</p>
                    <p className="about-project__details-duration">На выполнение диплома ушло 5 недель</p>
                </div>
                <div className="about-project__details-description">
                    <p className="about-project__description-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    <p className="about-project__description-notes">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </section>
            <section className="about-project__timeline">
                <div className="about-project__backend-container">
                    <p className="about-project__backend-text">1 неделя</p>
                </div>
                <p className="about-project__backend-title">Back-end</p>
                <div className="about-project__frontend-container">
                    <p className="about-project__frontend-duration">4 недели</p>
                </div>
                <p className="about-project__frontend-title">Front-end</p>
            </section>

        </section>
    )
}

export default AboutProject;
