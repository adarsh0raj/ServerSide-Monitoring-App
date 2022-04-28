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
const INFLUX_TOKEN='ZHd4d0w5AXmT92PXMMwHfqD3gglYF_cF1SFTZ-wILhT-cYa8mtqoM6D5kk6oYJD3kRTxmepa1Qgr49cRfNTBnQ=='
const INFLUX_ORG='db'

const url = INFLUX_URL || ''
const token = INFLUX_TOKEN
const org = INFLUX_ORG || ''

const influx = new inf.InfluxDB({url, token}).getQueryApi(org);

const queries = require('./queries')

let time_stamp = []
let measure = []


const cpuUsage = (my_arg) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.CPU_Usage, my_arg.host, my_arg.field, my_arg.cpu_no), 
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

                time_stamp = []
                measure = []
            }
        } )
    })
}


const memUsage = (my_arg) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.Memory, my_arg.host, my_arg.field), 
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
                time_stamp = []
                measure = []
            }
        } )
    })
}

const diskUsage = (my_arg) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.Disk_Usage, my_arg.host, my_arg.cpu_no, my_arg.device), 
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

                time_stamp = []
                measure = []
            }
        } )
    })
}

const sysInfo = (my_arg) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.SYS_Info, my_arg.host, my_arg.field), 
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

                time_stamp = []
                measure = []
            }
        } )
    })
}

const networkInfo = (my_arg) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.Network, my_arg.host, my_arg.field, my_arg.inter_face), 
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

                time_stamp = []
                measure = []
            }
        } )
    })
}

const processInfo = (my_arg) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.Processes, my_arg.host, my_arg.field), 
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

                time_stamp = []
                measure = []
            }
        } )
    })
}

const postgresInfo = (my_arg) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.Postgres, my_arg.host, my_arg.field, my_arg.db), 
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

                time_stamp = []
                measure = []
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
