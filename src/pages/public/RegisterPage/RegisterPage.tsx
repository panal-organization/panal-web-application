import HeaderLanding from "../../../components/landing/HeaderLanding"
import FooterLanding from "../../../components/landing/FooterLanding"

const RegisterPage = () => {
  return (
    <div>

      <HeaderLanding />

      <section style={{padding:"100px 20px", textAlign:"center"}}>
        <h1>Registro</h1>
        <p>Aquí irá el formulario para crear una cuenta.</p>
      </section>

      <FooterLanding />

    </div>
  )
}

export default RegisterPage