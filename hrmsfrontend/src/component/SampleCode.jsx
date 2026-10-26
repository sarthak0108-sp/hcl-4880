
import React, { useState, useEffect } from 'react'

function SampleCode({empdata}) {
    const[counter, setCounter] = useState(20);
  const[pointer, setPointer] = useState(100);

    useEffect(() => {
        console.log("Component is rendered");
        console.log("Counter="+counter);
        console.log("Pointer="+pointer);
    },[pointer, counter]);

    function changeCounter(){
        setCounter(counter + 2);
    }

     function changePointer(){
        setPointer(pointer - 2);
    }


  return (
    <div>

     <h2>Counter value={counter}</h2>
     
     <h2>Pointer value={pointer}</h2>
     <button onClick={changeCounter}>Counter</button>
     <button onClick={changePointer}>Pointer</button>
</div>
  )
}

export default SampleCode