const Influx = require('influx');

//Schema according to Telegraf
const influx = new Influx.InfluxDB({
    host: 'localhost',
    database: 'db_proj',
    schema: [
      {
        measurement: 'cpu',
        fields: { height: Influx.FieldType.FLOAT },
        tags: ['unit', 'location']
      }
    ]
});

const queries = require('./queries')

const cpuUsage = (field, cpu_no, host) => {
    return new Promise(async (res,rej) => {
        const result = await influx.query(queries.CPU_Usage, [field, cpu_no, host])

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

const diskUsage = (cpu_no, host, device) => {
    return new Promise(async (res,rej) => {
        const result = await influx.query(queries.Disk_Usage, [cpu_no, host, device])

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

const networkInfo = (field, host, interface) => {
    return new Promise(async (res,rej) => {
        const result = await influx.query(queries.Network, [field, host, interface])

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

module.exports = {
    cpuUsage,
    memUsage,
    diskUsage,
    sysInfo,
    networkInfo,
    processInfo
}