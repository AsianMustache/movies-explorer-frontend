import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";

function Main() {
    return (
        <section>
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
        </section>
    )
}

export default Main;