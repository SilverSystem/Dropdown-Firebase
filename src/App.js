import s from './App.module.css';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, getDocs } from 'firebase/firestore';
import { store } from './firebase';
import { mockup } from './mockup';
import attributes from './helpers/attributes';

function App() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [searchedUser, setSearchedUser] = useState('');
  const [attributeIndex, setAttributeIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  const search = e => {
    e.preventDefault();
    if (!searchedUser) {
      setUsers(mockup);
      return setShowUsers(true);
    }
    const filteredUsers = attributes[attributeIndex].filterSearch(
      users,
      searchedUser
    );
    setUsers(filteredUsers);
    setShowUsers(true);
  };

  const handleSearch = e => {
    if (!e.target.value) {
      setUsers(mockup);
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

  // useEffect(() => {
  //   console.log('Me ejecuto');
  //   const items = async () => {
  //     const connect = query(collection(store, 'Users'));
  //     const data = await getDocs(connect);
  //     const inv = [];
  //     data.forEach(el => {
  //       inv.push({ ...el.data() });
  //     });
  //     setUsers(inv);
  //   };
  //   items();
  // }, []);

  // useEffect(() => {
  //   setUsers(mockup);
  // }, []);
  //console.log(users);

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
          {users.map(u => (
            <motion.h3
              layoutId={u.id}
              key={u.id}
              onClick={() => setSelectedId(u.id)}
            >
              {u.nombre}
            </motion.h3>
          ))}
        </div>
      )}
      {/* <AnimatePresence>
          {selectedId && (
            <motion.div layoutId={selectedId}>
              <motion.h5>{item.subtitle}</motion.h5>
              <motion.h2>{item.title}</motion.h2>
              <motion.button onClick={() => setSelectedId(null)} />
            </motion.div>
          )}
        </AnimatePresence> */}
    </motion.div>
  );
}

export default App;

// const [selectedId, setSelectedId] = useState(null)

// {items.map(item => (
//   <motion.div layoutId={item.id} onClick={() => setSelectedId(item.id)}>
//     <motion.h5>{item.subtitle}</motion.h5>
//     <motion.h2>{item.title}</motion.h2>
//   </motion.div>
// ))}

// <AnimatePresence>
//   {selectedId && (
//     <motion.div layoutId={selectedId}>
//       <motion.h5>{item.subtitle}</motion.h5>
//       <motion.h2>{item.title}</motion.h2>
//       <motion.button onClick={() => setSelectedId(null)} />
//     </motion.div>
//   )}
// </AnimatePresence>
