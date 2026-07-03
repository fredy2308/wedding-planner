import React from "react";
import gruposData from "../../data/grupos";

function Grupos() {

  const [grupos, setGrupos] = React.useState(() => {
    const guardado = localStorage.getItem("grupos");
    return guardado ? JSON.parse(guardado) : gruposData;
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
        g.id === selected.id
          ? { ...g, ...cambios }
          : g
      )
    );

    setSelected(prev =>
      prev ? { ...prev, ...cambios } : prev
    );
  }

  const filtrados = grupos.filter(g =>
    g.representante.toLowerCase().includes(search.toLowerCase()) ||
    g.familia.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", color: "#111827" }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <h1>👨‍👩‍👧‍👦 Grupos</h1>

       <button
  onClick={() => {
    const nuevoGrupo = {
      id: Date.now(),
      representante: "Nuevo grupo",
      familia: "Sin familia",
      lado: "Leo",
      personas: ["Persona 1"]
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
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          color: "#111827",
          background: "white"
        }}
      />

      {/* LISTA */}
      <div style={{ display: "grid", gap: "15px" }}>
        {filtrados.map(grupo => (
          <div
            key={grupo.id}
            onClick={() => setSelected(grupo)}
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "12px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              cursor: "pointer",
              color: "#111827"
            }}
          >
            <h2 style={{ margin: 0 }}>
              {grupo.representante}
            </h2>

            <p style={{ margin: "5px 0", color: "#6b7280" }}>
              {grupo.familia} • {grupo.lado}
            </p>

            <p style={{ margin: 0 }}>
              👥 {grupo.personas.length} personas
            </p>
          </div>
        ))}
      </div>

      {/* PANEL */}
      {selected && (
        <div style={{
          position: "fixed",
          right: 0,
          top: 0,
          width: "350px",
          height: "100vh",
          background: "white",
          boxShadow: "-5px 0 15px rgba(0,0,0,0.2)",
          padding: "20px",
          color: "#111827"
        }}>

          <button
            onClick={() => setSelected(null)}
            style={{
              marginBottom: "15px",
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "8px 10px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            ❌ Cerrar
          </button>

          {/* REPRESENTANTE */}
          <input
            value={selected.representante}
            onChange={(e) =>
              updateGrupo({ representante: e.target.value })
            }
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              width: "100%",
              marginBottom: "10px"
            }}
          />

          <p>{selected.familia}</p>
          <p>Lado: {selected.lado}</p>

          <h4>Personas</h4>

          <ul style={{ paddingLeft: 0 }}>
            {selected.personas.map((p, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "8px"
                }}
              >
                <input
                  value={p}
                  onChange={(e) => {
                    const nuevas = [...selected.personas];
                    nuevas[i] = e.target.value;
                    updateGrupo({ personas: nuevas });
                  }}
                  style={{ flex: 1, padding: "5px" }}
                />

                <button
                  onClick={() => {
                    const nuevas = selected.personas.filter((_, index) => index !== i);
                    updateGrupo({ personas: nuevas });
                  }}
                  style={{
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "5px 8px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>

          {/* AGREGAR PERSONA */}
          <button
            onClick={() => {
              updateGrupo({
                personas: [...selected.personas, "Nueva persona"]
              });
            }}
            style={{
              marginTop: "10px",
              padding: "8px 10px",
              border: "none",
              borderRadius: "6px",
              background: "#111827",
              color: "white",
              cursor: "pointer"
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