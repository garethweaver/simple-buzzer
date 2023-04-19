# Simple Buzzer

A low latency localhost solution to hosting a gameshow using express and socket.io. Run the server and allow people to connect
to your local IP. The admin page is protected by the env var.


### Setup

1. `cp .env.example .env`
2. add an admin password to `.env`
3. `yarn start`
4. send users to your local IP eg: `http://192.168.1.153:3000`

### Routes
* `/` two buttons to trigger team buzzers
* `/display` shows a screen with the teamname when buzz happens
* `/admin` admin panel to lock buzzers and show buzz logs, plays the buzzer sounds!
