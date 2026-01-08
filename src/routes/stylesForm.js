let { Router } = require('express');
let router = Router();

let stylesForm = require('../../data/stylesForm.json');

//- Mostrar todos los Estilos de Combate
router.get('/', (req, res) => {
    res.json(stylesForm);
})

//- Obtener / Mostrar Estilos
router.get('/:id', (req, res) => {
    let id = req.params.id;
    let styleForm = stylesForm.find(styleForm => styleForm.id == id);
    if (styleForm){
        res.json(styleForm);
    } else {
        res.status(404).json({error: `No se encuentra el estilo de combate con id ${id}`});
    }
})

//-Eliminar un Estilos
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    stylesForm = stylesForm.filter(styleForm => styleForm.id != id);
    res.status(204).json({msg: 'Estilo de combate eliminado'});
})

//- Crear un Estilos
router.post('/', (req, res) => {
    console.log('body:', req.body)
    const newstylesForm = req.body;
    if (newstylesForm.name && newstylesForm.description) {
        let maximo = Math.max(...stylesForm.map(sf => sf.id));
        newstylesForm.id = maximo+1;
        stylesForm.push(newstylesForm);
        res.status(201).json(newstylesForm);
    } else {
        res.status(400).json({ error: 'Server : Nombre o la Descripción está vacío' });
    }
})

//- Modificar un Estilos
router.put('/:id', (req, res) => {
    let id = req.params.id;
    const existstyleForm = req.body.name;
    const styleFormDescription = req.body.description;
    let styleForm = stylesForm.find(sf => sf.id == id);

    if(styleForm){
        styleForm.name = existstyleForm;
        styleForm.description = styleFormDescription;
        res.status(200).json(styleForm);
    } else {
        res.status(400).json({error: 'No existe este Estilo de combate'})
    }
    if (styleForm == 0){
        res.status(400).json({error: 'El nombre ó la descripción no puede ser vacio'})
    }
    console.log(styleForm);
});

module.exports = router;