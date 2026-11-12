# OptaEquipments application image: Node-RED with flows, settings and packages built in.
# Build from the repository root:
#   docker build -f docker/nodered/Dockerfile -t optaequipments .
FROM nodered/node-red:5.0.9

USER root
RUN mkdir -p /app /data && chown node-red:node-red /app /data
USER node-red
WORKDIR /app

# Packages first, to keep them in the build cache while flows change.
# node-red-contrib-flow-manager is only a development tool (flows split in YAML files).
COPY --chown=node-red:node-red package.json /app/package.json
RUN node -e "const fs=require('fs');const p=require('/app/package.json');delete p.dependencies['node-red-contrib-flow-manager'];fs.writeFileSync('/app/package.json',JSON.stringify(p,null,4));" \
    && npm install --unsafe-perm --no-update-notifier --no-fund --no-audit --omit=dev \
    && npm cache clean --force

COPY --chown=node-red:node-red flows.json flows_cred.json /app/
COPY --chown=node-red:node-red data/admin.png /app/admin.png
COPY --chown=node-red:node-red docker/nodered/settings.js /app/settings.js

# Application data (context files, kernel and users backups) lives in /data
VOLUME ["/data"]

ENV OPTA_PACKAGE=/app/package.json \
    TZ=Europe/Paris

EXPOSE 1880

HEALTHCHECK --interval=10s --timeout=5s --retries=3 --start-period=60s \
    CMD node -e "require('net').connect(1880,'127.0.0.1').on('connect',()=>process.exit(0)).on('error',()=>process.exit(1))"

STOPSIGNAL SIGINT
WORKDIR /usr/src/node-red
ENTRYPOINT ["node", "node_modules/node-red/red.js", "--userDir", "/app", "--settings", "/app/settings.js"]
