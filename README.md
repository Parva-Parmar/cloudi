# Cloud Infrastructure Notes

## IP: 192.168.122.1

### NGINX
- **Purpose**: Load balancer, server, security, caching.
- **Features**:
  - Only one entry point.
  - Consolidated security.
  - Minimized exposure.
  - Centralized access control.
  - Centralized logging & monitoring.

#### Enforce HTTP
- Accepts encrypted and denies non-encrypted requests.
- **Segmentation**: Configured in `nginx.config`.

#### Flow
1. AWS load balancer (public) -> NGINX load balancer (not public) -> server.

#### Example
- **Server**: Express -> `index.html` -> client.
- **Setup Command**: `brew install nginx`.

#### Architecture
- Three different applications and one proxy server.
  - The proxy server navigates requests to one of the servers.

#### Important Commands
- `whereis nginx`
- `nginx -V`: View log files.

#### Worker Process
- Responsible for tasks.
- **Threads**:
  - The value determines the number of worker processes NGINX creates (auto).

#### Events
- **Worker Connections**: Default is 1024.
  - Higher values handle more requests but increase memory usage.

#### Load Balancing Algorithms
- Round robin.
- Least connections.

#### Next Task
- Configure **HTTPS**.

---

### Flow and Hosting
1. WebSocket to gRPC, containerization.
2. Host server on NGINX.
3. Host client on Vercel or any equivalent platform.
4. Proxy server (NGINX): Create instances of the server.
5. Implement multi-threading and load balancing.

---

## Replit
- **Each user**: Has their own instance.
- **Compiler**: Uses WebAssembly, so the code runs in the user's browser (no server needed).

#### Goal
- Provide a user with a full terminal and IDE.

#### Key Insight
- Providing one instance per user uses **Docker containers**.

#### Workflow
1. User creates a playground.
2. Server connects to Docker container.
3. Security is ensured.
4. On-demand container spin using AWS EC2.

---

## Server Setup

### Step 1: Create Server Folder
1. Command: `npm init -y`.
2. Install Express (server) and Socket.IO (communication).

#### Code Example
```javascript
const http = require('http'); // Import the http module
const express = require('express');
const { Server: SocketServer } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new SocketServer({
    cors: '*' // Allows authorized resource sharing with external third parties.
});

app.use(cors());
io.attach(server);

io.on('connection', (socket) => {
    console.log(`Socket connected`, socket.id); // Connecting a single user.
});

server.listen(9000, () => console.log(`🐳 Docker server running on port 9000`)); // Docker instance runs on server 9000.
