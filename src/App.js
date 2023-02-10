import { useQuery, gql} from '@apollo/client';
import { useState } from 'react';
import "./App.css"

const GET_Character = gql`
  query GetCharacterDetails($id: ID!){
      character(id: $id){
       name
       status
       species
       gender
       id
       image
     
     }
  }
`
;





export default function App() {
  const[id, setId] = useState("")


 const { loading, error, data } = useQuery(GET_Character, {
  variables : {
    id: `${id}` 
},})
let inputvalue
const ChangeId = (event) => {
   inputvalue= event.target.value ;
}
 
const getDetails = () => {
  setId(inputvalue)
}




  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message} <br/> Refresh the page  and please provide id value</p>;
  const{character} = data

  return (
    <div className='appContainer'>
      <h1 className="heading">Provide Random Id<span> in the range(1, 820) </span> and press get details button to get details regarding  about   id</h1>
      <div className="inputContainer">
      <div>      
        <input type="text" onChange={ChangeId} placeholder="Enter ID Here" className="inputEle"/>
        </div>
      <div>
      <button onClick={getDetails} className="buttonStyling">Get Details About ID</button>
      </div>
      </div>
      <div className="detailsCard">
          <h1><span>Name:</span>{character.name}</h1>
          <p><span>Status:</span>{character.status}</p>
          <p><span>ID:</span>{character.id}</p>
          <p><span>Species:</span>{character.species}</p>
          <p><span>Gender:</span>{character.gender}</p>
          <img src={character.image} alt={character.name} className="imageContainer"/>
    </div>
    </div>
  );
}
