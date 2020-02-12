const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Livros = require('../models/Livros');
const Notas = require('../models/Notas');
const User = require('../models/User');

const router = express.Router();

router.use(authMiddleware);



router.get('/user', async (req, res) => {
    try {
        const user = await User.find();
        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ Error: 'Erro o listar usuario' })
    }


})

router.get('/livros', async (req, res) => {
    try {
        const livro = await Livros.find();
        return res.send({ livro });
    } catch (err) {
        return res.status(400).send({ Error: 'Erro ao listar livros' })
    }


})

router.get('/livrosnotas', async (req, res) => {
    try {
        const _livros = await Notas.find({ user: req.userId }).select('livro');
        console.log(_livros)

        const livrosAvaliados = _livros.map(x => { return x.livro });
        console.log(livrosAvaliados)
        
        const livros = await Livros.find(
            {
                "_id": {
                    "$not": {
                        "$in": livrosAvaliados
                    }
                }
            }
        );
        console.log(livros)
        return res.send({ livros });
    } catch (err) {
        return res.status(400).send({ Error: 'Erro ao listar livros' })
    }


})

router.get('livrosId', async (req, res) => {
    res.send({ user: req.userId });

})

router.post('/livros', async (req, res) => {
    const { titulo } = req.body;
    try {
        if (await Livros.findOne({ titulo })) {
            return res.status(400).send({ Error: 'Este livro ja esta cadastrado' })
        }
        const livro = await Livros.create({ ...req.body, user: req.userId });
        return res.send({ livro });
    } catch (err) {
        return res.status(400).send({ Error: 'Erro criando livro' })
    }

})

router.delete('/livros/:livrosId', async (req, res) => {
    try {
        if (!(await Notas.find({ livro: req.params.livrosId }))) {
            return res.status(200).send({ Error: 'erro' })
        }
        await Livros.findByIdAndRemove(req.params.livrosId);
        return res.send();
    } catch (err) {
        return res.status(400).send({ Error: 'Erro ao deletar' });
    }
})

router.put('/livros/:livrosId', async (req, res) => {
    try {
        const { titulo, autor, editora } = req.body;

        await Livros.findByIdAndUpdate(req.params.livrosId, { titulo, autor, editora }, { new: true });
        return res.send();
    } catch (err) {
        return res.status(400).send({ Error: 'Erro ao deletar' });
    }
})

router.get('/notas', async (req, res) => {
    try {
        const notas = await Notas.find({ user: req.userId })
            .populate('livro');

        return res.send({ notas });
    } catch (err) {
        return res.status(400).send({ Error: 'Erro listando notas' })
    }


})

router.get('/notasmedia', async (req, res) => {
    try {
        const livrosAvaliados = await Notas.distinct('livro');
        const livros = await Livros.find(
            {
                "_id": {
                    "$in": livrosAvaliados
                }
            }
        );
        const notas = await Notas.find();
        const result = {
            livros: livros,
            notas: notas
        };


        return res.send({ result });
    } catch (err) {
        return res.status(400).send({ Error: 'Erro listando notas' })
    }


})

router.get('/:notasId', async (req, res) => {
    res.send({ user: req.userId });

})

router.post('/notas', async (req, res) => {
    try {
        const notas = await Notas.create({ nota: req.body.nota, user: req.userId, livro: req.body.livroId });
        return res.send({ notas });
    } catch (err) {
        return res.status(400).send({ Error: 'Erro atribuindo uma nota ao livro' })
    }

})


router.delete('/notas/:notasId', async (req, res) => {
    try {
        await Notas.findByIdAndRemove(req.params.notasId);
        return res.send();
    } catch (err) {
        return res.status(400).send({ Error: 'Erro ao deletar' });
    }
})



module.exports = app => app.use('/projects', router);