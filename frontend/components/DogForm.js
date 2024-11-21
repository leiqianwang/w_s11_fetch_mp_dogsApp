import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const initialForm = { name: '', breed: '', adopted: false }

// Use this form for both POST and PUT requests!
export default function DogForm( {dog, onSubmit}) {
  const [values, setValues] = useState(dog || initialForm)
  const [breeds, setBreeds] = useState([])
  const navigate = useNavigate()


      useEffect(() => {
        // Fetch breeds for dropdown
        fetch('http://localhost:3003/api/dogs/breeds')
        .then(res => res.json())
        .then(data => setBreeds(data.toSorted()))
        .catch(err => console.error('Error fetching breeds:', err))
      }, [])

      useEffect(() => {
          //Update form values when dog prop changes
          if (dog) {
            setValues(dog)
          }
      }, [dog])

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(values)
    setValues(initialForm)
    navigate('/')
  }

  const onChange = (event) => {
    const { name, value, type, checked } = event.target
    setValues({
      ...values, [name]: type === 'checkbox' ? checked : value
    })
  }

 
  return (
    <div>
      <h2>
        {dog ? 'Update Dog' : 'Create Dog'}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={values.name}
          onChange={onChange}
          placeholder="Name"
          aria-label="Dog's name"
        />
        <select
          name="breed"
          value={values.breed}
          onChange={onChange}
          aria-label="Dog's breed"
        >
          <option value="">---Select Breed---</option>
          {/* Populate this dropdown using data obtained from the API */}
          {breeds.map(breed => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>
        <label>
          Adopted: <input
            type="checkbox"
            name="adopted"
            checked={values.adopted}
            onChange={onChange}
            aria-label="Is the dog adopted?"
          />
        </label>
        <div>
          <button type="submit">
            {dog ? 'Update Dog' : 'Create Dog'}
          </button>
          <button type="button" onClick={() => setValues(initialForm)}
            aria-label="Reset form"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}
