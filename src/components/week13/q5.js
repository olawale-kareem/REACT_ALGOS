import React, {useState,useEffect} from 'react';



// function SaysMousePosition(){
//     const [position, seetPosition] = useState({x:0, y:0})


//     function updatePosition(event){
//         setPosition({x:event.clientX, y:event.clientY})
//     }

//     useEffect( () => {
//         window.addEventListener('mousemove', updatePosition)
//         return window.removeEventListener('mousemove', updatePosition)
//     })

//     return(
//         <p>The mouse X  position is at {position.x}</p>
//     )

// }

// re-writing the function above

function useMousePosition(){
    const [position, seetPosition] = useState({x:0, y:0})

    function updatePosition(event){
        setPosition({x:event.clientX, y:event.clientY})
    }

    useEffect( () => {
        window.addEventListener('mousemove', updatePosition)
        return window.removeEventListener('mousemove', updatePosition)
    })

    return position
}

export function saysMousePosition(){
    const position = useMousePosition()
    return ( <p>{position}</p> )
}



