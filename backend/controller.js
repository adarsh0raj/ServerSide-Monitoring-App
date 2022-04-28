const Pool = require('pg').Pool
const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'db_proj',
  password: 'abcd',
  port: 5432,
});
const queries = require('./queries')

const regUser = (username, password) => {
    return new Promise(async (res,rej) => {
        const reg = await pool.query(queries.RegUser,[username, password])

        if(reg.error){
            rej(reg.error)
        }

        res('Registered Successfully')
    })
}

const loginUser = (username, password) => {
    return new Promise(async (res,rej) => {
        const login = await pool.query(queries.LoginUser,[username, password])

        if(login.error || login.rows.length === 0){
            rej(login.error)
        }

        res('Logged in Successfully')
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
    const {node_ids} = body
    values = []
    node_ids.forEach(element => {
        values.append([username, element])
    });

    return new Promise(async (res,rej) => {
        const add = await pool.query(format(queries.AddNodesToUser,values))

        if(add.error){
            rej(add.error)
        }

        res('Added Successfully')
    })
}

const delNodesFromUser = (body) => {
    const {username} = body
    const {node_ids} = body

    return new Promise(async (res,rej) => {
        const del = await pool.query(format(queries.DelNodesFromUser,username, [node_ids]))

        if(del.error){
            rej(del.error)
        }

        res('Deleted Successfully')
    })
}

const addAppToNode = (body) => {
    const {node_id} = body
    const {names} = body
    values = []
    names.forEach(element => {
        values.append([node_id, element])
    })

    return new Promise(async (res,rej) => {
        const add = await pool.query(format(queries.AddAppToNode,values))

        if(add.error){
            rej(add.error)
        }

        res('Added Successfully')
    })
}

const delAppFromNode = (body) => {
    const {node_id} = body
    const {names} = body

    return new Promise(async (res,rej) => {
        const del = await pool.query(format(queries.DelAppFromNode,node_id, [names]))

        if(del.error){
            rej(del.error)
        }

        res('Deleted Successfully')
    })

}

module.exports = {
    regUser,
    loginUser,
    regNode,
    delNode,
    addApplication,
    delApplication,
    addNodesToUser,
    delNodesFromUser,
    addAppToNode,
    delAppFromNode
}