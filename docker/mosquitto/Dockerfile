# OptaEquipments MQTT broker: Eclipse Mosquitto with its configuration and
# a user created from OPTA_USERNAME / OPTA_PASSWORD at start.
# Build from the repository root:
#   docker build -f docker/mosquitto/Dockerfile -t optaequipments-mqtt .
FROM eclipse-mosquitto:2

COPY docker/mosquitto/mosquitto.conf /mosquitto/optaequipments.conf
COPY docker/mosquitto/entrypoint.sh /optaequipments-entrypoint.sh
RUN chmod 755 /optaequipments-entrypoint.sh

EXPOSE 1883

HEALTHCHECK --interval=10s --timeout=10s --retries=3 \
    CMD mosquitto_sub -u "$OPTA_USERNAME" -P "$OPTA_PASSWORD" -t '$SYS/#' -C 1 -i healthcheck -W 3 || exit 1

ENTRYPOINT ["/optaequipments-entrypoint.sh"]
CMD ["/usr/sbin/mosquitto", "-c", "/mosquitto/optaequipments.conf"]
