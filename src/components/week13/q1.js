import React, {useState, useEffect} from 'react';

// Manipulate the function below to console.log only when fullName is changed

// function Profile(){
//     const [fullName, setName] = useState('John Doe')
//     const [title, setTitle] = useState('Senior')

//     console.log('The fullname has changed');

//     return(
//         <>
//             <input value={fullName} onChange={ e => setName(e.target.value)} />
//             <input value={title} onChange={ e => setTitle(e.target.value)} />
//         </>
//     )
// }


export default function Profile(){
    const [fullName, setName] = useState('John Doe')
    const [title, setTitle] = useState('Senior')

    useEffect(() => {console.log('The fullname has changed');}, [fullName])

    return(
        <>
            <input value={fullName} onChange={ e => setName(e.target.value)} />
            <input value={title} onChange={ e => setTitle(e.target.value)} />
        </>
    )
}