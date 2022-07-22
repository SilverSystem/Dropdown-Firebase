import s from './App.module.css';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  collection,
  query,
  getDocs,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from './firebase';
import attributes from './helpers/attributes';
import Details from './components/Details/Details';
import Create from './components/Create/Create';

function App() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [searchedUser, setSearchedUser] = useState('');
  const [lastVisible, setLastVisible] = useState({});
  const [attributeIndex, setAttributeIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  const search = async e => {
    e.preventDefault();
    if (!searchedUser || users.length === 0) {
      await fillInitialData();
      return setShowUsers(true);
    }
    const filteredUsers = attributes[attributeIndex].filterSearch(
      users,
      searchedUser
    );
    setUsers(filteredUsers);
    setShowUsers(true);
  };

  const handleSearch = async e => {
    if (!e.target.value || users.length === 0) {
      await fillInitialData();
    } else {
      const filteredUsers = attributes[attributeIndex].filterSearch(
        users,
        e.target.value
      );
      setUsers(filteredUsers);
    }
    setSearchedUser(e.target.value);
  };

  const handleAttribute = e => {
    setAttributeIndex(e.target.selectedIndex);
  };

  const paginate = async () => {
    const connect = query(
      collection(db, 'Users'),
      startAfter(lastVisible),
      limit(20)
    );
    const dataSnapshot = await getDocs(connect);
    const inv = dataSnapshot.docs.map(el => el.data());
    setUsers([...users, ...inv]);
    setLastVisible(dataSnapshot[dataSnapshot.docs.length - 1]);
  };

  const fillInitialData = async () => {
    const connect = query(collection(db, 'Users'), limit(20));
    const dataSnapshot = await getDocs(connect);
    const lastVisible = dataSnapshot[dataSnapshot.docs.length - 1];
    const inv = dataSnapshot.docs.map(el => el.data());
    console.log(inv);
    setUsers(inv);
    setLastVisible(lastVisible);
  };

  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      paginate();
    }
  };

  return (
    <motion.div
      className={s.App}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {console.log('render')}
      <form onSubmit={search}>
        <input
          type="text"
          placeholder="Busque aqui..."
          className={s.search}
          value={searchedUser}
          onChange={handleSearch}
        />
        <div
          className={s.icon}
          onClick={e => (showUsers ? setShowUsers(false) : search(e))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-down-fill"
            viewBox="0 0 16 16"
          >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
        </div>
        <select
          name="parameter"
          className={s.select}
          onChange={handleAttribute}
        >
          {attributes.map((a, index) => (
            <option key={index} value={a.value}>
              {a.value.charAt(0).toUpperCase() + a.value.slice(1)}
            </option>
          ))}
        </select>
      </form>
      {showUsers && (
        <div className={s.list}>
          <motion.h3 layoutId={-1} onClick={() => setSelectedId(-1)}>
            Agregar nuevo usuario
          </motion.h3>
          {users.map(u => (
            <motion.h3
              layoutId={u.nit}
              key={u.nit}
              onClick={() => setSelectedId(u.nit)}
            >
              {u.nombre}
            </motion.h3>
          ))}
        </div>
      )}
      <AnimatePresence>
        {selectedId ? (
          selectedId === -1 ? (
            <Create id={-1} close={() => setSelectedId(null)} users={users} />
          ) : (
            <Details
              users={users}
              id={selectedId}
              close={() => setSelectedId(null)}
            />
          )
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export default App;
