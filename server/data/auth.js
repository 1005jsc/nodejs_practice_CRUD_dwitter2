let users = [
  {
    id: '1',
    username: 'bob',
    password: '$2b$12$MadBe2UG0ZQPSkPowHPEAumLt/o8OpLZ4qBnWtZfpWD1Ih4xscpJi',
    name: 'Bob',
    email: 'bob@gmail.com',
    url: '',
  },
  {
    id: '2',
    username: 'ellie',
    password: '$2b$12$MadBe2UG0ZQPSkPowHPEAumLt/o8OpLZ4qBnWtZfpWD1Ih4xscpJi',
    name: 'Ellie',
    email: 'ellie@gmail.com',
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
  console.log(created);
  users.push(created);
  return created.id;
};

export const findById = async (id) => {
  return users.find((v) => v.id === id);
};
