import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const versionPostgres = await database.query("SHOW server_version;");
  const versionPostgresValue = versionPostgres.rows[0].server_version;

  const maxConnection = await database.query("SHOW max_connections;");
  const maxConnectionsValue = maxConnection.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;

  const useConnection = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionValue = useConnection.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version_Postgres: versionPostgresValue,
        max_connection: parseInt(maxConnectionsValue),
        use_connection: databaseOpenedConnectionValue,
      },
    },
  });
}

export default status;
