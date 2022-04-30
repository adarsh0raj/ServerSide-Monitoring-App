const AddNodesToUser = `
delete from user_node_access 
where username = %s and node_id in %L;
`;
var format = require('pg-format');

console.log(format(AddNodesToUser,'abcd',[[1,2]]));