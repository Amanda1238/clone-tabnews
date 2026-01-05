test("Get to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  // data atualizada
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  // versão do Postgres
  const database = responseBody.dependencies.database;
  expect(responseBody.dependencies.database.version_Postgres).toEqual("16.0");
  // maximo de conexoes
  expect(responseBody.dependencies.database.max_connection).toEqual(100);

  // quantas conexoes tem
  expect(responseBody.dependencies.database.use_connection).toEqual(1);
  const useConnectionsNumber = Number(database.use_connection);
  expect(Number.isNaN(useConnectionsNumber)).toBe(false);
  expect(useConnectionsNumber).toBeGreaterThanOrEqual(0);
});
