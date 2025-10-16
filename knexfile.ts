export default {
    client: "sqlite3",
    connection: {
        filename: "./src/database/database.db",
    },
    useNullAsDefault: true,
    migrations: {
        extensios: "ts",
        directory: "./src/database/migrations",
    },
    seeds: {
        extensios: "ts",
        directory: "./src/database/seeds",
    },
};
