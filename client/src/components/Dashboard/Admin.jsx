import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../config';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const access_token = sessionStorage.getItem("access-token");
  const username = sessionStorage.getItem("username");


  const forbidenCall = ()=>{
    // move the user to login page if forbidden request is made.
    sessionStorage.setItem("access-token","")
    navigate("/signin");

  }
  useEffect(()=>{
    async function getRecords() {
      const response = await fetch(`${SERVER_URL}/api/test/admin`,{
        headers:{
          "x-access-token":`${access_token}`
        }
      });
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        forbidenCall();
        return;
      }
      const data = await response.json();
      console.log(data);
    }
    getRecords();
  },[])
  return (
    <div>Admin</div>
  )
}

export default Admin