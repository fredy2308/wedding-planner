import React from "react";

function Mesas() {
  // Crear 10 mesas con 10 sillas
  const inicialMesas = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    nombre: `Mesa ${i + 1}`,
    sillas: Array.from({ length: 10 }, () => null)
  }));

  const [mesas, setMesas] = React.useState(() => {
    const guardado = localStorage.getItem("mesas");
    return guardado ? JSON.parse(guardado) : inicialMesas;
  });

  // Persona seleccionada
  const [personaSeleccionada, setPersonaSeleccionada] = React.useState(null);

  React.useEffect(() => {
    localStorage.setItem("mesas", JSON.stringify(mesas));
  }, [mesas]);

  // Traer invitados
  const grupos = JSON.parse(localStorage.getItem("grupos")) || [];

  const personas = grupos.flatMap(g =>
    (g.personas || []).map(p => ({
      id: `${g.id}-${p.nombre}`,
      nombre: p.nombre,
      grupo: g.representante
    }))
  );

  // Saber quién ya está sentado
  const personasSentadas = mesas.flatMap(m =>
    m.sillas.filter(Boolean).map(s => s.id)
  );

  // Personas disponibles
  const personasDisponibles = personas.filter(
    p => !personasSentadas.includes(p.id)
  );

  // Asignar persona
  function asignarPersona(mesaId, sillaIndex) {
    if (!personaSeleccionada) {
      alert("Primero selecciona un invitado.");
      return;
    }

    setMesas(prev =>
      prev.map(m =>
        m.id === mesaId
          ? {
              ...m,
              sillas: m.sillas.map((s, i) =>
                i === sillaIndex ? personaSeleccionada : s
              )
            }
          : m
      )
    );

    setPersonaSeleccionada(null);
  }

  // Quitar persona
  function quitarPersona(mesaId, sillaIndex) {
    setMesas(prev =>
      prev.map(m =>
        m.id === mesaId
          ? {
              ...m,
              sillas: m.sillas.map((s, i) =>
                i === sillaIndex ? null : s
              )
            }
          : m
      )
    );
  }

  return (
  <div
  style={{
    padding: "20px",
    maxWidth: "1400px",
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box"
  }}
>
      <h1
  style={{
    color: "#111827",
    marginBottom: "20px",
    fontSize: "30px",
    fontWeight: "700"
  }}
>
  🪑 Organización de Mesas
</h1>

      <h3>
        Invitado seleccionado:{" "}
        <span style={{ color: "#2563eb" }}>
          {personaSeleccionada
            ? personaSeleccionada.nombre
            : "Ninguno"}
        </span>
      </h3>

      {/* LISTA DE INVITADOS */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 25
        }}
      >
        {personasDisponibles.map(persona => (
          <button
            key={persona.id}
            onClick={() => setPersonaSeleccionada(persona)}
style={{
  padding: "8px 12px",
  borderRadius: 10,
  border:
    personaSeleccionada?.id === persona.id
      ? "2px solid #2563eb"
      : "1px solid #ddd",
  background:
    personaSeleccionada?.id === persona.id
      ? "#dbeafe"
      : "#ffffff",
  color:
    personaSeleccionada?.id === persona.id
      ? "#1d4ed8"
      : "#111827",
  fontWeight: "600",
  cursor: "pointer"
}}
          >
            {persona.nombre}
          </button>
        ))}
      </div>

      {/* MESAS */}
      <div
        style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  gap: 20
}}
      >
        {mesas.map(mesa => (
          <div
            key={mesa.id}
            style={{
              background: "white",
              borderRadius: 15,
              padding: 10,
              boxShadow: "0 3px 8px rgba(0,0,0,.08)"
            }}
          >
            <h3
  style={{
    textAlign: "center",
    color: "#111827",
    fontSize: "17px",
    marginBottom: "10px"
  }}
>{mesa.nombre}</h3>

            {mesa.sillas.map((silla, index) => (
              <div
                key={index}
                onClick={() => {
                  if (silla) {
                    quitarPersona(mesa.id, index);
                  } else {
                    asignarPersona(mesa.id, index);
                  }
                }}
                style={{
  padding: "6px",
  marginBottom: 6,
  borderRadius: 8,
  cursor: "pointer",
  textAlign: "center",
  background: silla ? "#dcfce7" : "#ffffff",
  color: silla ? "#166534" : "#111827",
  fontWeight: "500",
  fontSize: "12px",
  border: "1px solid #ddd",
  minHeight: 28
}}
              >
                {silla ? `👤 ${silla.nombre}` : "🪑 Vacía"}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mesas;