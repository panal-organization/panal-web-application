import HeaderLanding from "../../components/landing/HeaderLanding"
import FooterLanding from "../../components/landing/FooterLanding"

import panalIA from "../../assets/images/IA.png"

import "./LandingPage.css"

const LandingPage = () => {

  return (
    <div className="landing">

      <HeaderLanding />

      <div className="hero">

        <div className="hero-left">
      <h1>
  El futuro del soporte técnico comienza con 
  <br />
    <span>Inteligencia Artificial</span>
</h1>
          <p>
Gestiona solicitudes, automatiza respuestas con Inteligencia Artificial y mejora tu soporte técnico fácilmente.
</p>

          <button className="start">
            Comenzar gratis
          </button>
        </div>

        <div className="hero-right">
          <img src={panalIA} alt="Panal preview" />
        </div>

      </div>

      <FooterLanding />

    </div>
  )
}

export default LandingPage