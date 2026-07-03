function Sidebar({ page, setPage }) {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>💍 Leo & Gema</h2>

      <div style={styles.menu}>

        <button
          style={styles.button}
          onClick={() => setPage("dashboard")}
        >
          📊 Dashboard
        </button>

        <button
          style={styles.button}
          onClick={() => setPage("grupos")}
        >
          👨‍👩‍👧‍👦 Grupos
        </button>

        <button
          style={styles.button}
          onClick={() => setPage("invitaciones")}
        >
          💌 Invitaciones
        </button>

        <button
          style={styles.button}
          onClick={() => setPage("mesas")}
        >
          🪑 Mesas
        </button>

        <button
          style={styles.button}
          onClick={() => setPage("recuerdos")}
        >
          🎁 Recuerdos
        </button>

        <button
          style={styles.button}
          onClick={() => setPage("config")}
        >
          ⚙ Configuración
        </button>

      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "260px",
    background: "#1f2937",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column"
  },

  logo: {
    marginBottom: "30px",
    textAlign: "center"
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  button: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#374151",
    color: "white",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "15px"
  }
};

export default Sidebar;