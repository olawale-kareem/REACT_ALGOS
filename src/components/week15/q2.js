import React, {useState, useEffect} from 'react';

function Form(props) {
  
  const data = props.books
  const [books, setBooks] = useState([...data])



  const handleAuthor = (e)=>{ 
    const searchWord = e.target.value.toLowerCase()
    const dataNow = books.filter( book => book.author.toLowerCase().includes(searchWord))
    return (dataNow ? setBooks(dataNow) : setBooks(...data))
    }
  const handleTitle = (e) => { 
    const searchWord = e.target.value.toLowerCase()
    const dataNow = books.filter( book => book.title.toLowerCase().includes(searchWord))
    return (dataNow ? setBooks(dataNow) : setBooks(...data))
    }
  const handleCountry = (e) =>{ 
    const searchWord = e.target.value.toLowerCase()
    const dataNow = books.filter( book => book.country.toLowerCase().includes(searchWord))
    return (dataNow ? setBooks(dataNow) : setBooks(...data))
    }
  const handleLanguage = (e) => { 
    const searchWord = e.target.value.toLowerCase()
    const dataNow = books.filter( book => book.language.toLowerCase().includes(searchWord))
    return (dataNow ? setBooks(dataNow) : setBooks(...data))
    }
  const handleYear = (e) => { 
    const searchWord = e.target.value.toLowerCase()
    const dataNow = books.filter( book => book.year.toLowerCase().includes(searchWord))
    return (dataNow ? setBooks(dataNow) : setBooks(...data))
    }

  useEffect(() =>{setBooks([...data]) }, [data])

  return (
       
        <div className='form' >
      
            <form className='form-components' >
                <div className="form-field">
                    <label className='label' htmlFor="name">author</label>
                    <input className='author' name='email' type="text"   onChange={ e => handleAuthor(e) } />
                </div>

                <div className="form-field">
                    <label className='label' htmlFor="name">title</label>
                    <input className='title' name='otp' type="text"  onChange={ e => handleTitle(e) } />
                </div>


                <div className="form-field">
                    <label className='label' htmlFor="name">country</label>
                    <input className='country' name='password' type="text"  onChange={ e => handleCountry(e) } />
                </div>

                <div className="form-field">
                    <label className='label' htmlFor="name">language</label>
                    <input className='language' name='confirm-password' type="text"  onChange={ e => handleLanguage(e) } />
                </div>

                <div className="form-field">
                    <label className='label' htmlFor="name">year</label>
                    <input className='year' name='confirm-password' type="text"  onChange={ e => handleYear(e) } />
                </div>

          </form>

            {books.map((book, index) =>(
                <div className="book" key={index}>
                    <p>author   <span>{book.author}</span> </p>
                    <p>country  <span>{book.country}</span> </p>
                    <p>language  <span>{book.language}</span></p>
                    <p>pages     <span>{book.pages}</span></p>
                    <p>title     <span>{book.title}</span></p>
                    <p>year      <span>{book.year}</span></p>
                </div>
            ))}
        </div>

  );
}

export default Form;

