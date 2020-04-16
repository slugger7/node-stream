const neo4j = require("neo4j-driver");

const connectGraph = (app) => {
  const url = process.env.GRAPHDB_URL || "neo4j://localhost:7687";

  const driver = neo4j.driver(url, neo4j.auth.basic("neo4j", "password"));

  app.set("graphDriver", driver);
};

const graph = (fn) => async (graphDriver, ...args) => {
  const session = graphDriver.session();
  try {
    return await fn(session, ...args);
  } catch (err) {
    console.error("Encountered an error ", err);
  } finally {
    session.close();
  }
};

const sanitizeQueryString = (query) => {
  const firstQuoteRegex = /\"(?=\w*\":)/;
  const lastQuoteRegex = /\"(?=:)/;
  return query.replace(firstQuoteRegex, "").replace(lastQuoteRegex, "");
};

const extractFields = (response) => response.records.map(record => record._fields[0].properties);

module.exports = {
  connectGraph,
  graph,
  sanitizeQueryString,
  extractFields,
};
