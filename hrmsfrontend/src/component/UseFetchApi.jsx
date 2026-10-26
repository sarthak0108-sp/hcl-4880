import React, { useState, useEffect } from 'react';

const UsefetchApi = () => {
    

    const [serverData, setServerData] = useState([]);
    useEffect(()=>{
        async function getData(){
            try{
                const response=await fetch("http://localhost:8080");
                const jsonData=await response.text();
                console.log(jsonData);
                 setServerData(jsonData);
            }
            catch(e){
                console.error("Error fetching data:", e);
            }
        }
        getData();
    },[]);
 return (
    <div>
        <h2>Backend Response:</h2>
        <p>{serverData}</p>
    </div>
)
}

export default UsefetchApi;