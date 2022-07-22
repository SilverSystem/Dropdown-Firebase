import React, { useState } from 'react';
import { motion } from 'framer-motion';
const Create = () => {
  const [newUser, setNewUser] = useState({
    nombre: '',
    nit: 0,
    razonSocial: '',
    codigo: '',
    telefono: 0,
  });

  const handleChange = e => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="nombre"
          placeholder="Ingrese el Nombre..."
          value={newUser.nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nit"
          placeholder="Ingrese el Nit..."
          value={newUser.nit}
          onChange={handleChange}
        />
        <input
          type="text"
          name="razonSocial"
          placeholder="Ingrese el Razon Social..."
          value={newUser.razonSocial}
          onChange={handleChange}
        />
        <input
          type="text"
          name="codigo"
          placeholder="Ingrese el Codigo..."
          value={newUser.codigo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="telefono"
          placeholder="Ingrese el Telefono..."
          value={newUser.telefono}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Create;
