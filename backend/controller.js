const Pool = require('pg').Pool
const util = require('util')
const pool = new Pool({
  user: 'adarsh',
  host: 'localhost',
  database: 'dbms_proj',
  password: 'adarsh',
  port: 5432,
});
const queries = require('./queries')

const regUser = (username, password) => {
    return new Promise(async (res,rej) => {
        try {
            const reg = await pool.query(queries.RegUser,[username, password])
        }   
        catch(err){
            rej(err)
        }
        
        if(reg.error){
            rej(reg.error)
        }

        res('Registered Successfully')
    })
}

const loginUser = (username, password) => {
    return new Promise(async (res,rej) => {
        try {
            const login = await pool.query(queries.LoginUser,[username, password])
        }
        catch(err){
            rej(err)
        }
        
        if(login.error || login.rows.length === 0){
            rej(login.error)
        }

        res({
            username: login.rows[0].username
        })
    })
}

const getNodes = () => {
    return new Promise(async (res,rej) => {
        const nodes = await pool.query(queries.GetNodes)
        if(nodes.error){
            rej(nodes.error)
        }
        res(nodes.rows)
    })
}

const updateNodes = (node_id, name, ip) => {
    return new Promise(async (res,rej) => {
        const nodes = await pool.query(queries.UpdateNodes, [node_id, name, ip])
        if(nodes.error){
            rej(nodes.error)
        }
        res("Nodes Ip Updated Successfully")
    })
}

const regNode = (name, ip) => {
    return new Promise(async (res,rej) => {
        const check = await pool.query(queries.CheckNode,[ip])
        if(check.error){
            rej(check.error)
        }
        else if(check.rows.length != 0){
            res(format('Node alreay registered id=%d',check.rows[0].node_id))
        }

        const reg = await pool.query(queries.RegNode,[name, ip])

        if(reg.error){
            rej(reg.error)
        }

        res('Registered Successfully')
    })
}

const delNode = (name, ip) => {
    return new Promise(async (res,rej) => {
        const del = await pool.query(queries.DelNode,[ip])

        if(del.error){
            rej(del.error)
        }

        res('Deleted Successfully')
    })
}

const addApplication = (name) => {
    return new Promise(async (res,rej) => {
        const add = await pool.query(queries.AddApplication,[name])

        if(add.error){
            rej(add.error)
        }

        res('Added Successfully')
    })
}

const delApplication = (name) => {
    return new Promise(async (res,rej) => {
        const del = await pool.query(queries.DeleteApplication,[name])

        if(del.error){
            rej(del.error)
        }

        res('Deleted Successfully')
    })
}

const addNodesToUser = (body) => {
    const {username} = body
    const {node_id} = body

    return new Promise(async (res,rej) => {
        try {
            const add = await pool.query(queries.AddNodesToUser, [username, node_id])
        }
        catch(err){
            rej(err)
        }
        res('Added Successfully')
    })
}

const getNodesFromUser = (body) => {
    const {username} = body
    return new Promise(async (res,rej) => {
        try {
            const nodes = await pool.query(queries.GetNodesFromUser,[username])
        }
        catch(err){
            rej(err)
        }
        if(nodes.error){
            rej(nodes.error)
        }
        res(nodes.rows)
    })
}


const delNodesFromUser = (body) => {
    const {username} = body
    return new Promise(async (res,rej) => {
        try {
            const del = await pool.query(queries.DelNodesFromUser,[username])
        }
        catch(err){
            rej(err)
        }

        if(del.error){
            rej(del.error)
        }
        res('Deleted Successfully')
    })
}

const addAppToNode = (body) => {
    const {node_id} = body
    const {name} = body

    return new Promise(async (res,rej) => {
        const add = await pool.query(queries.AddAppToNode, [node_id, name])

        if(add.error){
            rej(add.error)
        }

        res('Added Successfully')
    })
}

const getAppFromNode = (body) => {
    const {node_id} = body
    return new Promise(async (res,rej) => {
        const apps = await pool.query(queries.GetAppFromNode,[node_id])
        if(apps.error){
            rej(apps.error)
        }
        res(apps.rows)
    })
}

const delAppFromNode = (body) => {

    return new Promise(async (res,rej) => {
        const del = await pool.query(queries.DelAppFromNode)

        if(del.error){
            rej(del.error)
        }

        res('Deleted Successfully')
    })

}

module.exports = {
    regUser,
    loginUser,
    getNodes,
    updateNodes,
    regNode,
    delNode,
    addApplication,
    delApplication,
    addNodesToUser,
    getNodesFromUser,
    delNodesFromUser,
    addAppToNode,
    delAppFromNode,
    getAppFromNode
}