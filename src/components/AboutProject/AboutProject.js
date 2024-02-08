import "../AboutProject/AboutProject.css"

function AboutProject() {
    return (
        <div className="about-project__details">
            <div className="about-project__description-header">
                <p id="about" className="about-project__header-title">О проекте</p>
                <div className="about-project__line" />
            </div>
            <div className="about-project__details-content">
                <div className="about-project__details-block">
                    <p className="about-project__details-text">Дипломный проект включал 5 этапов</p>
                    <p className="about-project__details-duration">На выполнение диплома ушло 5 недель</p>
                </div>
                <div className="about-project__details-description">
                    <p className="about-project__description-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    <p className="about-project__description-notes">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__timeline">
                <div className="about-project__flex-container">
                    <div className="about-project__week-container">
                        <p className="about-project__week-text">1 неделя</p>
                    </div>
                    <p className="about-project__backend-title">Back-end</p>
                </div>
                <div className="about-project__flex-container about-project__flex-container-large">
                    <div className="about-project__weeks-container">
                        <p className="about-project__weeks-duration">4 недели</p>
                    </div>
                    <p className="about-project__weeks-text">Front-end</p>
                </div>
            </div>
        </div>
    )
}

export default AboutProject;
