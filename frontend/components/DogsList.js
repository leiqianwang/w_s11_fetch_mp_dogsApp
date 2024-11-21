import React from 'react'
import { Link } from 'react-router-dom'

export default function DogsList({ dogs, onDelete }) {
  return (
    <div>
      <h2>Dogs Shelter</h2>
      <ul>
        {dogs.map(dog => (
            <li key={dog.id}>
              {dog.name}, {dog.breed}, {dog.adopted ? 'Adopted' : 'NOT adopted'}

          <div>
            <Link to={`/dogs/edit/${dog.id}`} state={{ dog}}>
            <button>Edit</button>
            </Link>
            <button onClick={() => onDelete(dog.id)}>Delete</button>
          </div>

            </li>
        ))}
                        
      </ul>
    </div>
  )
}
