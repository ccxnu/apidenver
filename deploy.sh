#!/bin/bash

# Ir al directorio del script
cd "$(dirname "$0")"
echo ">> Start"

# Variables
NAME_CONTAINER="ws_denver"
NAME_IMAGE="img_ws_denver"
PORT_EXPOSE=8048
ENV_FILE="/CONFIG/VARIABLES_ENTORNO/denver/.env"
TIMEZONE="America/Guayaquil"
NETWORK="ists"

docker build --target production -t "$NAME_IMAGE" -f Dockerfile .

echo ">> Compiled successfully"

# Si el contenedor existe, bórralo
if docker ps -a --format '{{.Names}}' | grep -q "^$NAME_CONTAINER$"; then
    echo ">> Removing the existing container"
    docker rm -f "$NAME_CONTAINER"
fi

docker run -d \
    --restart=always \
    --name "$NAME_CONTAINER" \
    --env-file "$ENV_FILE" \
    --network "$NETWORK" \
    -e TZ="$TIMEZONE" \
    -p "$PORT_EXPOSE":3000 \
    "$NAME_IMAGE"

echo ">> Successfully service"
