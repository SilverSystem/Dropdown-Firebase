const attributes = [
  {
    value: 'nombre',
    filterSearch: (users, searchedValue) => {
      return users.filter(u =>
        u.nombre.toLowerCase().includes(searchedValue.toLowerCase())
      );
    },
  },
  {
    value: 'razon Social',
    filterSearch: (users, searchedValue) => {
      return users.filter(u =>
        u.razonSocial.toLowerCase().includes(searchedValue.toLowerCase())
      );
    },
  },
  {
    value: 'nit',
    filterSearch: (users, searchedValue) => {
      return users.filter(u => (u.nit + '').includes(searchedValue));
    },
  },
  {
    value: 'telefono',
    filterSearch: (users, searchedValue) => {
      return users.filter(u => (u.telefono + '').includes(searchedValue));
    },
  },
  {
    value: 'codigo',
    filterSearch: (users, searchedValue) => {
      return users.filter(u => u.codigo.includes(searchedValue));
    },
  },
];

export default attributes;
