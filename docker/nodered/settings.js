// Node-RED settings of the OptaEquipments application image.
// Unlike data/settings.js (development, Node-RED projects), nothing is replaced
// at container start: credentials come from the environment variables.

const required = ['OPTA_ADMIN_USERNAME', 'OPTA_ADMIN_PASSWORD'];
for (const name of required) {
    if (!process.env[name]) {
        console.error('OptaEquipments: environment variable ' + name + ' is required');
        process.exit(1);
    }
}

// bcryptjs is installed with the application packages (node-red-contrib-bcrypt)
const bcrypt = require('/app/node_modules/bcryptjs');

module.exports = {
    flowFile: "/app/flows.json",
    credentialsFile: "/app/flows_cred.json",
    // flows_cred.json only holds references to environment variables
    credentialSecret: "optaequipments",
    flowFilePretty: true,
    adminAuth: {
        type: "credentials",
        users: [{
            username: process.env.OPTA_ADMIN_USERNAME,
            password: bcrypt.hashSync(process.env.OPTA_ADMIN_PASSWORD, 8),
            permissions: "*"
        }],
        sessionExpiryTime: 86400
    },
    httpAdminRoot: "/admin",
    httpNodeRoot: "/",
    diagnostics: { enabled: true, ui: true, },
    runtimeState: { enabled: false, ui: false, },
    telemetry: { enabled: false },
    logging: { console: { level: "info", metrics: false, audit: false } },
    contextStorage: {
        default: { module: "memory" },
        memoryOnly: { module: "memory" },
        file: { module: "localfilesystem", config: { dir: "/data" } }
    },
    exportGlobalContextKeys: false,
    externalModules: { autoInstall: false, palette: { allowInstall: false } },
    editorTheme: {
        page: { title: "Opta Equipments nodes" },
        header: { title: "Opta Equipments nodes", image: "/app/admin.png" },
        palette: { },
        projects: { enabled: false },
        codeEditor: { lib: "monaco", options: { } },
        markdownEditor: { mermaid: { enabled: true } },
        login: { image: "/app/admin.png" },
        userMenu: false,
        tours: false,
        lang: "fr",
    },
    functionExternalModules: true,
    functionTimeout: 0,
    functionGlobalContext: { },
    ui: { path: "" },
    debugMaxLength: 1000,
    mqttReconnectTime: 15000,
    dashboard: { maxHttpBufferSize: 1e7 },
}
