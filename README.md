<p align="center">
  <img src="./public/logo.png" lt="Logo" width="80" />
<p>

# UnWork Scout

<p align="center">
  <a href="https://uptime.betterstack.com/?utm_source=status_badge">
    <img src="https://uptime.betterstack.com/status-badges/v3/monitor/10kju.svg" alt="uptime status">
  </a>
</p>

> Global REST API Job Scouting Service

- 🐋 Containerized
- 🪄 CI/CD (Github Action)
- ⚡️ API Route Caching
- 📐 Analytics

## Scouts

| Source Name            | Status     |
| ---------------------- | ---------- |
| Remotive               | Integrated |
| WWR (We Work Remotely) | Pending    |
| Naukri                 | Integrated |
| LinkedIn               | Pending    |
| Indeed                 | Pending    |
| Glassdoor              | Pending    |
| AngelList              | Pending    |
| Monster                | Pending    |
| SimplyHired            | Pending    |
| Hired                  | Pending    |
| ZipRecruiter           | Pending    |
| Stack Overflow Jobs    | Pending    |
| FlexJobs               | Pending    |
| Toptal                 | Pending    |
| PeoplePerHour          | Pending    |
| Remote.co              | Pending    |
| Guru                   | Pending    |
| Upwork                 | Pending    |
| Freelancer.com         | Pending    |
| Workana                | Pending    |

## How to Deploy

1. Initialize Swarm on the Manager Node

```bash
docker swarm init --advertise-addr <MANAGER-IP>
```

2. Join Worker Nodes to the Swarm

```bash
docker swarm join --token <WORKER-TOKEN> <MANAGER-IP>:2377
```

3. Check Node Status

```bash
docker node ls
```

4. Create a docker volume

```bash
docker volume create \
  --name unwork-scout_data \
  --driver local \
  --opt type=none \
  --opt device=~/Algostract/unwork-scout/.data \
  --opt o=bind
```

5. Use Docker Stack to deploy multi-container application

```bash
docker stack deploy --compose-file docker-compose.prod.yml unwork-scout
```

6. Scale service

```bash
docker service scale unwork-scout_app=2
```

7. Verify

```bash
docker service ls
docker service ps unwork-scout_app
```

## License

Published under the [MIT](https://github.com/shba007/unwork-scout/blob/main/LICENSE) license.
<br><br>
<a href="https://github.com/shba007/unwork-scout/graphs/contributors">
<img src="https://contrib.rocks/image?repo=shba007/unwork-scout" />
</a>
