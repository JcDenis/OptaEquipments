#!/bin/sh
# Same steps as the entrypoint of the nodered service in docker-compose.yaml

project="/data/projects/OptaEquipments"

for name in OPTA_ADMIN_USERNAME OPTA_ADMIN_PASSWORD OPTA_SECRET; do
    eval "value=\${$name}"
    if [ -z "$value" ]; then
        echo "OptaEquipments: environment variable $name is required" >&2
        exit 1
    fi
done

# The project is replaced only when the repository is reachable
if [ -n "$(git ls-remote "$OPTA_REPOSITORY" "$OPTA_BRANCH")" ]; then
    echo "> Deleting old project"
    rm -Rf "$project"
fi

echo "> Cloning project"
git clone --branch "$OPTA_BRANCH" "$OPTA_REPOSITORY" "$project"

if [ ! -f "$project/package.json" ]; then
    echo "OptaEquipments: no project found in $project" >&2
    exit 1
fi

echo "> Creating settings"
cp "$project/package.json" /data/package.json
cp "$project/data/settings.js" /data/settings.js
cp "$project/data/.config.projects.json" /data/.config.projects.json
cp "$project/data/admin.png" /data/admin.png
mkdir -p /data/optaequipments
hash="$(expr substr "$(echo "${OPTA_ADMIN_PASSWORD}" | node-red admin hash-pw)" 11 100)"
sed -i -e "s|OPTA_ADMIN_USERNAME|${OPTA_ADMIN_USERNAME}|g" /data/settings.js
sed -i -e "s|OPTA_ADMIN_HASH|${hash}|g" /data/settings.js
sed -i -e "s|OPTA_SECRET|${OPTA_SECRET}|g" /data/settings.js

echo "> Installing packages"
cd /data || exit 1
npm install --unsafe-perm --no-update-notifier --no-fund --omit=dev

echo "> Running node-red"
cd /usr/src/node-red || exit 1
exec ./entrypoint.sh
