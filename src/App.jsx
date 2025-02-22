import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [mascotas, setMascotas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");

  // Obtener la lista de mascotas al cargar la aplicación
  useEffect(() => {
    fetchMascotas();
  }, []);

  const fetchMascotas = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/mascotas");
      setMascotas(response.data);
    } catch (error) {
      console.error("Error fetching mascotas:", error);
    }
  };

  const agregarMascota = async () => {
    if (!nombre) {
      alert("El nombre es obligatorio");
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:5000/mascotas", {
        nombre,
        raza,
        edad,
      });
      setMascotas([...mascotas, response.data]);
      setNombre("");
      setRaza("");
      setEdad("");
    } catch (error) {
      console.error("Error agregando mascota:", error);
    }
  };

  const eliminarMascota = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/mascotas/${id}`);
      setMascotas(mascotas.filter((mascota) => mascota.id !== id));
    } catch (error) {
      console.error("Error eliminando mascota:", error);
    }
  };

  return (
    <div className="container">
      <h1>Lista de Mascotas</h1>

      {/* Formulario para agregar mascotas */}
      <div className="card">
        <h2>Agregar Mascota</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Raza"
            value={raza}
            onChange={(e) => setRaza(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
          />
        </div>
        <button className="button" onClick={agregarMascota}>
          <i className="fas fa-plus icon"></i> Agregar
        </button>
      </div>

      {/* Lista de mascotas */}
      <div className="card">
        <h2>Mascotas Registradas</h2>
        <ul className="mascota-list">
          {mascotas.map((mascota) => (
            <li key={mascota.id} className="mascota-item">
              <div>
                <p>{mascota.nombre}</p>
                <p>
                  {mascota.raza} - {mascota.edad} años
                </p>
              </div>
              <button onClick={() => eliminarMascota(mascota.id)}>
                <i className="fas fa-trash icon"></i> Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;