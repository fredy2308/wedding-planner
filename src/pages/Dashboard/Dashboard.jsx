import React from "react";

function Dashboard() {
  const gruposGuardados = JSON.parse(localStorage.getItem("grupos")) || [];

  const personas = gruposGuardados.flatMap(g => g.personas || []);

  const total = personas.length;
  const confirmados = personas.filter(p => p.confirmado).length;
  const pendientes = total - confirmados;

  const fisicas = gruposGuardados.filter(g => g.invitacion === "fisica").length;
  const digitales = gruposGuardados.filter(g => g.invitacion === "digital").length;

  const styles = {
    page: {
      padding: "25px",
      background: "#f5f7fb",
      minHeight: "100vh",
      fontFamily: "system-ui, sans-serif",
      color: "#111827"
    },

    title: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "20px"
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "15px"
    },

    card: {
      background: "white",
      padding: "16px",
      borderRadius: "14px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
      border: "1px solid #eef0f3"
    },

    label: {
      fontSize: "13px",
      color: "#6b7280",
      marginBottom: "6px"
    },

    value: {
      fontSize: "22px",
      fontWeight: "700"
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Dashboard 💍</h1>

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.label}>Total invitados</div>
          <div style={styles.value}>{total}</div>
        </div>

        <div style={styles.card}>
          <div style={styles.label}>Confirmados</div>
          <div style={styles.value}>{confirmados}</div>
        </div>

        <div style={styles.card}>
          <div style={styles.label}>Pendientes</div>
          <div style={styles.value}>{pendientes}</div>
        </div>

        <div style={styles.card}>
          <div style={styles.label}>Invitaciones físicas</div>
          <div style={styles.value}>{fisicas}</div>
        </div>

        <div style={styles.card}>
          <div style={styles.label}>Invitaciones digitales</div>
          <div style={styles.value}>{digitales}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;