const neo4j = require("neo4j-driver");

const connectGraph = (app) => {
  const url = process.env.GRAPHDB_URL || "neo4j://localhost:7687";

  const driver = neo4j.driver(url, neo4j.auth.basic("neo4j", "password"));

  app.set('graphDriver', driver);
};

const graph = fn => async (graphDriver, ...args) => {
  const session = graphDriver.session();
  try {
    return await fn(session, ...args);
  } catch(err) {
    console.error('Encountered an error ', err)
  } finally {
    session.close();
  }
};

module.exports = {
  connectGraph,
  graph
}
