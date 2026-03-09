import HeaderLanding from "../../../components/landing/HeaderLanding"
import FooterLanding from "../../../components/landing/FooterLanding"

const PricingPage = () => {
  return (
    <div>

      <HeaderLanding />

      <div style={{ padding: "80px 120px" }}>
        <h1>Suscripciones</h1>

        <p>
          Elige el plan que mejor se adapte a tu organización.
        </p>

        <ul>
          <li>Plan Básico</li>
          <li>Plan Profesional</li>
          <li>Plan Empresarial</li>
        </ul>
      </div>

      <FooterLanding />

    </div>
  )
}

export default PricingPage