module.exports = {
    environment: 'production',
    port: process.env.port,
    protocol: 'http',
    TAG: "production",
    mongo: {
        dbName: process.env.dbName,
        dbUrl: process.env.dbUrl,
    },
    swagger_port: 80,
    isProd: true,
};
