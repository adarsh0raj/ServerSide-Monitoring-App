const RegUser = `
insert into users (username, password)
values ($1, $2)
`;

const LoginUser = `
select username, password
from users
where username = $1 and password = $2
`;

const CheckNode = `
select * 
from nodes
where ip = $1
`;

const RegNode = `
insert into nodes (name, ip)
values($1, $2)
`;

const DelNode = `
delete from nodes
where ip = $1;
`;

const AddApplication = `
insert into application (name)
values($1);
`;

const DeleteApplication = `
delete from application
where name = $1;
`;

const AddNodesToUser = `
insert into user_node_access (username, node_id)
values %L;
`;

const DeleteNodesFromUser = `
delete from user_node_access
where username = "%s" and node_id in %L;
`;

const AddAppToNode = `
insert into node_application (node_id, application_name)
values %L;
`;

const DelAppFromNode = `
delete from node_application
where node_id = %d and application_name in %L;
`;


const CPU_Usage = `from(bucket:"%s")
|> range(start: -5m)
|> filter(fn: (r) => r._measurement == "cpu" and r._field == "%s" and r.cpu == "%s")`;

const Memory = `from(bucket:"%s")
|> range(start: -5m)
|> filter(fn: (r) => r._measurement == "mem" and r._field == "%s")`;


const Disk_Usage = `from(bucket:"%s")
|> range(start: -5m)
|> filter(fn: (r) => r._measurement == "disk" and r._field == "used_percentage" and r.cpu == "%s" and r.device = "%s")`;

const SYS_Info = `from(bucket:"%s")
|> range(start: -5m)
|> filter(fn: (r) => r._measurement == "system" and r._field == "%s")`;

const Network = `from(bucket:"%s")
|> range(start: -5m)
|> filter(fn: (r) => r._measurement == "net" and r._field == "%s" and r.interface = "%s")`;

const Processes = `from(bucket:"%s")
|> range(start: -5m)
|> filter(fn: (r) => r._measurement == "processes" and r._field == "%s")`;

const Postgres = `from(bucket:"%s")
|> range(start: -5m)
|> filter(fn: (r) => r._measurement == "postgresql" and r._field == "%s" and r.db = "%s")`;




module.exports = {
    RegUser,
    LoginUser,
    CheckNode,
    RegNode,
    DelNode,
    AddApplication,
    DeleteApplication,
    AddNodesToUser,
    DeleteNodesFromUser,
    AddAppToNode,
    DelAppFromNode,
    CPU_Usage,
    Memory,
    Disk_Usage,
    SYS_Info,
    Network,
    Processes,
    Postgres
}