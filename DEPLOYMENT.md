# Singapore Server Deployment

This guide deploys `lunartuliplab.com` on an Ubuntu server behind Nginx. Run the commands on the Singapore server as a normal sudo-enabled user. Do not paste passwords, private keys or tokens into issues, commits or chat.

## 1. DNS records

In Alibaba Cloud DNS, preserve all existing enterprise-email records, especially MX, SPF, DKIM and DMARC.

Add only the website records:

| Host | Type | Value |
|---|---|---|
| `@` | `A` | Singapore server public IPv4 |
| `www` | `CNAME` | `lunartuliplab.com` |

Do not create an `@` CNAME because it can conflict with the domain's MX records.

## 2. Install system packages

```bash
sudo apt update
sudo apt install -y git nginx certbot python3-certbot-nginx
```

Install Node.js 22 LTS or newer and verify:

```bash
node --version
npm --version
```

Node must be `>=22.13.0`.

## 3. Clone and build

```bash
sudo mkdir -p /srv/lunartulip
sudo chown -R "$USER":"$USER" /srv/lunartulip
git clone https://github.com/Lunartulip/web_official.git /srv/lunartulip/web_official
cd /srv/lunartulip/web_official
npm ci
npm run build:server
```

## 4. Create a systemd service

Find the absolute npm path:

```bash
which npm
```

Create `/etc/systemd/system/lunartulip-web.service` and replace `/usr/bin/npm` if `which npm` returns a different path:

```ini
[Unit]
Description=LunarTulip Lab official website
After=network.target

[Service]
Type=simple
User=YOUR_LINUX_USER
WorkingDirectory=/srv/lunartulip/web_official
Environment=NODE_ENV=production
Environment=PORT=3000
ExecStart=/usr/bin/npm run start:server
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Replace `YOUR_LINUX_USER`, then enable it:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now lunartulip-web
sudo systemctl status lunartulip-web --no-pager
```

Verify locally on the server:

```bash
curl -I http://127.0.0.1:3000
```

## 5. Configure Nginx

Create `/etc/nginx/sites-available/lunartulip`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name lunartuliplab.com www.lunartuliplab.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and verify:

```bash
sudo ln -s /etc/nginx/sites-available/lunartulip /etc/nginx/sites-enabled/lunartulip
sudo nginx -t
sudo systemctl reload nginx
```

If the default Nginx site conflicts, remove only its enabled symlink:

```bash
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## 6. HTTPS

Wait until both DNS records resolve to the Singapore server, then run:

```bash
sudo certbot --nginx -d lunartuliplab.com -d www.lunartuliplab.com
sudo certbot renew --dry-run
```

Choose the HTTPS redirect when prompted.

## 7. Firewall

If UFW is enabled:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw status
```

Do not expose port `3000` publicly; Nginx should be the public entry point.

## 8. Updating the website

```bash
cd /srv/lunartulip/web_official
git pull --ff-only
npm ci
npm run build:server
sudo systemctl restart lunartulip-web
sudo systemctl status lunartulip-web --no-pager
```

## 9. Launch verification

Check all of the following:

- `https://lunartuliplab.com`
- `https://www.lunartuliplab.com`
- Chinese / English switching
- Capability Map and Workflow controls
- desktop and mobile layouts
- logo and image loading
- `mailto:t.stephanie@lunartuliplab.com`
- email sending and receiving remain healthy after DNS changes

## Rollback

Before an update, record the current commit:

```bash
git rev-parse HEAD
```

To roll back, check out the known-good commit, rebuild and restart:

```bash
git checkout KNOWN_GOOD_COMMIT
npm ci
npm run build:server
sudo systemctl restart lunartulip-web
```
