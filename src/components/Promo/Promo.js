import "../Promo/Promo.css";
import NavTab from "../NavTab/NavTab";


function Promo() {
  return (
    <section className="student-promo">
      <div className="promo-info">
        <p className="promo-info__title">Учебный проект студента факультета Веб-разработки.</p>
        <NavTab />
      </div>
    </section>
  );
}
export default Promo