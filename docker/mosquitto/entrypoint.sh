#!/bin/sh
set -e

# Password file is rebuilt at each start, so that changing
# OPTA_USERNAME / OPTA_PASSWORD only needs a container restart.
if [ -z "$OPTA_USERNAME" ] || [ -z "$OPTA_PASSWORD" ]; then
    echo "OptaEquipments: environment variables OPTA_USERNAME and OPTA_PASSWORD are required" >&2
    exit 1
fi

pf="/mosquitto/config/mosquitto.pass"

mkdir -p /mosquitto/config /mosquitto/data /mosquitto/log
: > "$pf"
chmod 600 "$pf"
mosquitto_passwd -b "$pf" "$OPTA_USERNAME" "$OPTA_PASSWORD"
chown -R mosquitto:mosquitto /mosquitto/config /mosquitto/data /mosquitto/log

exec "$@"
