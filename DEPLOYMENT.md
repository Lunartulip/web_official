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

## 4. Configure SMTP secrets

The institutional inquiry endpoint sends through the existing enterprise mailbox. Keep its credentials outside Git and make the environment file readable only by root:

```bash
sudo install -m 600 -o root -g root /dev/null /etc/lunartulip-web.env
sudoedit /etc/lunartulip-web.env
```

Set every variable below. Use the values supplied by the enterprise-email provider; `SMTP_SECURE=true` is normally used with port `465`, while STARTTLS on port `587` normally uses `false`.

```dotenv
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=enterprise-mailbox@example.com
SMTP_PASSWORD=REPLACE_WITH_SECRET
SMTP_FROM=Lunartulip Lab <enterprise-mailbox@example.com>
SMTP_TO=chief@lunartuliplab.com
```

Do not commit this file, paste it into deployment logs, or place the password directly in the systemd unit.

## 5. Create a systemd service

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
EnvironmentFile=/etc/lunartulip-web.env
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

## 6. Configure Nginx

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

## 7. HTTPS

Wait until both DNS records resolve to the Singapore server, then run:

```bash
sudo certbot --nginx -d lunartuliplab.com -d www.lunartuliplab.com
sudo certbot renew --dry-run
```

Choose the HTTPS redirect when prompted.

## 8. Firewall

In the Alibaba Cloud ECS security group, allow inbound TCP `80` and `443` from `0.0.0.0/0`. Keep SSH `22` restricted to trusted administrator IPs whenever possible. The cloud security group applies before UFW, so both layers must permit web traffic.

If UFW is enabled:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw status
```

Do not expose port `3000` publicly; Nginx should be the public entry point.

## 9. Updating the website

```bash
cd /srv/lunartulip/web_official
git pull --ff-only
npm ci
npm run build:server
sudo systemctl restart lunartulip-web
sudo systemctl status lunartulip-web --no-pager
```

## 10. Launch verification

Check all of the following:

- `https://lunartuliplab.com`
- `https://www.lunartuliplab.com`
- Chinese / English switching
- Capability Map and Workflow controls
- desktop and mobile layouts
- logo and image loading
- `mailto:chief@lunartuliplab.com`
- email sending and receiving remain healthy after DNS changes
- Chinese and English Institutional Access pages show all four inquiry routes
- Diagnostic pricing displays `¥100,000` and `US$15,000` as starting prices
- a successful structured inquiry arrives at `SMTP_TO`, and its subject/body contain exactly one submitted `source` and `intent`
- Reply-To on the received inquiry is the form submitter's email
- validation errors, SMTP delivery failures and the no-JavaScript response are readable and retain the direct-email fallback
- submitting an empty honeypot succeeds, while a populated `companyWebsite` field is rejected
- cross-origin POST requests are rejected with HTTP `403`; repeated requests exceed the single-instance limit with HTTP `429`

After HTTPS is active, test the endpoint from the server with the production origin (use a real test inbox and a non-sensitive research question):

```bash
curl -i 'https://lunartuliplab.com/api/institutional-inquiry' \
  -H 'Origin: https://lunartuliplab.com' \
  -H 'Content-Type: application/json' \
  --data '{"source":"institutional_access","intent":"sample_request","language":"en","pagePath":"/en/institutional-access","organization":"Launch Test Institution","role":"Research Operations","name":"Launch Test","email":"YOUR_TEST_EMAIL","researchQuestion":"Please provide a representative institutional sample.","timeline":"Within two weeks","companyWebsite":""}'
```

Expect HTTP `200` and confirm delivery. Then inspect service logs without exposing environment values:

```bash
sudo journalctl -u lunartulip-web -n 100 --no-pager
```

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
