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

export const findByUsername = async (username) => {
  return users.find((v) => v.username === username);
};

export const createUser = async (user) => {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
};
