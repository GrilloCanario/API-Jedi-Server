const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

let jedis = [
    {
        "id": 1,
        "name": "Ahsoka Tano",
        "species": "Togruta"
    },
    {
        "id": 2,
        "name": "Luke Skywalker",
        "species": "Human"
    },
    {
        "id": 3,
        "name": "Jhuan Vekar Bel’tan",
        "species": "Human"
    },
    {
        "id": 4,
        "name": "Andros Alfon Kresh",
        "species": "Human"
    }
]

const app = express();
const PORT = 3030;

app.use(cors()); //- app.use es para usar una funcionalidad
app.use(express.json());

//- Crear ruta de Documentación
let swaggerDocument;
try {
    swaggerDocument = require('../swagger-output.json');
} catch {
    console.error('Swagger no generado aún. Vuelve a ejecutar npm run start o dev');
}

if (swaggerDocument) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

//- RUTAS -//

//- Ejemplo
app.get('/', (req, res) => {
    res.send('<h1>API de JEDI</h1>');
})

//- Mostrar todos los jedi
app.get('/jedis', (req, res) => {
    res.json(jedis);
})

//- Mostrar jedi por ID
app.get('/jedis/:id', (req, res) => {
    let id = req.params.id;
    res.json(jedis.find(jedi => jedi.id == id));
})

//-Eliminar un jedi
app.delete('/jedis/:id', (req, res) => {
    let id = req.params.id;
    jedis = jedis.filter(jedi => jedi.id != id);
    res.status(204).json({msg: 'Jedi eliminado'});
})

//- Crear un jedi
app.post('/jedis', (req, res) => {
    console.log('body:', req.body)
    const newJedis = req.body;
    let maximo = jedis.Math.max(...jedis.map(j => j.id));
    newJedis.id = maximo+1;
    jedis.push(newJedis);
    res.status(201).json(newJedis);
})

app.put('/jedis/:id', (req, res) => {
    let id = req.params.id;
    let jedi = jedis.find(j => j.id == id);
    console.log(jedi);
    jedi.name = req.body.name;
    jedi.species = req.body.species;
    res.status(200).json(jedi);
});


//- Para ver la API 
app.listen(PORT, () => {
    console.log(`La API está escuchando en http://localhost:${PORT}`);
});