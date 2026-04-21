module.exports = {
    flowFile: 'flows.json',
    credentialSecret: process.env.NODE_RED_CREDENTIAL_SECRET,
    flowFilePretty: true,
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "$2y$08$gb6w/ss9RkgX/IAolBKs9.vLSWECvKEJwDZpxuVLOBOb56B8sh3.m",
            permissions: "*"
        }],
        sessionExpiryTime : 86400
    },
    httpAdminRoot: '/admin',
    httpNodeRoot: '/',
    diagnostics: {
        enabled: true,
        ui: true,
    },
    runtimeState: {
        enabled: false,
        ui: false,
    },
    logging: {
        console: {
            level: "info",
            metrics: false,
            audit: false
        }
    },
    contextStorage: {
        default: {
            module: "localfilesystem"
        },
        memoryOnly: {
            module: "memory"
        },
    },
    exportGlobalContextKeys: false,
    externalModules: {
    },
    editorTheme: {
        palette: {
        },
        projects: {
            enabled: true,
            workflow: {
                mode: "manual"
            }
        },
        codeEditor: {
            lib: "monaco",
            options: {
            }
        },
        markdownEditor: {
            mermaid: {
                enabled: true
            }
        },
    },
    functionExternalModules: true,
    functionTimeout: 0,
    functionGlobalContext: {
    },
    ui: { path: "" },
    debugMaxLength: 1000,
    mqttReconnectTime: 15000,
    serialReconnectTime: 15000,
}

