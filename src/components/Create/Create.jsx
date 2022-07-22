import React, { useState } from 'react';
import s from './Create.module.css';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { motion } from 'framer-motion';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '200px',
    opacity: 1,
  },
};

const Create = ({ id, close, users }) => {
  const [newUser, setNewUser] = useState({
    nombre: '',
    nit: '',
    razonSocial: '',
    codigo: '',
    telefono: '',
  });

  const handleChange = e => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(newUser);
    await addDoc(collection(db, 'Users'), {
      nombre: newUser.nombre,
      razonSocial: newUser.razonSocial,
      nit: newUser.nit * 1,
      codigo: newUser.codigo,
      telefono: newUser.telefono * 1,
    });
    users.push(newUser);
    setNewUser({
      nombre: '',
      nit: '',
      razonSocial: '',
      codigo: '',
      telefono: '',
    });
    close();
  };

  return (
    <motion.div
      layoutId={id}
      className={s.backdrop}
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.form className={s.modal} variants={modal} onSubmit={handleSubmit}>
        <motion.button onClick={() => close()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g>
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z" />
            </g>
          </svg>
        </motion.button>
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
          placeholder="Ingrese la Razon Social..."
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
        <motion.input
          type="submit"
          value="Guardar"
          className={s.btn}
          whileHover={{ scale: 0.95 }}
        />
      </motion.form>
    </motion.div>
  );
};

export default Create;
