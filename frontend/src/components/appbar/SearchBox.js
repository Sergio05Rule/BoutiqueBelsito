import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
    
  };
  return (
  <form className="input-group mb-3"
  onSubmit={submitHandler}
  >
    <input 
      type="text" 
      className="form-control" 
      placeholder="..." 
      aria-label="Recipient's username" 
      onChange={(e) => setName(e.target.value)}
      aria-describedby="basic-addon2"></input>
      <button 
        className="btn btn-outline-secondary" 
        type="submit"
      >Search</button>
  </form>
  );
}