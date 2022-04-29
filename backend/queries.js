const RegUser = `
insert into users (username, password)
values ($1, $2)
`;

const LoginUser = `
select username, password
from users
where username = $1 and password = $2
`;

const GetNodes = `
select *
from nodes
`;

const UpdateNodes = `
update nodes
set ip = $3
where node_id = $1 and name = $2
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
values ($1, $2);
`;

const GetNodesFromUser = `
select nodes.node_id, nodes.name, nodes.ip
from user_node_access, nodes
where user_node_access.username = $1 and user_node_access.node_id = nodes.node_id;
`;

const DeleteNodesFromUser = `
delete from user_node_access
where username = $1;
`;

const AddAppToNode = `
insert into node_application (node_id, application_name)
values ($1, $2);
`;

const GetAppFromNode = `
select node_application.application_name
from node_application, nodes
where node_application.node_id = $1 and node_application.node_id = nodes.node_id;
`;

const DelAppFromNode = `
delete from node_application
`;


const CPU_Usage = `from(bucket:"%s")
|> range(start: -5m)
|> timeShift(duration: 5h30m)
|> filter(fn: (r) => r._measurement == "cpu" and r._field == "%s" and r.cpu == "%s" and r.host == "%s")`;

const Memory = `from(bucket:"%s")
|> range(start: -5m)
|> timeShift(duration: 5h30m)
|> filter(fn: (r) => r._measurement == "mem" and r._field == "%s" and r.host == "%s")`;


const Disk_Usage = `from(bucket:"%s")
|> range(start: -5m)
|> timeShift(duration: 5h30m)
|> filter(fn: (r) => r._measurement == "disk" and r._field == "used_percentage" and r.cpu == "%s" and r.device = "%s" and r.host == "%s")`;

const SYS_Info = `from(bucket:"%s")
|> range(start: -5m)
|> timeShift(duration: 5h30m)
|> filter(fn: (r) => r._measurement == "system" and r._field == "%s" and r.host == "%s")`;

const Network = `from(bucket:"%s")
|> range(start: -5m)
|> timeShift(duration: 5h30m)
|> filter(fn: (r) => r._measurement == "net" and r._field == "%s" and r.interface == "%s" and r.host == "%s")`;

const Processes = `from(bucket:"%s")
|> range(start: -5m)
|> timeShift(duration: 5h30m)
|> filter(fn: (r) => r._measurement == "processes" and r._field == "%s" and r.host == "%s")`;

const Postgres = `from(bucket:"%s")
|> range(start: -5m)
|> timeShift(duration: 5h30m)
|> filter(fn: (r) => r._measurement == "postgresql" and r._field == "%s" and r.db = "%s" and r.host == "%s")`;


const Apache = `from(bucket:"%s")
|> range(start: -5m)
|> timeShift(duration: 5h30m)
|> filter(fn: (r) => r._measurement == "apache" and r._field == "%s and r.host == "%s" and r.port = "%s" and r.server = "%s")`;


module.exports = {
    RegUser,
    LoginUser,
    GetNodes,
    UpdateNodes,
    CheckNode,
    RegNode,
    DelNode,
    AddApplication,
    DeleteApplication,
    AddNodesToUser,
    GetNodesFromUser,
    DeleteNodesFromUser,
    AddAppToNode,
    DelAppFromNode,
    GetAppFromNode,
    CPU_Usage,
    Memory,
    Disk_Usage,
    SYS_Info,
    Network,
    Processes,
    Postgres,
    Apache
}