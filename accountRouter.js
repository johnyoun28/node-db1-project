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