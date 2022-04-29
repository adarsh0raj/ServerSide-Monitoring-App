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
let alerts = []


const cpuUsage = (my_arg) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.CPU_Usage, my_arg.bucket, my_arg.field, my_arg.cpu_no, my_arg.host), 
        {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row)
                time_stamp.push(o._time)
                measure.push(o._value)

                if(Number(my_arg.threshold) != -1) {
                    if(Number(o._value) > Number(my_arg.threshold)) {
                        if(alerts.length == 0) {
                            alerts.push(`${my_arg.host} is having high CPU usage`);
                        }
                    }
                }
            },
            error(error) {
                rej(error)
                time_stamp = []
                measure = []
                alerts = []
            },
            complete() {
                res({
                    time: time_stamp,
                    measure: measure,
                    alerts: new Set(alerts)
                })

                time_stamp = []
                measure = []
                alerts = []
            }
        } )
    })
}


const memUsage = (my_arg) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.Memory, my_arg.bucket, my_arg.field, my_arg.host), 
        {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row)
                time_stamp.push(o._time)
                measure.push(o._value)

                if(Number(my_arg.threshold) != -1) {
                    if(Number(o._value) > Number(my_arg.threshold)) {
                        if(alerts.length == 0) {
                            alerts.push(`${my_arg.host} is running out of memory`);
                        }
                    }
                }
            },
            error(error) {
                rej(error)
                time_stamp = []
                measure = []
                alerts = []
            },
            complete() {
                res({
                    time: time_stamp,
                    measure: measure,
                    alerts: alerts,
                })
                time_stamp = []
                measure = []
                alerts = []
            }
        } )
    })
}

const diskUsage = (my_arg) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.Disk_Usage, my_arg.bucket, my_arg.cpu_no, my_arg.device, my_arg.host), 
        {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row)
                time_stamp.push(o._time)
                measure.push(o._value)

                if(Number(my_arg.threshold) != -1) {
                    if(Number(o._value) > Number(my_arg.threshold)) {
                        if(alerts.length == 0) {
                            alerts.push(`${my_arg.host} is having high disk usage on ${my_arg.device}`);
                        }
                    }
                }
            },
            error(error) {
                rej(error)
                time_stamp = []
                measure = []
                alerts = []
            },
            complete() {
                res({
                    time: time_stamp,
                    measure: measure,
                    alerts: new Set(alerts)
                })

                time_stamp = []
                measure = []
                alerts = []
            }
        } )
    })
}

const sysInfo = (my_arg) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.SYS_Info, my_arg.bucket, my_arg.field, my_arg.host), 
        {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row)
                time_stamp.push(o._time)
                measure.push(o._value)

                if(Number(my_arg.threshold) != -1) {
                    if(Number(o._value) > Number(my_arg.threshold)) {
                        if(alerts.length == 0) {
                            alerts.push(`${my_arg.host} is having high load on system`)
                        }
                    }
                }
            },
            error(error) {
                rej(error)
                time_stamp = []
                measure = []
                alerts = []
            },
            complete() {
                res({
                    time: time_stamp,
                    measure: measure,
                    alerts: new Set(alerts)
                })

                time_stamp = []
                measure = []
                alerts = []
            }
        } )
    })
}

const networkInfo = (my_arg) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.Network, my_arg.bucket, my_arg.field, my_arg.inter_face, my_arg.host), 
        {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row)
                time_stamp.push(o._time)
                measure.push(o._value)
                
                if(Number(my_arg.threshold) != -1) {
                    if(Number(o._value) > Number(my_arg.threshold)) {
                        if(alerts.length == 0) {
                            alerts.push(`${my_arg.host} is having high network activity on ${my_arg.inter_face}`);
                        }
                    }
                }
            },
            error(error) {
                rej(error)
                time_stamp = []
                measure = []
                alerts = []
            },
            complete() {
                res({
                    time: time_stamp,
                    measure: measure,
                    alerts: new Set(alerts)
                })

                time_stamp = []
                measure = []
                alerts = []
            }
        } )
    })
}

const processInfo = (my_arg) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.Processes, my_arg.bucket, my_arg.field, my_arg.host), 
        {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row)
                time_stamp.push(o._time)
                measure.push(o._value)

                if(Number(my_arg.threshold) != -1) {
                    if(Number(o._value) > Number(my_arg.threshold)) {
                        if(alerts.length == 0) {
                            alerts.push(`${my_arg.host} is having high process load`);
                        }
                    }
                }
            },
            error(error) {
                rej(error)
                time_stamp = []
                measure = []
                alerts = []
            },
            complete() {
                res({
                    time: time_stamp,
                    measure: measure,
                    alerts: new Set(alerts)
                })

                time_stamp = []
                measure = []
                alerts = []
            }
        } )
    })
}

const postgresInfo = (my_arg) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.Postgres, my_arg.bucket, my_arg.field, my_arg.db, my_arg.host), 
        {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row)
                time_stamp.push(o._time)
                measure.push(o._value)

                if(Number(my_arg.threshold) != -1) {
                    if(Number(o._value) > Number(my_arg.threshold)) {
                        if(alerts.length == 0) {
                            alerts.push(`${my_arg.host} is having high load on database ${my_arg.db}`)
                        } 
                    }
                }
            },
            error(error) {
                rej(error)
                time_stamp = []
                measure = []
                alerts = []
            },
            complete() {
                res({
                    time: time_stamp,
                    measure: measure,
                    alerts: new Set(alerts)
                })

                time_stamp = []
                measure = []
                alerts = []
            }
        } )
    })
}


const apacheInfo = (my_arg) => {
    return new Promise(async (res,rej) => {
        influx.queryRows(util.format(queries.Apache, my_arg.bucket, my_arg.field, my_arg.host, my_arg.port, my_arg.server), 
        {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row)
                time_stamp.push(o._time)
                measure.push(o._value)

                if(Number(my_arg.threshold) != -1) {
                    if(Number(o._value) > Number(my_arg.threshold)) {
                        if(alerts.length == 0) {
                            alerts.push(`${my_arg.host} is having high web server load`)
                        }
                    }
                }
            },
            error(error) {
                rej(error)
                time_stamp = []
                measure = []
                alerts = []
            },
            complete() {
                res({
                    time: time_stamp,
                    measure: measure,
                    alerts: new Set(alerts)
                })

                time_stamp = []
                measure = []
                alerts = []
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
    postgresInfo,
    apacheInfo
}
