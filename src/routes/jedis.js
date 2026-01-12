let { Router } = require('express');
let router = Router();

let jedis = require('../../data/jedis.json');

//- Mostrar todos los jedi
router.get('/', (req, res) => {
    res.json(jedis);
})

//- Obtener / Mostrar jedi
router.get('/:id', (req, res) => {
    let id = req.params.id;
    let jedi = jedis.find(jedi => jedi.id == id);
    if (jedi){
        res.json(jedi);
    } else {
        res.status(404).json({error: `No se encuentra el jedi con id ${id}`});
    }
})

//-Eliminar un jedi
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    jedis = jedis.filter(jedi => jedi.id != id);
    res.status(204).json({msg: 'Jedi eliminado'});
})

//- Crear un jedi
router.post('/', (req, res) => {
    console.log('body:', req.body)
    const newJedis = req.body;
    if (newJedis.name && newJedis.species && newJedis.rank && newJedis.styleForm && newJedis.specialization) {
        let maximo = Math.max(...jedis.map(j => j.id));
        newJedis.id = maximo+1;
        jedis.push(newJedis);
        res.status(201).json(newJedis);
    } else {
        res.status(400).json({ error: 'Server : Nombre está vacío' });
    }
})

//- Modificar un jedi
router.put('/:id', (req, res) => {
    let id = req.params.id;
    const existJedi = req.body.name;
    const jediSpecie = req.body.species;
    const jediRank = req.body.rank;
    const jediStyle = req.body.styleForm;
    const jediSpec = req.body.specialization;
    let jedi = jedis.find(j => j.id == id);

    if(jedi){
        jedi.name = existJedi;
        jedi.species = jediSpecie;
        jedi.rank = jediRank;
        jedi.styleForm = jediStyle;
        jedi.specialization = jediSpec;
        res.status(200).json(jedi);
    } else {
        res.status(400).json({error: 'No existe este Jedi'})
    }
    if (jedi == 0){
        res.status(400).json({error: 'El nombre no puede ser vacio'})
    }
    console.log(jedi);
});

module.exports = router;