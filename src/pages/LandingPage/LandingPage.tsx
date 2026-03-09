    import HeaderLanding from "../../components/landing/HeaderLanding"
    import FooterLanding from "../../components/landing/FooterLanding"
    import squares from "../../assets/images/squares.png"

    import { FaMobileAlt, FaDesktop } from "react-icons/fa"
    import { HiOutlineLightningBolt } from "react-icons/hi"

    import { FaBolt, FaUserClock, FaRocket, FaRobot } from "react-icons/fa"

    import panalIA from "../../assets/images/IA.png"

    import "./LandingPage.css"

    const LandingPage = () => {

      return (
        <div className="landing">

          <HeaderLanding />

          {/* HERO */}

          <div className="hero">

            <div className="hero-left">

              <h1>
                El futuro del soporte técnico comienza con
                <br />
                <span>Inteligencia Artificial</span>
              </h1>

              <p>
                Gestiona solicitudes, automatiza respuestas con Inteligencia Artificial
                y mejora tu soporte técnico fácilmente.
              </p>

              <button className="start">
                Comenzar gratis
              </button>

            </div>

            <div className="hero-right">
              <img src={panalIA} alt="Panal preview" />
            </div>

          </div>


          {/* MULTIPLATAFORMA */}

          <div className="platform-section">

            <div className="platform-container">

              <h2 className="platform-heading">
                Accede desde cualquier plataforma
              </h2>

              <p className="platform-title">
                Panal está diseñado como una solución multiplataforma que permite gestionar
                solicitudes de soporte desde diferentes dispositivos. Puede utilizarse
                directamente desde el navegador web, desde dispositivos móviles o instalarse
                como aplicación PWA para trabajar de forma más rápida y continuar operando
                incluso sin conexión a internet.
              </p>

              <div className="platform-cards">


                <div className="platform-card">

                  <div className="platform-icon">
                    <FaMobileAlt />
                  </div>

                  <h3>Acceso web y móvil</h3>

                  <ul>
                    <li>Accede desde cualquier navegador</li>
                    <li>Interfaz optimizada para dispositivos móviles</li>
                    <li>Gestiona solicitudes desde cualquier lugar</li>
                    <li>Actualizaciones en tiempo real</li>
                  </ul>

                </div>


                <div className="platform-card">

                  <div className="platform-icon">
                    <FaDesktop />
                  </div>

                  <h3>Aplicación Instalable</h3>

                  <ul>
                    <li>Instala Panal directamente desde el navegador</li>
                    <li>Experiencia similar a una app nativa</li>
                    <li>Mayor rapidez de acceso</li>
                    <li>Funciona en computadoras y laptops</li>
                  </ul>

                </div>


                <div className="platform-card">

                  <div className="platform-icon">
                    <HiOutlineLightningBolt />
                  </div>

                  <h3>Modo Offline (PWA)</h3>

                  <ul>
                    <li>Funciona incluso sin conexión a internet</li>
                    <li>Guarda cambios localmente</li>
                    <li>Sincroniza datos al reconectarse</li>
                    <li>Ideal para entornos con conexión inestable</li>
                  </ul>

                </div>

              </div>

            </div>

          </div>


          {/* ESTADISTICAS */}

          <div className="stats-section">

            <h2 className="stats-heading">
              Mejora el rendimiento de tu soporte técnico
            </h2>

            <p className="stats-subtitle">
              Con Panal puedes optimizar la gestión de solicitudes, reducir tiempos
              de respuesta y mejorar la eficiencia del equipo de soporte técnico.
            </p>


            <div className="stats-container">


              {/* CARD 1 */}

              <div className="stat-card">

                <div className="stat-gauge">

                  <svg viewBox="0 0 120 120">

                    <circle className="gauge-bg" cx="60" cy="60" r="50" />

                    <circle
                      className="gauge-fill gauge-85"
                      cx="60"
                      cy="60"
                      r="50"
                    />

                  </svg>

                  <span className="gauge-text">85%</span>

                </div>

                <div className="stat-icon">
                  <FaUserClock />
                </div>

                <p>Reducción en el tiempo de respuesta a tickets</p>

              </div>


              {/* CARD 2 */}

              <div className="stat-card">

                <div className="stat-gauge">

                  <svg viewBox="0 0 120 120">

                    <circle className="gauge-bg" cx="60" cy="60" r="50" />

                    <circle
                      className="gauge-fill gauge-92"
                      cx="60"
                      cy="60"
                      r="50"
                    />

                  </svg>

                  <span className="gauge-text">92.5%</span>

                </div>

                <div className="stat-icon">
                  <FaBolt />
                </div>

                <p>Menos carga operativa para el equipo de soporte</p>

              </div>


              {/* CARD 3 */}

              <div className="stat-card">

                <div className="stat-gauge">

                  <svg viewBox="0 0 120 120">

                    <circle className="gauge-bg" cx="60" cy="60" r="50" />

                    <circle
                      className="gauge-fill gauge-75"
                      cx="60"
                      cy="60"
                      r="50"
                    />

                  </svg>

                  <span className="gauge-text">3.5x</span>

                </div>

                <div className="stat-icon">
                  <FaRocket />
                </div>

                <p>Resolución más rápida de incidencias</p>

              </div>


              {/* CARD 4 */}

              <div className="stat-card">

                <div className="stat-gauge">

                  <svg viewBox="0 0 120 120">

                    <circle className="gauge-bg" cx="60" cy="60" r="50" />

                    <circle
                      className="gauge-fill gauge-100"
                      cx="60"
                      cy="60"
                      r="50"
                    />

                  </svg>

                  <span className="gauge-text">24/7</span>

                </div>

                <div className="stat-icon">
                  <FaRobot />
                </div>

                <p>Automatización inteligente disponible 24/7</p>

              </div>


            </div>

          </div>

        {/* CTA FINAL */}

  <div className="cta-section">

    <div className="cta-container">

       <img
      src={squares}
      alt=""
      className="cta-bg"
    />

<img
  src={squares}
  alt=""
  className="cta-bg-right"
/>
    

      <h2 className="cta-title">
  <span className="arrow-left">«</span>
  ¿Listo para optimizar tu soporte técnico?
  <span className="arrow-right">»</span>
</h2>

      <p className="cta-text">
        Comienza a gestionar solicitudes, automatizar respuestas con
        inteligencia artificial y mejorar la eficiencia de tu equipo
        desde una sola plataforma.
      </p>

      <button className="cta-button">
        Crear cuenta gratis
      </button>

    </div>

  </div>


          <FooterLanding />

        </div>

      )
    }

    export default LandingPage