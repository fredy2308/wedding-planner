import React from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Grupos from "./pages/Grupos/Grupos";

function App() {
  const [page, setPage] = React.useState("dashboard");

  // 👇 Invitados
  const invitados = [
    { nombre: "Loyda", familia: "Leo", confirmado: false },
    { nombre: "Jose", familia: "Leo", confirmado: true },
    { nombre: "Judith", familia: "Leo", confirmado: false },
    { nombre: "Wilberth", familia: "Leo", confirmado: false },
    { nombre: "Rubi", familia: "Leo", confirmado: true }
  ];

  // 👇 Stats
  const stats = {
    fisicas: 18,
    digitales: 8,
    recuerdos: 30
  };

  const total = invitados.length;
  const confirmados = invitados.filter(i => i.confirmado).length;
  const pendientes = total - confirmados;

  function getCountdown() {
    const weddingDate = new Date("2027-03-13");
    const now = new Date();
    const diff = weddingDate - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `⏳ Faltan ${days} días`;
  }

  function renderPage() {
    if (page === "dashboard") {
      return (
        <>
          <h1 style={styles.title}>Dashboard</h1>
          <p style={styles.subtitle}>Organización de la boda</p>

          <div style={styles.cards}>
            <div style={styles.card}>
              <h3>Total invitados</h3>
              <p>{total}</p>
            </div>

            <div style={styles.card}>
              <h3>Confirmados</h3>
              <p>{confirmados}</p>
            </div>

            <div style={styles.card}>
              <h3>Pendientes</h3>
              <p>{pendientes}</p>
            </div>

            <div style={styles.card}>
              <h3>Invitaciones físicas</h3>
              <p>{stats.fisicas}</p>
            </div>

            <div style={styles.card}>
              <h3>Invitaciones digitales</h3>
              <p>{stats.digitales}</p>
            </div>

            <div style={styles.card}>
              <h3>Recuerdos</h3>
              <p>{stats.recuerdos}</p>
            </div>
          </div>
        </>
      );
    }

    if (page === "grupos") {
      return <Grupos />;
    }

    if (page === "invitados") {
      return (
        <>
          <h1 style={styles.title}>Invitados 👥</h1>

          <div style={styles.table}>
            {invitados.map((i, index) => (
              <div key={index} style={styles.row}>
                <span>{i.nombre}</span>
                <span>{i.familia}</span>

                <button
                  onClick={() => {
                    invitados[index].confirmado = !invitados[index].confirmado;
                    window.location.reload();
                  }}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    background: i.confirmado ? "green" : "#ccc",
                    color: "white"
                  }}
                >
                  {i.confirmado ? "Confirmado" : "Pendiente"}
                </button>
              </div>
            ))}
          </div>
        </>
      );
    }

if (page === "invitaciones") {

  const gruposGuardados = JSON.parse(localStorage.getItem("grupos")) || [];

  const totalFisicas = gruposGuardados.filter(g => g.invitacion === "fisica").length;
  const totalDigitales = gruposGuardados.filter(g => g.invitacion === "digital").length;

  return (
    <>
      <h1 style={styles.title}>Invitaciones 💌</h1>

      <div style={styles.card}>
        <h3>Físicas</h3>
        <p>{totalFisicas}</p>
      </div>

      <div style={styles.card}>
        <h3>Digitales</h3>
        <p>{totalDigitales}</p>
      </div>
    </>
  );
}

    if (page === "mesas") {
      return <h1 style={styles.title}>Mesas 🪑 (en construcción)</h1>;
    }

    if (page === "recuerdos") {
      return <h1 style={styles.title}>Recuerdos 🎁 (en construcción)</h1>;
    }

    if (page === "config") {
      return <h1 style={styles.title}>Configuración ⚙ (en construcción)</h1>;
    }

    return null;
  }

  return (
    <div style={styles.page}>
      <div style={styles.florLayerTop}></div>
      <div style={styles.florLayerBottom}></div>

      <Sidebar page={page} setPage={setPage} />

      <div style={styles.main}>
        <div style={styles.header}>
          <div style={styles.names}>
            Leonardo <span style={styles.heart}>❤</span> Gema
          </div>

          <div style={styles.weddingInfo}>
            <div>📅 13 de marzo de 2027</div>
            <div>{getCountdown()}</div>
          </div>
        </div>

        {renderPage()}
      </div>
    </div>
  );
}

const styles = {
  page: {
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    fontFamily: "'Segoe UI', sans-serif",
    background: "#f7f3ef"
  },
  main: { flex: 1, padding: "30px" },
  header: {
    marginBottom: "25px",
    padding: "18px",
    background: "rgba(255,255,255,0.8)",
    borderRadius: "15px"
  },
  names: { fontSize: "32px", fontFamily: "cursive", marginBottom: "10px" },
  heart: { color: "#c77d7d" },
  weddingInfo: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px"
  },
  title: { fontSize: "28px", marginBottom: "15px" },
  subtitle: { color: "#666" },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px"
  },
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },
  table: {
    background: "white",
    padding: "10px",
    borderRadius: "10px"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px",
    borderBottom: "1px solid #eee"
  },
  florLayerTop: {},
  florLayerBottom: {}
};

export default App;