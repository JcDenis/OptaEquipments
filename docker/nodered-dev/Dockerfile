# OptaEquipments development image: Node-RED in project mode.
# At each start the project is cloned from GitHub and its packages are installed,
# flows can then be edited and pushed from the Node-RED editor.
# Build from the repository root:
#   docker build -f docker/nodered-dev/Dockerfile -t optaequipments-dev .
FROM nodered/node-red:5.0.9

COPY --chmod=755 docker/nodered-dev/entrypoint.sh /optaequipments-entrypoint.sh

ENV NODE_RED_ENABLE_PROJECTS=true \
    OPTA_REPOSITORY=https://github.com/JcDenis/OptaEquipments \
    OPTA_BRANCH=master \
    TZ=Europe/Paris

EXPOSE 1880

HEALTHCHECK --interval=10s --timeout=5s --retries=3 --start-period=90s \
    CMD node -e "require('net').connect(1880,'127.0.0.1').on('connect',()=>process.exit(0)).on('error',()=>process.exit(1))"

ENTRYPOINT ["/optaequipments-entrypoint.sh"]
