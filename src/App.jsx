import React from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Grupos from "./pages/Grupos/Grupos";
import Mesas from "./pages/Mesas/Mesas";
import Recuerdos from "./pages/Recuerdos/Recuerdos";
function App() {
  const [page, setPage] = React.useState("dashboard");
  const [refresh, setRefresh] = React.useState(0);

  // 👇 Invitados
 const gruposGuardados = JSON.parse(localStorage.getItem("grupos")) || [];

// todas las personas
const todasLasPersonas = gruposGuardados.flatMap(g => g.personas || []);

// total
const total = todasLasPersonas.length;

// confirmados
const confirmados = todasLasPersonas.filter(p => p.confirmado).length;

// pendientes
const pendientes = total - confirmados;

// invitaciones
const totalFisicas = gruposGuardados.filter(g => g.invitacion === "fisica").length;
const totalDigitales = gruposGuardados.filter(g => g.invitacion === "digital").length;
const totalRecuerdos = todasLasPersonas.filter(
  p => p.recuerdo
).length;
React.useEffect(() => {
  const interval = setInterval(() => {
    setRefresh(r => r + 1);
  }, 500);

  return () => clearInterval(interval);
}, []);

  function getCountdown() {
    const weddingDate = new Date("2027-03-13");
    const now = new Date();
    const diff = weddingDate - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `⏳ Faltan ${days} días`;
  }

  function renderPage() {
    if (page === "dashboard") {
  return <Dashboard />;
}

    if (page === "grupos") {
      return <Grupos />;
    }
if (page === "mesas") {
  return <Mesas />;
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

       if (page === "recuerdos") {
  return <Recuerdos />;
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

    <Sidebar
      page={page}
      setPage={setPage}
      totalRecuerdos={totalRecuerdos}
    />

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
  width: "100%",
    minHeight: "100vh",
    display: "flex",
    fontFamily: "'Segoe UI', sans-serif",
    background: "#f7f3ef"
  },
  main: {
  flex: 1,
  padding: "30px",
  minWidth: 0,
  overflowX: "hidden",
  overflowY: "auto"
},
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