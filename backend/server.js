import express from 'express';

const app = express();

app.get('/', (req,res) => {
    res.send("Server is ready")
});

// get a list of 5 jokes
// /api/jokes --> standardisation
// app.get('/api/jokes', (req, res) => {
//     const jokes = [
//         {
//             id: 1,
//             title: 'A joke',
//             content: 'This is a joke'
//         },
//         {
//             id: 2,
//             title: 'Another joke',
//             content: 'This is another joke'
//         },
//         {
//             id: 3,
//             title: 'Again a joke',
//             content: 'This is again a joke'
//         }
//     ];
//     res.send(jokes);
// })

import axios from 'axios'

app.get('/api/jokes', async (req, res) => {
    try {
        // Make a request to the joke API
        const response = await axios.get('https://official-joke-api.appspot.com/random_ten');

        // Extract the jokes from the response
        const randomJokes = response.data.map(joke => ({
            id: joke.id,
            type: joke.type,
            setup: joke.setup,
            punchline: joke.punchline
        }));

        const randomIndex = Math.floor(Math.random() * randomJokes.length);
        const randomJoke = randomJokes[randomIndex];
        
        res.send(randomJoke);
    } catch (error) {
        console.error('Error fetching random jokes:', error);
        res.status(500).send('Error fetching random jokes');
    }
});


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Serve at https://localhost:${port}`);
    }
);
