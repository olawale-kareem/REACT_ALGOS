import React, {useState,useEffect} from 'react';


function Gusser(){
    const [guess, setGuess] = useState('');
    const [correct, setCorrect] = useState('false');

    function testGuess(){
        if ( guess === 'yes') setCorrect(true);
        setCorrect(false)
    }

    return(
        <>
            { correct && <p>Your test guess was correct</p> }
            <input type="text" value={guess} onChange={e => setGuess(e.target.value)} />
            <button onClick={testGuess} > Submit guess</button>
        </>
    )

}

// test this component to show  'Your test was correct'
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Guesser from './'

test('It shows confirmation if guess is correct', () => {

    render(<Gusser />)

    const input = screen.getByLabelText('Enter your guess');
    const btn = screen.getByRole('button',{name: 'Submit guess'});

    userEvent.type(input, 'yes')
    userEvent.click(btn)

    expect(screen.getByText('Your guess was correct')).toBeInTheDocument();

})