import HeaderLanding from "../../../components/landing/HeaderLanding"
import FooterLanding from "../../../components/landing/FooterLanding"
import "./AboutPage.css"
import { NavLink } from "react-router-dom"


import jona from "../../../assets/images/1jona.png"
import jose from "../../../assets/images/2jose.png"
import merli from "../../../assets/images/1merli.png"
import ponce from "../../../assets/images/1ponce.png"

import { useEffect } from "react"

const AboutPage = () => {

   useEffect(() => {
      document.title = "Quiénes somos"
    }, [])


  return (
    <div>

      <HeaderLanding />

      {/* RECTÁNGULO 1 */}

      <section className="about-section">

        <div className="about-container about-container-intro">

          <h1 className="about-title">
            Sobre Panal
          </h1>

          <p className="about-intro">
            Somos estudiantes de la Universidad Tecnológica de Tijuana,
            actualmente cursando el décimo cuatrimestre de la carrera
            Ingeniería en Desarrollo y Gestión de Software.

            Panal surge como un proyecto integrador donde aplicamos
            conocimientos en arquitectura de sistemas, desarrollo web,
            aplicaciones móviles y diseño de experiencia de usuario.

            Nuestro objetivo es crear una plataforma SaaS moderna que
            permita a las organizaciones gestionar su soporte técnico
            de manera más eficiente mediante automatización,
            inteligencia artificial y herramientas multiplataforma.
          </p>

        </div>

      </section>



      {/* RECTÁNGULO 2 */}

      <section className="about-section">

        <div className="about-container about-container-philosophy">

          <h2 className="about-title2">
            Nuestra filosofía
          </h2>

          <p className="mission-intro">
            Panal representa nuestra visión de cómo la tecnología puede
            mejorar los procesos de soporte técnico dentro de las
            organizaciones. Nuestro enfoque combina innovación,
            colaboración y desarrollo tecnológico para construir
            soluciones eficientes.
          </p>

          <div className="mission-grid">

            <div className="mission-card">
              <h3>Misión</h3>
              <p>
                Desarrollar una plataforma SaaS que permita gestionar
                solicitudes de soporte técnico de manera eficiente,
                centralizando información y automatizando procesos.
              </p>
            </div>

            <div className="mission-card">
              <h3>Visión</h3>
              <p>
                Convertir a Panal en una solución tecnológica innovadora
                que integre inteligencia artificial y herramientas
                multiplataforma para optimizar la gestión del soporte
                técnico.
              </p>
            </div>

            <div className="mission-card">
              <h3>Objetivo</h3>
              <p>
                Diseñar un sistema que permita registrar, administrar
                y dar seguimiento a solicitudes técnicas mejorando
                la eficiencia de los equipos de soporte.
              </p>
            </div>

            <div className="mission-card">
              <h3>Valores</h3>
              <p>
                Innovación, trabajo en equipo, responsabilidad
                profesional y compromiso con la calidad.
              </p>
            </div>

          </div>

        </div>

      </section>



      {/* RECTÁNGULO 3 */}

      <section className="about-section">

        <div className="about-container2 about-container-team">

          <h2 className="about-title3">
            Nuestro equipo
          </h2>

          <div className="team-grid">


            {/* Jonathan */}

            <div className="team-card">

              <img
                src={jona}
                alt="Jonathan"
                className="team-photo"
              />

              <h3 className="team-name">
                Jonathan Martínez Zavala
              </h3>

              <h4 className="team-role">
                Líder del proyecto · Arquitectura del sistema
              </h4>

              <p className="team-description">
                Responsable del diseño de la arquitectura del sistema, la definición
                del modelo de datos en PostgreSQL y la estructuración de los módulos
                principales de la plataforma. Coordina la organización técnica del
                proyecto y la integración entre frontend, backend y servicios
                internos del sistema.
              </p>

            </div>



            {/* Ponce */}

            <div className="team-card">

              <img
                src={ponce}
                alt="Ponce"
                className="team-photo"
              />

              <h3 className="team-name">
                José de Jesús Ponce Duarte
              </h3>

              <h4 className="team-role">
                Backend · Inteligencia Artificial
              </h4>

              <p className="team-description">
                Responsable del desarrollo del backend utilizando FastAPI, la
                implementación de la API REST y la lógica de negocio del sistema.
                Desarrolla los servicios encargados de la gestión de tickets y la
                integración del agente de inteligencia artificial para análisis,
                clasificación y automatización de procesos operativos.
              </p>

            </div>



            {/* Dulce */}

            <div className="team-card">

              <img
                src={merli}
                alt="Dulce"
                className="team-photo"
              />

              <h3 className="team-name">
                Dulce Mariela Higuera Sanchez
              </h3>


              <h4 className="team-role">
                Frontend Web · PWA
              </h4>

              <p className="team-description">
                Responsable del desarrollo del frontend web utilizando React y Vite,
                implementando los componentes de interfaz y la comunicación con los
                servicios backend mediante API REST. Desarrolla la aplicación
                progresiva (PWA) para habilitar acceso multiplataforma desde
                navegadores modernos.
              </p>

            </div>
            {/* Jose Lopez */}

            <div className="team-card">

              <img
                src={jose}
                alt="Jose"
                className="team-photo team-photo-jose"
              />
              <h3 className="team-name">
                José López Espinoza
              </h3>

              <h4 className="team-role">
                Desarrollo móvil
              </h4>

              <p className="team-description">
                Responsable del desarrollo de la aplicación móvil utilizando Flutter,
                implementando las interfaces y funcionalidades necesarias para la
                gestión operativa desde dispositivos móviles. Integra la aplicación
                con los servicios backend mediante consumo de API REST.
              </p>

            </div>





          </div>
          

        </div>


      </section>
<div className="about-cta">

  <h3 className="about-cta-title">
    Comienza a gestionar tu soporte técnico con Panal
  </h3>

  <p className="about-cta-text">
    Registra tu organización y comienza a administrar tickets,
    inventario y procesos de soporte desde una sola plataforma.
  </p>

  <NavLink to="/login" className="about-cta-button">
  Crear cuenta gratuita
</NavLink>

</div>

      <FooterLanding />

    </div>
  )
}

export default AboutPage