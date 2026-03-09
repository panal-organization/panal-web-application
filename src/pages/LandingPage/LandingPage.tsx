import HeaderLanding from "../../components/landing/HeaderLanding"
import FooterLanding from "../../components/landing/FooterLanding"

import "./LandingPage.css"

const LandingPage = () => {

  return (
    <div className="landing">

      <HeaderLanding /> 

      <section className="hero">

        <h1>Panal</h1>

        <p>
          Plataforma SaaS para gestión de tickets de soporte técnico
        </p>

        <button className="start">
          Comenzar
        </button>

      </section>

      <FooterLanding />

    </div>
  )
}

export default LandingPage