import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

const App = ()=> {
  const [users, setUsers] = useState([]);
  const [things, setThings] = useState([]);

  useEffect(() => {
    const fetchUsers = async() => {
      const response = await axios.get('/api/users'); 
      setUsers(response.data);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchThings = async() => {
      const response = await axios.get('/api/things'); 
      setThings(response.data);
    }
    fetchThings();
  }, []);

  return (
    <div>
      <h1>Thing Tracker</h1>
      <main>
        <div>
          <h2>Users ( {users.length} )</h2>
          <ul>
            {
              users.map( user => {
                const usersThings = things.filter(thing => thing.user_id === user.id)
                return (
                  <li key={user.id}>
                    {user.name}
                    ({usersThings.length})
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div>
        <h2>Things ( {things.length} )</h2>
        <ul>
          {
            things.map( thing => {
              return (
                <li key={thing.id}>
                  {thing.name}
                  <ul>
                    {
                      users.map( user => {
                        return (
                          <li key={user.id} className={ thing.user_id === user.id ? 'owner': ''}>
                            {user.name}
                          </li>
                        )
                      })
                    }
                  </ul>
                </li>
              )
            })
          }
        </ul>
        </div>
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
