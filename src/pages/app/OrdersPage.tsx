import { useEffect } from "react"
import { Page } from "../../templates"

import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import Inventory2Icon from "@mui/icons-material/Inventory2"

import "./OrdersPage.css"

const OrdersPage: React.FC = () => {

  useEffect(() => {
    document.title = "Panal — Órdenes de servicio"
  }, [])

  return (

    <Page>

      {/* HEADER */}

     {/* HEADER */}

<div className="orders-header">

  <h2 className="orders-title">
    <Inventory2Icon className="orders-title-icon"/>
    Gestión de Órdenes
  </h2>

</div>

{/* FILTROS */}

<div className="orders-toolbar">

  <div className="orders-filters">

    <div className="orders-search-container">
      <SearchIcon className="orders-search-icon"/>
      <input
        type="text"
        placeholder="Buscar por cliente o ticket"
        className="orders-search"
      />
    </div>

    <select className="orders-select">
      <option>Todos los estados</option>
      <option>Pendiente</option>
      <option>En proceso</option>
      <option>Completado</option>
    </select>

    <span className="orders-order-label">Ordenar por:</span>

    <select className="orders-select">
      <option>A → Z</option>
      <option>Z → A</option>
    </select>

  </div>

  <button className="orders-create-btn">
    <AddIcon />
    Crear orden
  </button>

</div>      {/* TABLA */}

      <div className="orders-table">

        <div className="orders-table-header">

          <div>ID</div>
          <div>Ticket</div>
          <div>Técnico</div>
          <div>Estado</div>
          <div>Fecha</div>
          <div>Acciones</div>

        </div>

        <div className="orders-table-row loading">

          Cargando órdenes...

        </div>

      </div>

    </Page>

  )
}

export default OrdersPage