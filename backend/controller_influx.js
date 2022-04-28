//Schema according to Telegraf
const inf = require('@influxdata/influxdb-client')

/** Environment variables **/


/**
 * Instantiate the InfluxDB client
 * with a configuration object.
 *
 * Get a query client configured for your org.
 **/
const INFLUX_URL='https://localhost:8086'
//Change token to your own influx db token
const INFLUX_TOKEN='ZHd4d0w5AXmT92PXMMwHfqD3gglYF_cF1SFTZ-wILhT-cYa8mtqoM6D5kk6oYJD3kRTxmepa1Qgr49cRfNTBnQ=='
const INFLUX_ORG='db'

const url = INFLUX_URL || ''
const token = INFLUX_TOKEN
const org = INFLUX_ORG || ''

const influx = new inf.InfluxDB({url, token}).getQueryApi(org);

const queries = require('./queries')

const cpuUsage = (field, cpu_no, host) => {
    return new Promise(async (res,rej) => {
        const result = await influx.queryRows(queries.CPU_Usage, [field, cpu_no, host])

        if(result.error){
            rej(result.error)
        }
        
        res(result)
    })
}

const memUsage = (field, host) => {
    return new Promise(async (res,rej) => {
        const result = await influx.query(queries.Memory, [field, host])

        if(result.error){
            rej(result.error)
        }
        
        res(result)
    })
}

const diskUsage = (cpu_no, device, host) => {
    return new Promise(async (res,rej) => {
        const result = await influx.query(queries.Disk_Usage, [cpu_no, device, host])

        if(result.error){
            rej(result.error)
        }
        
        res(result)
    })
}

const sysInfo = (field, host) => {
    return new Promise(async (res,rej) => {
        const result = await influx.query(queries.SYS_Info, [field, host])

        if(result.error){
            rej(result.error)
        }
        
        res(result)
    })
}

const networkInfo = (field, inter_face, host) => {
    return new Promise(async (res,rej) => {
        const result = await influx.query(queries.Network, [field, inter_face, host])

        if(result.error){
            rej(result.error)
        }
        
        res(result)
    })
}

const processInfo = (field, host) => {
    return new Promise(async (res,rej) => {
        const result = await influx.query(queries.Processes, [field, host])

        if(result.error){
            rej(result.error)
        }
        
        res(result)
    })
}

const postgresInfo = (field, db, host) => {
    return new Promise(async (res,rej) => {
        const result = await influx.query(queries.Postgres, [field, db, host])

        if(result.error){
            rej(result.error)
        }

        res(result)
    })
}

module.exports = {
    cpuUsage,
    memUsage,
    diskUsage,
    sysInfo,
    networkInfo,
    processInfo,
    postgresInfo
}
