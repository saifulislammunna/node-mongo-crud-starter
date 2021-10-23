import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
const  [user, setUser] = useState({});
const {id} = useParams();

  useEffect(( ) => {
      const url = `http://localhost:5000/users/${id}`;
      fetch(url)
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);


  // update user
  const handleNameChange = e =>   {

        /*  console.log(e.target.value); */
        const updatedName = e.target.value;
        const updatedUser = {name: updatedName, email: user.email };
        setUser(updatedUser);

  }

  const handleEmailChange = e => {
      const updatedEmail = e.target.value;
     /*  const updatedUser = {...user};
      updatedUser.email = updatedEmail; */
      const updatedUser = {name: user.name, email: updatedEmail}
      setUser(updatedUser);
  }

  const handleUpdateUser = e => {
       const url = `http://localhost:5000/users/${id}`;
        fetch(url, {
           method: 'PUT',
           headers: {
               'content-type' : 'application/json'
            },
           body: JSON.stringify(user)
   

       })
       .then(res => res.json())
       .then(data => {
          /*  console.log(data); */
          if(data.modifiedCount > 0){
              alert('Updated Successfully.')
              setUser({});
          }
       })
        

        e.preventDefault();

  }

    return (
        <div>
            <h2>  Update : {user.name}  {user.email}</h2>
            <p><small>{id}</small></p>
            <form onSubmit={handleUpdateUser}>
                <input type="text" onChange={handleNameChange} value={user.name || ''}/>
                <input type="email" onChange={handleEmailChange}  value={user.email || ''}/>
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateUser;