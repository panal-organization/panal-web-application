import HeaderLanding from "../../../components/landing/HeaderLanding"
import FooterLanding from "../../../components/landing/FooterLanding"

const ContactPage = () => {
  return (
    <div>

      <HeaderLanding />

      <div style={{ padding: "80px 120px" }}>
        <h1>Contáctanos</h1>

        <p>
          Si tienes dudas o deseas conocer más sobre Panal,
          nuestro equipo estará encantado de ayudarte.
        </p>

        <p>Email: soporte@panal.app</p>
        <p>Teléfono: +52 664 813 9370</p>
      </div>

      <FooterLanding />

    </div>
  )
}

export default ContactPage