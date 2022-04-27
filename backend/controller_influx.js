//Schema according to Telegraf


const inf = require('@influxdata/influxdb-client')
const util = require('util')

/** Environment variables **/


/**
 * Instantiate the InfluxDB client
 * with a configuration object.
 *
 * Get a query client configured for your org.
 **/
const INFLUX_URL='http://localhost:8086'
//Change token to your own influx db token
const INFLUX_TOKEN='RcZFpGFYMfD3zs_oueOwYSjOc7_AKpaVwAswN-FRGtrVGWxDHplx7_g62kciEUgrAeLw0-jGpKGFmTF6V3Kq7A=='
const INFLUX_ORG='organisation'

const url = INFLUX_URL || ''
const token = INFLUX_TOKEN
const org = INFLUX_ORG || ''

const influx = new inf.InfluxDB({url, token}).getQueryApi(org);

const queries = require('./queries')

let time_stamp = []
let measure = []


const cpuUsage = (my_arg) => {
    return new Promise(async (res,rej) => {
        let host = my_arg.host
        let field = my_arg.field
        let cpu_no = my_arg.cpu_no
        influx.queryRows(util.format(queries.CPU_Usage, host, field, cpu_no), 
        {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row)
                time_stamp.push(o._time)
                measure.push(o._value)
            },
            error(error) {
                rej(error)
            },
            complete() {
                console.log('completed')
                res({
                    time: time_stamp.toString(),
                    measure: measure.toString()
                })
            }
        } )
    })
}


const memUsage = (field, host) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.Memory, host, field), 
        {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row)
                time_stamp.push(o._time)
                measure.push(o._value)
            },
            error(error) {
                rej(error)
            },
            complete() {
                res({
                    time: time_stamp,
                    measure: measure
                })
            }
        } )
    })
}

const diskUsage = (cpu_no, device, host) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.Disk_Usage, host, cpu_no, device), 
        {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row)
                time_stamp.push(o._time)
                measure.push(o._value)
            },
            error(error) {
                rej(error)
            },
            complete() {
                res({
                    time: time_stamp,
                    measure: measure
                })
            }
        } )
    })
}

const sysInfo = (field, host) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.SYS_Info, host, field), 
        {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row)
                time_stamp.push(o._time)
                measure.push(o._value)
            },
            error(error) {
                rej(error)
            },
            complete() {
                res({
                    time: time_stamp,
                    measure: measure
                })
            }
        } )
    })
}

const networkInfo = (field, inter_face, host) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.Network, host, field, inter_face), 
        {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row)
                time_stamp.push(o._time)
                measure.push(o._value)
            },
            error(error) {
                rej(error)
            },
            complete() {
                res({
                    time: time_stamp,
                    measure: measure
                })
            }
        } )
    })
}

const processInfo = (field, host) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.Processes, host, field), 
        {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row)
                time_stamp.push(o._time)
                measure.push(o._value)
            },
            error(error) {
                rej(error)
            },
            complete() {
                res({
                    time: time_stamp,
                    measure: measure
                })
            }
        } )
    })
}

const postgresInfo = (field, db, host) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.Postgres, host, field, db), 
        {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row)
                time_stamp.push(o._time)
                measure.push(o._value)
            },
            error(error) {
                rej(error)
            },
            complete() {
                res({
                    time: time_stamp,
                    measure: measure
                })
            }
        } )
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
