const express = require('express')
const app = express(), bodyParser = require("body-parser");
const port = 3080
const query = require('./controller')

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Auth-Token');
    next();
});

app.post('/register', async(req, res) => {
    const {username, password} = req.body
    query.regUser(username, password)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error);
    })
})

app.post('/login', async(req, res) => {
    const {username, password} = req.body
    query.loginUser(username, password)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error);
    })
})

app.post('/node/register', async(req, res) => {
    const {name, ip} = req.body
    query.regNode(name, ip)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error);
    })
})

app.post('/node/delete', async(req,res) => {
    const {ip} = req.body
    query.delNode(ip)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        console.log(error)
        res.status(500).send(error);
    })
})

app.post('/application/add', async(req,res) => {
    const {name} = req.body
    query.addApplication(ip)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        console.log(error)
        res.status(500).send(error);
    })
})

app.post('/application/delete', async(req,res) => {
    const {name} = req.body
    query.delApplication(name)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        console.log(error)
        res.status(500).send(error);
    })
})

app.post('user/addnode', async(req,res) => {
    query.addNodesToUser(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        console.log(error)
        res.status(500).send(error);
    })
})

app.post('user/delnode', async(req,res) => {
    query.delNodesFromUser(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        console.log(error)
        res.status(500).send(error);
    })
})

app.post('/node/addapp', async(req,res) => {
    query.addAppToNode(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        console.log(error)
        res.status(500).send(error);
    })
})

app.post('/node/delapp', async(req,res) => {
    query.addDelToNode(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        console.log(error)
        res.status(500).send(error);
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

