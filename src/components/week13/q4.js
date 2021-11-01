import React from "react";




// export default function Mapper(){
//     const data = ['Apple', 'Oranges', 'Bananas'].map(value => { return <li >{value}</li> })      
//     return <ul>{data}</ul>

// }

// The abstraction above complains about a key prop, make corrections

// solutions

// why we get the warning : This is because the component renders a list element 'li' without a unique key. the fix for this would be 

export default function Mapper(){
    const data = ['Apple', 'Oranges', 'Bananas'].map((value, index) => { return <li key={index}>{value}</li> })      
    return <ul>{data}</ul>
}

// This is because react uses key to as a stable identifier for lists to track whetheran item was added, changed or modified

