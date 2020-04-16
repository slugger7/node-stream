const { graph } = require('./index');

const findMovies = graph(async (session, search) => {
    const query = `MATCH (m:movie ${JSON.stringify(search)}) RETURN m`;

    const result = await session.run(query);

    return result;
});

const createMovies = graph(async (session, movies) => {
  const query = `CREATE ${movies.join(',')}`;

  const response = await session.run(query);

  return response;
});

module.exports = {
  findMovies,
  createMovies,
};
