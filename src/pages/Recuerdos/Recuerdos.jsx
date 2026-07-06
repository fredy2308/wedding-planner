import React from "react";

function Recuerdos() {
  const [refresh, setRefresh] = React.useState(0);

  const grupos = JSON.parse(localStorage.getItem("grupos")) || [];

  // 🔥 personas con recuerdo
  const personasConRecuerdo = grupos.flatMap(grupo =>
    (grupo.personas || [])
      .filter(p => p.recuerdo)
      .map(p => ({
        nombre: p.nombre,
        grupo: grupo.representante,
        familia: grupo.familia,
        confirmado: p.confirmado
      }))
  );

  const total = personasConRecuerdo.length;

  const pendientes = grupos.flatMap(g => g.personas || [])
    .filter(p => p.recuerdo && !p.entregado).length;

  const entregados = grupos.flatMap(g => g.personas || [])
    .filter(p => p.recuerdo && p.entregado).length;

  // 🎁 marcar entregado
  function marcarEntregado(nombre) {
    const nuevosGrupos = grupos.map(grupo => {
      return {
        ...grupo,
        personas: grupo.personas.map(p => {
          if (p.nombre === nombre && p.recuerdo) {
            return {
              ...p,
              entregado: !p.entregado
            };
          }
          return p;
        })
      };
    });

    localStorage.setItem("grupos", JSON.stringify(nuevosGrupos));
    setRefresh(r => r + 1);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎁 Recuerdos</h1>

      {/* ESTADÍSTICAS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <div style={boxStyle}>
          Total: {total}
        </div>
        <div style={boxStyle}>
          Entregados: {entregados}
        </div>
        <div style={boxStyle}>
          Pendientes: {pendientes}
        </div>
      </div>

      {/* LISTA */}
      <div style={{ display: "grid", gap: "10px" }}>
        {personasConRecuerdo.map((p, index) => {
          const grupoOriginal = grupos.find(g =>
            g.personas?.some(per => per.nombre === p.nombre)
          );

          const personaReal = grupoOriginal?.personas.find(per => per.nombre === p.nombre);

          return (
            <div
              key={index}
              style={{
                background: personaReal?.entregado ? "#dcfce7" : "white",
                borderRadius: "12px",
                padding: "15px",
                border: "1px solid #e5e7eb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <strong>{p.nombre}</strong>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  {p.grupo}
                </div>
              </div>

              <button
                onClick={() => marcarEntregado(p.nombre)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  background: personaReal?.entregado ? "#22c55e" : "#f59e0b",
                  color: "white"
                }}
              >
                {personaReal?.entregado ? "Entregado ✔" : "Marcar entrega"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const boxStyle = {
  background: "white",
  padding: "10px 15px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb"
};

export default Recuerdos;