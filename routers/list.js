module.exports = app =>{
const express = require('express');
const router = express.Router()


router.get('/test', (req, res) => {
res.send("ok");
});














app.use("/api",router);

}