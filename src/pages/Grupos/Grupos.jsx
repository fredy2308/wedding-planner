import React from "react";
import gruposData from "../../data/grupos";

function Grupos() {
  const [grupos, setGrupos] = React.useState(() => {
    const guardado = localStorage.getItem("grupos");
   return guardado
  ? JSON.parse(guardado).map(g => ({
      ...g,
      invitacion: g.invitacion ?? "fisica",
      personas: g.personas.map(p =>
        typeof p === "string"
          ? { nombre: p, confirmado: false }
          : p
      )
    }))
  : gruposData.map(g => ({
      ...g,
      personas: g.personas.map(p =>
        typeof p === "string"
          ? { nombre: p, confirmado: false }
          : p
      )
    }));
  });

  React.useEffect(() => {
    localStorage.setItem("grupos", JSON.stringify(grupos));
  }, [grupos]);

  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState(null);

  function updateGrupo(cambios) {
    if (!selected) return;

    setGrupos(prev =>
      prev.map(g =>
        g.id === selected.id ? { ...g, ...cambios } : g
      )
    );

    setSelected(prev => (prev ? { ...prev, ...cambios } : prev));
  }

  const filtrados = grupos.filter(g =>
    g.representante.toLowerCase().includes(search.toLowerCase()) ||
    g.familia.toLowerCase().includes(search.toLowerCase())
  );

  const styles = {
    page: {
      padding: "25px",
      background: "#f5f7fb",
      minHeight: "100vh",
      color: "#1f2937",
      fontFamily: "system-ui, sans-serif"
    },

    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px"
    },

    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#111827"
    },

    buttonPrimary: {
      padding: "10px 16px",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      color: "white",
      fontWeight: "600",
      boxShadow: "0 8px 20px rgba(99,102,241,0.25)",
      transition: "0.2s"
    },

    search: {
      width: "100%",
      padding: "12px 14px",
      marginBottom: "20px",
      borderRadius: "12px",
      border: "1px solid #e5e7eb",
      background: "white",
      outline: "none",
      fontSize: "14px"
    },

    grid: {
      display: "grid",
      gap: "14px"
    },

    card: {
      background: "white",
      padding: "16px",
      borderRadius: "14px",
      border: "1px solid #eef0f3",
      boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
      cursor: "pointer",
      transition: "0.2s"
    },

    name: {
      margin: 0,
      fontSize: "18px",
      fontWeight: "700",
      color: "#111827"
    },

   subtitle: {
  margin: "6px 0",
  color: "#4b5563",
  fontSize: "13px"
},

    panel: {
      position: "fixed",
      right: 0,
      top: 0,
      width: "380px",
      height: "100vh",
      background: "#ffffff",
      boxShadow: "-10px 0 30px rgba(0,0,0,0.12)",
      padding: "22px",
      borderTopLeftRadius: "18px",
      borderBottomLeftRadius: "18px"
    },

    closeBtn: {
      background: "#f43f5e",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "600"
    },

    input: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "10px",
      border: "1px solid #e5e7eb",
      marginBottom: "10px",
      outline: "none",
      fontSize: "14px",
      background: "#fafafa",
      color: "#111827"
    },

    smallBtn: {
      padding: "8px 12px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      background: "linear-gradient(135deg, #10b981, #059669)",
      color: "white",
      fontWeight: "600"
    },

    dangerBtn: {
      padding: "8px 10px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      background: "#ef4444",
      color: "white",
      fontWeight: "600"
    }
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>👨‍👩‍👧‍👦 Grupos</h1>

        <button
          style={styles.buttonPrimary}
          onClick={() => {
            const nuevoGrupo = {
  id: Date.now(),
  representante: "Nuevo grupo",
  familia: "Sin familia",
  lado: "Leo",
  personas: [
  { nombre: "Persona 1", confirmado: false }
],
  invitacion: "fisica"
};

            setGrupos(prev => [...prev, nuevoGrupo]);
            setSelected(nuevoGrupo);
          }}
        >
          ➕ Nuevo grupo
        </button>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Buscar grupo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* LISTA */}
      <div style={styles.grid}>
        {filtrados.map(grupo => (
          <div
            key={grupo.id}
            onClick={() => setSelected(grupo)}
            style={styles.card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-3px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <h2 style={styles.name}>{grupo.representante}</h2>
            <p style={styles.subtitle}>
              {grupo.familia} • {grupo.lado}
            </p>
            <p style={{ margin: 0, fontSize: "12px", color: "#374151" }}>
  🎟️ Invitación: {grupo.invitacion}
</p>
            <p style={{ margin: 0, fontSize: "12px", color: "#374151" }}>
              👥 {grupo.personas.length} personas
            </p>
          </div>
        ))}
      </div>

      {/* PANEL */}
      {selected && (
        <div style={styles.panel}>
          <button
            style={styles.closeBtn}
            onClick={() => setSelected(null)}
          >
            ✕ Cerrar
          </button>

          <input
            value={selected.representante}
            onChange={(e) =>
              updateGrupo({ representante: e.target.value })
            }
            style={{
              ...styles.input,
              fontSize: "16px",
              fontWeight: "600"
            }}
          />

          <p style={{ color: "#4b5563" }}>{selected.familia}</p>
<p style={{ color: "#4b5563" }}>Lado: {selected.lado}</p>
          <h4 style={{ marginTop: "15px", color: "#111827" }}>
  Tipo de invitación
</h4>

<div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>

  <button
    onClick={() => updateGrupo({ invitacion: "fisica" })}
    style={{
      flex: 1,
      padding: "10px",
      borderRadius: "10px",
      border: "1px solid #d1d5db",
      cursor: "pointer",
      background: selected.invitacion === "fisica" ? "#dbeafe" : "#ffffff",
      color: selected.invitacion === "fisica" ? "#1d4ed8" : "#374151",
      fontWeight: "600"
    }}
  >
    📩 Física
  </button>

  <button
    onClick={() => updateGrupo({ invitacion: "digital" })}
    style={{
      flex: 1,
      padding: "10px",
      borderRadius: "10px",
      border: "1px solid #d1d5db",
      cursor: "pointer",
      background: selected.invitacion === "digital" ? "#dcfce7" : "#ffffff",
      color: selected.invitacion === "digital" ? "#15803d" : "#374151",
      fontWeight: "600"
    }}
  >
    💻 Digital
  </button>

</div>

          <h4 style={{ marginTop: "15px", color: "#111827" }}>
            Personas
          </h4>

          {selected.personas.map((p, i) => (
  <div
    key={i}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "10px",
      padding: "8px",
      borderRadius: "10px",
      background: p.confirmado ? "#dcfce7" : "#ffffff",
border: p.confirmado ? "1px solid #86efac" : "1px solid #e5e7eb"
    }}
  >
    {/* CHECK */}
    <input
      type="checkbox"
      checked={p.confirmado}
      onChange={() => {
        const nuevas = [...selected.personas];
        nuevas[i] = {
          ...nuevas[i],
          confirmado: !nuevas[i].confirmado
        };
        updateGrupo({ personas: nuevas });
      }}
    />

    {/* NOMBRE */}
    <span
      style={{
        flex: 1,
        textDecoration: "none",
        color: p.confirmado ? "#166534" : "#111827",
fontWeight: "500"
      }}
    >
      {p.nombre}
    </span>

    {/* BOTÓN ELIMINAR */}
    <button
      style={styles.dangerBtn}
      onClick={() => {
        const nuevas = selected.personas.filter(
          (_, index) => index !== i
        );
        updateGrupo({ personas: nuevas });
      }}
    >
      ✕
    </button>
  </div>
))}

          <button
            style={{ ...styles.smallBtn, width: "100%", marginTop: "10px" }}
            onClick={() => {
              updateGrupo({
                personas: [...selected.personas, {
  nombre: "Nueva persona",
  confirmado: false
}]
              });
            }}
          >
            ➕ Agregar persona
          </button>
        </div>
      )}
    </div>
  );
}

export default Grupos;