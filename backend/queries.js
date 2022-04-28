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
where username = %s and node_id in %L;
`;

const AddAppToNode = `
insert into node_application (node_id, application_name)
values %L;
`;

const DelAppFromNode = `
delete from node_application
where node_id = %d and application_name in %L;
`;


const CPU_Usage = `from(bucket:"bucket")
|> range(start: -5m)
|> filter(fn: (r) => r._measurement == "cpu" and r._field == $1 and r.cpu == $2 and r.host = $3)`;

const Memory = `from(bucket:"bucket")
|> range(start: -5m)
|> filter(fn: (r) => r._measurement == "mem" and r._field == $1 and r.host = $2)`;


const Disk_Usage = `from(bucket:"bucket")
|> range(start: -5m)
|> filter(fn: (r) => r._measurement == "disk" and r._field == "used_percentage" and r.cpu == $1 and r.host = $2 and r.device = $3)`;

const SYS_Info = `from(bucket:"bucket")
|> range(start: -5m)
|> filter(fn: (r) => r._measurement == "system" and r._field == $1 and r.host = $2)`;

const Network = `from(bucket:"bucket")
|> range(start: -5m)
|> filter(fn: (r) => r._measurement == "net" and r._field == $1 and r.host = $2 and r.interface = $3)`;

const Processes = `from(bucket:"bucket")
|> range(start: -5m)
|> filter(fn: (r) => r._measurement == "processes" and r._field == $1 and r.host = $2)`;


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
    Processes
}