const neo4j = require('neo4j-driver');

const url = process.env.GRAPHDB_URL || "neo4j://localhost:7687";
console.log('url:', url);

const driver = neo4j.driver(url, neo4j.auth.basic('neo4j', 'password'));

const session = driver.session();

session.run("CREATE (m:movie {title:'The Matrix'}) RETURN m")
.then(result => {
  console.log('Neo4j result', result);
})
.catch(err => {
  console.error(err)
})
.then(() => {
  session.close();
});

// needs to go when express closes;
//await driver.close();