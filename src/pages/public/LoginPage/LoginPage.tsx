import HeaderLanding from "../../../components/landing/HeaderLanding"
import FooterLanding from "../../../components/landing/FooterLanding"

const LoginPage = () => {
  return (
    <div>

      <HeaderLanding />

      <section style={{padding:"100px 20px", textAlign:"center"}}>
        <h1>Iniciar sesión</h1>
        <p>Aquí irá el formulario de autenticación.</p>
      </section>

      <FooterLanding />

    </div>
  )
}

export default LoginPage