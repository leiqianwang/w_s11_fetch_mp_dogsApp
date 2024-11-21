import React from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import DogForm from './DogForm'
import DogsList from './DogsList'
import { useEffect, useState } from 'react'

export default function App() {
  const [dogs, setDogs] = useState([]);
  const navigate = useNavigate();

  const API_URL = 'http://localhost:3003/api/dogs';

  useEffect(() => {
    fetchDogs();
  }, [])

  const fetchDogs = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched dogs:', data); // Add this to debug
        setDogs(data);
      })
      .catch(err => console.error('Error fetching dogs:', err))
  };

  const addDog = (newDog) => {
    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(newDog),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(() => fetchDogs())
    .catch(err => console.error('Error adding dog:', err))
  }

  const updateDog = (id, updatedDog) => {
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedDog)
    })
    .then(() => {
      fetchDogs();
      navigate('/');
    })
    .catch(err => console.error('Error updating dog:', err))
  }

  const deleteDog = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
    .then(() => fetchDogs())
    .catch(err => console.error('Error deleting dog:', err))
  }

  return (
    <div>
      <nav>
        <NavLink to="/">Dogs</NavLink>
        <NavLink to="/form">Form</NavLink>
      </nav>
      <Routes>
        <Route 
          path="/" 
          element={
            <DogsList 
              dogs={dogs} 
              onDelete={deleteDog}
            />
          } 
        />
        <Route 
          path="/form" 
          element={<DogForm onSubmit={addDog} />} 
        />
        <Route 
          path="/dogs/edit/:id" 
          element={
            <DogForm 
              dog={dogs.find(dog => dog.id === Number(window.location.pathname.split('/').pop()))}
              onSubmit={(values) => updateDog(values.id, values)} 
            />
          } 
        />
      </Routes>
    </div>
  )
}