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
`

const DelAppFromNode = `
delete from node_application
where node_id = %d and application_name in %L;
`

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
    DelAppFromNode
}