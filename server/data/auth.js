let users = [
  {
    id: '1',
    username: 'bob',
    password: '1234',
    name: 'Bob',
    email: 'bob@gmail.com',
    url: '',
  },
];

export const getAllUsers = async () => {
  return users;
};

export const findByUsername = async (username) => {
  return users.find((v) => v.username === username);
};

export const createUser = async (user) => {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
};

export const findById = async (id) => {
  return users.find((v) => v.id === id);
};
