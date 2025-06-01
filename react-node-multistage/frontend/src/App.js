import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    .then(() => {
      setName('');
      fetchUsers();
    })
    .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>User Directory - Powered by MySQL</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required
        />
        <button type="submit">Add User</button>
      </form>
      <ul>
        {users.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
