import HeaderLanding from "../../../components/landing/HeaderLanding"
import FooterLanding from "../../../components/landing/FooterLanding"

const AboutPage = () => {
  return (
    <div>

      <HeaderLanding />

      <div style={{ padding: "80px 120px" }}>

        <h1>¿Quiénes somos?</h1>

        <p>
          Panal es una plataforma SaaS diseñada para optimizar
          la gestión del soporte técnico dentro de las organizaciones.
        </p>

        <p>
          Nuestra solución permite centralizar solicitudes,
          automatizar respuestas con inteligencia artificial
          y mejorar la eficiencia de los equipos de soporte.
        </p>

        <p>
          Nuestro objetivo es ayudar a las empresas a resolver
          incidencias más rápido y mejorar la gestión
          de su infraestructura tecnológica.
        </p>

      </div>

      <FooterLanding />

    </div>
  )
}

export default AboutPage