# Opta Equipments

A live equipment dashboard application built with Node-RED, leveraging real-time data from Opta sources through MQTT and InfluxDB for storage and visualization.

## About

**Opta Equipments** is a comprehensive IoT dashboard solution that collects, processes, and visualizes equipment data in real-time. It uses:
- **Node-RED** - Visual programming platform for IoT flows
- **MQTT** - Lightweight messaging protocol for equipment data
- **InfluxDB** - Time-series database for historical data
- **Node-RED Dashboard** - Interactive web-based UI

**Finder Arduino Opta** devices MUST use [OptaLinker](https://github.com/JcDenis/OptaLinker) firwmare. Then point Opta MQTT broker to the OptaEquipments address. That's it.

## Prerequisites

Before installing Opta Equipments, ensure you have:
- **Docker** (version 20.10+)
- **Docker Compose** (version 1.29+)
- **Git** (for cloning the repository)
- At least 4GB of available RAM
- 10GB of available disk space

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/JcDenis/OptaEquipments.git
cd OptaEquipments
```

### Step 2: Configure Environment Variables

Create a `.env` file in the project root with the required credentials:

```bash
# MQTT Credentials (for Mosquitto broker)
OPTA_USERNAME=your_mqtt_username
OPTA_PASSWORD=your_mqtt_password

# Node-RED and InfluxDB Admin Credentials
OPTA_ADMIN_USERNAME=admin
OPTA_ADMIN_PASSWORD=your_secure_password

# InfluxDB Secret Token (for Node-RED authentication)
OPTA_SECRET=your_secret_token_here

# Telegram bot
OPTA_TELEGRAM_BOT=your_telegram_bot_token
OPTA_TELEGRAM_CHAT=your_authorized_telegram_chat_id
```

**⚠️ Security Note:** Use strong passwords, especially for `OPTA_ADMIN_PASSWORD` and `OPTA_SECRET`. Do not commit the `.env` file to version control.

### Step 3: Start the Services

Launch all services using Docker Compose:

```bash
docker-compose up -d
```

The `-d` flag runs containers in detached mode. To see logs, use:

```bash
docker-compose logs -f
```

### Step 4: Verify Installation

Wait 30-60 seconds for all services to initialize, then verify their status:

```bash
docker-compose ps
```

All containers should show `healthy` or `running` status.

## Accessing the Services

### Node-RED Dashboard
- **URL:** http://localhost:1880/admin
- **Username:** `OPTA_ADMIN_USERNAME` (from `.env`)
- **Password:** `OPTA_ADMIN_PASSWORD` (from `.env`)
- **Dashboard UI:** http://localhost:1880

### InfluxDB
- **URL:** http://localhost:8086
- **Organization:** `optaequipments`
- **Bucket:** `state`
- **Default Retention:** 700 days
- **Admin Token:** `OPTA_SECRET` (from `.env`)

### MQTT Broker (Mosquitto)
- **Host:** `localhost`
- **Port:** `1883`
- **Username:** `OPTA_USERNAME` (from `.env`)
- **Password:** `OPTA_PASSWORD` (from `.env`)

## Project Structure

```
OptaEquipments/
├── README.md                      # This file
├── package.json                   # Node-RED dependencies
├── docker-compose.yaml            # Docker services configuration
├── flows.json                     # Node-RED flow definitions
├── flows_cred.json                # Node-RED encrypted credentials
├── flow-manager-cfg.json          # Flow manager configuration
├── flow-manager-nodes-order.json  # Node ordering configuration
├── config-nodes.yaml              # Node-RED config nodes
├── data/                          # Data and configuration files
└── flows/                         # Flow directory
```

## Key Dependencies

The project includes the following Node-RED packages:

| Package | Version | Purpose |
|---------|---------|---------|
| @flowfuse/node-red-dashboard | 1.30.2 | Web-based dashboard UI |
| node-red-contrib-influxdb | 0.7.0 | InfluxDB integration |
| node-red-node-base64 | 1.0.0 | Base64 encoding/decoding |
| node-red-contrib-moment | 5.0.0 | Time/date utilities |
| node-red-contrib-bcrypt | 0.1.6 | Password hashing |
| node-red-contrib-flow-manager | 0.7.4 | Flow management tools |
| node-red-contrib-os | 0.2.1 | System resources usage |
| node-red-contrib-telegrambot | 17.4.12 | Telegram bot nodes for Node-RED |

## Managing Containers

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f nodered
docker-compose logs -f influxdb
docker-compose logs -f mosquitto
```

### Restart a Service
```bash
docker-compose restart nodered
```

### View Running Containers
```bash
docker-compose ps
```

## Configuration

### Node-RED Settings
Node-RED is configured with:
- **Admin Authentication** - Enabled with credentials from `.env`
- **Projects** - Enabled for version control integration
- **Dashboard** - Accessible at `/`
- **Modbus Support** - Port 502 available
- **Auto-Module Installation** - External modules auto-install on demand

### InfluxDB Setup
- **Organization:** `optaequipments`
- **Bucket:** `state` (stores all time-series data)
- **Retention Policy:** 700 days of historical data
- **Admin Token:** Required for Node-RED InfluxDB queries

### MQTT Configuration
- **Anonymous Access:** Disabled (authentication required)
- **Persistence:** Enabled
- **Port:** 1883 (standard MQTT)
- **Password File:** Automatically generated on first run

## Resource Limits

The services are configured with the following resource constraints:

| Service | CPU | Memory |
|---------|-----|--------|
| Node-RED | 2.0 cores | 2048 MB |
| InfluxDB | 1.0 cores | 1024 MB |
| Mosquitto | 1.0 cores | 1024 MB |

Adjust these in `docker-compose.yaml` if needed for your hardware.

## Data Persistence

All services use Docker volumes for persistent data:

| Volume | Service | Contents |
|--------|---------|----------|
| `nodered_data` | Node-RED | Flows, projects, settings |
| `influxdb_etc` | InfluxDB | Configuration files |
| `influxdb_lib` | InfluxDB | Time-series databases |
| `mosquitto_config` | Mosquitto | MQTT configuration |
| `mosquitto_data` | Mosquitto | MQTT persistence |
| `mosquitto_log` | Mosquitto | MQTT logs |

Data persists even after containers are stopped or removed.

## Troubleshooting

### Containers Won't Start
Check Docker Compose logs:
```bash
docker-compose logs
```

Ensure environment variables are set in `.env` file.

### Can't Access Node-RED Dashboard
1. Wait 60-90 seconds for Node-RED to fully initialize
2. Verify container is running: `docker-compose ps`
3. Check logs: `docker-compose logs nodered`

### MQTT Connection Failed
1. Verify Mosquitto container is healthy: `docker-compose ps mosquitto`
2. Check credentials in `.env` match MQTT node configuration
3. Verify network connectivity: `docker-compose logs mosquitto`

### InfluxDB Connection Issues
1. Ensure InfluxDB is fully initialized (check logs)
2. Verify `OPTA_SECRET` token is correctly set
3. Check InfluxDB health: `docker-compose exec influxdb influx health`

### High Memory Usage
1. Check which service is consuming memory: `docker stats`
2. Reduce retention period in InfluxDB if needed
3. Increase memory limit in `docker-compose.yaml`

### Performance Issues
1. Check Node-RED logs for errors: `docker-compose logs nodered`
2. Monitor CPU/memory: `docker stats`
3. Verify MQTT message rate isn't excessive
4. Check InfluxDB query performance

## Maintenance

### Backup Data
```bash
# Backup InfluxDB data
docker-compose exec influxdb influx backup /backups

# Backup Node-RED projects
docker cp nodered:/data ./backup_nodered_data
```

### Update to Latest Version
```bash
# Stop current services
docker-compose down

# Update repository
git pull origin master

# Restart services
docker-compose up -d
```

### Clean Up Volumes (⚠️ Data Loss)
```bash
# Remove all volumes (deletes all data)
docker-compose down -v

# Restart fresh
docker-compose up -d
```

### Monitor Service Health
```bash
# View health status
docker-compose ps

# Check specific service health
docker-compose exec nodered nc -zv localhost 1880
```

## Networking

All services communicate through a dedicated Docker network (`optanet`). To connect external applications:

- **Node-RED API:** `http://localhost:1880`
- **InfluxDB API:** `http://localhost:8086`
- **MQTT Broker:** `localhost:1883`

## Security Recommendations

1. **Change default passwords** - Use strong, unique passwords in `.env`
2. **Network isolation** - Don't expose MQTT port 1883 to public networks
3. **Firewall rules** - Restrict access to ports 1880, 8086, 1883
4. **Regular updates** - Keep Docker images and packages updated
5. **Credential rotation** - Periodically update passwords and tokens
6. **Backup credentials** - Store `.env` securely, never commit to git

## Support & Contribution

For issues, questions, or contributions:
- **GitHub Issues:** https://github.com/JcDenis/OptaEquipments/issues
- **GitHub Discussions:** https://github.com/JcDenis/OptaEquipments/discussions

## License

See LICENSE file for details.
