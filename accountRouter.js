const db = require('./data/dbConfig')
const express = require('express')
const router = express.Router()

const Accounts = {
    getAll() {
        return db('accounts')
    },
    getById(id) {
        return db('accounts').where({id})
    },
    create(acc) {
        return db('accounts').insert(acc)
    },
    update(id, post) {
        return db('accounts').where({id}).update(post)
    },
    delete(id) {
        return db('posts').where({id}).del()
    }
}

router.get('/',(req, res) => {
    Accounts.getAll()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json(`${err}`)
    })
})

router.get('/:id', (req, res) => {
    Accounts.getById(req.params.id)
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json(`${err}`)
    })
})

router.post('/', (req, res) => {
    Accounts.create(req.body)
    .then((id) => {
        return Accounts.getById(id).first()
    })
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json(`${err}`)
    })
})

router.put('/:id',(req, res) => {
    Accounts.update(req.params.id, req.body)
    .then(count => {
        if (!count) {
            res.json({message: 'no account with that id'})
        } else {
            return Accounts.getById(req.params.id).first()
        }
    })
    .then(acc => {
        res.json(acc)
    })
    .catch(err => {
        res.json(`${err}`)
    })
})

router.delete('/:id', (req, res) => {
    Accounts.delete(req.params.id)
    .then(() => {
        res.json('deleted')
    })
    .catch(err =>{
        res.json(`${err}`)
    })
})

module.exports = router