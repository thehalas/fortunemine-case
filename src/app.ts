import Server from './server';
const port = parseInt(process.env.PORT || '3000');

const server = new Server().start(port)
    .then(port => console.log(`Running on port ${port}`))
    .catch(error => {console.log(error)});

export default server