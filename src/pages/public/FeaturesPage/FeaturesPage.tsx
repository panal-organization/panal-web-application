import HeaderLanding from "../../../components/landing/HeaderLanding"
import FooterLanding from "../../../components/landing/FooterLanding"

const FeaturesPage = () => {
  return (
    <div>

      <HeaderLanding />

      <div style={{ padding: "80px 120px" }}>
        <h1>Características</h1>

        <p>
          Panal ofrece herramientas inteligentes para gestionar el soporte
          técnico de manera eficiente.
        </p>

        <ul>
          <li>Gestión centralizada de tickets</li>
          <li>Automatización con Inteligencia Artificial</li>
          <li>Monitoreo de incidencias</li>
          <li>Panel de métricas en tiempo real</li>
        </ul>
      </div>

      <FooterLanding />

    </div>
  )
}

export default FeaturesPage