import "../Portfolio/Portfolio.css"

function Portfolio() {
    return (
        <section className="portfolio">
          <h2 className="portfolio__heading">Портфолио</h2>
          <div className="portfolio__projects">
            <div className="portfolio__project">
              <a href="https://github.com/AsianMustache/russian-travel" target="_blank" rel="noopener noreferrer" className="portfolio__project-link"><p className="portfolio__project-title">Статичный сайт</p></a>
              <a href="https://github.com/AsianMustache/how-to-learn" target="_blank" rel="noopener noreferrer" className="portfolio__project-link">↗</a>
            </div>
            <div className="portfolio__project">
              <a href="https://github.com/AsianMustache/russian-travel" target="_blank" rel="noopener noreferrer" className="portfolio__project-link"><p className="portfolio__project-title">Адаптивный сайт</p></a>
              <a href="https://github.com/AsianMustache/russian-travel" target="_blank" rel="noopener noreferrer" className="portfolio__project-link">↗</a>
            </div>
            <div className="portfolio__project">
              <a href="https://github.com/AsianMustache/russian-travel" target="_blank" rel="noopener noreferrer" className="portfolio__project-link"><p className="portfolio__project-title">Одностраничное приложение</p></a>
              <a href="https://github.com/AsianMustache/react-mesto-api-full-gha" target="_blank" rel="noopener noreferrer" className="portfolio__project-link">↗</a>
            </div>
          </div>
        </section>

    )
  }

export default Portfolio;