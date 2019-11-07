module.exports = app => {
    const express = require('express');
    const List = require('../db/db_list')
    const router = express.Router()


    router.get('/test', (req, res) => {
        res.send("ok");
    });


    router.get('/:id', (req, res) => {
        console.log(req.params)
        List.find({ uid: req.params.id }).then(msg => {
            res.status(200).json(msg)
        })
    });

    router.post('/add', (req, res) => {
        console.log(req.body)
        let newList = new List({
            uid: req.body.id,
            container: req.body.container
        })
        newList.save().then(re => res.status(200).json(re)).catch(err => console.log(err))
    });

    router.post('/edit/:id', (req, res) => {
        let list = {}
        if (req.body.done) {
            req.body.done === "false" ? list.done = false : list.done = true
        }
        if (req.body.major) {
            req.body.major === "false" ? list.major = false : list.major = true
        }
        List.updateOne({ uid: req.params.id }, { $set: list }, { new: true })
            .then(profile => res.json(profile))
    });










    app.use("/api/list", router);

}