# Proxy: instructions for the AI (the `proxy_switch` tool)

This file explains how to choose the outbound proxy. The plugin package itself carries
**no proxy address at all**: everything goes out directly by default, and the address is
supplied by the user — their own, kept in the entry config rather than in plugin code.

## Why it exists

Models such as Gemini (`google`) are unreachable from some countries. The whole DSH
process then has to go through the user's proxy — models, search and HTTP MCP alike.

## Actions

| `action` | What it does |
|---|---|
| `status` | the current route: mode, address (credentials hidden), bypass list, candidates, the last check, whether `undici` is available, and what the environment holds |
| `check` | **latency check**: walks each candidate with a real request through it and reports the round trip, the exit address and the **country**; `"choose": true` also switches to the fastest one that answered |
| `set` | switches to your own proxy — **by parts** (`host`, `port`, `user`, `password`, `protocol`) or as one `proxy` URL |
| `env` | takes the address from the environment (`HTTPS_PROXY`/`HTTP_PROXY`/`ALL_PROXY`) |
| `off` | returns to a direct connection |
| `help` | returns this text (`lang: "ru"` or `"en"`) |

Extra fields:

- `targets: [{ name, protocol, host, port, user, password }]` — what `check` should test,
  **each proxy with its own parts**. Takes precedence over `proxies`.
- `proxies: ["http://…", "http://…"]` — the same as ready-made URLs. Without either, the
  tool uses the candidates from the entry config (`proxy.candidates`), then the current
  address.
- `choose: true` — after the check, switch to the fastest address that answered.
- `timeout_ms` — how long each proxy gets (default 5000 ms).
- `probe_url` — a tiny page fetched through each proxy to prove it works (default: a
  country-lookup service that reports the exit address and country; if it does not answer,
  the next one in the chain is used).
- `noProxy: ["localhost", "api.example.com"]` — what stays direct. Default: local
  addresses only.
- `export_env: false` — do not hand the proxy variables to child processes
  (`curl`/`git` in the terminal, stdio MCP). They are exported by default.

## Entering an address by parts

Every proxy has its own host, port, login and password, so the fields are separate — no
hand-built URL and no guessing about password encoding:

```json
{"action":"set","protocol":"http","host":"proxy.example.com","port":8080,
 "user":"login","password":"secret","noProxy":["localhost","api.deepseek.com"]}
```

A ready-made URL still works: `{"action":"set","proxy":"http://user:password@host:8080"}`.

## Choosing an address by latency

Keep the candidates in the plugin entry config so they do not have to be repeated on every
call. **The config is empty by default: no proxy is filled in and none is enabled.**

```yaml
- id: rus-image-percent-gen
  name: 'rus-image-percent-gen'
  config:
    proxy:
      enabled: true
      url: 'http://user:password@proxy-a.example.com:8080'   # applied at startup
      candidates:                                            # what to check
        - { name: 'Home', protocol: http, host: proxy-a.example.com, port: 8080, user: u, password: p }
        - 'http://user:password@proxy-b.example.com:8080'
      noProxy: ['localhost', '127.0.0.1']
      exportEnv: true
```

```json
{"action":"check"}
{"action":"check","choose":true}
{"action":"check","proxies":["http://10.0.0.5:3128"],"timeout_ms":2000}
```

The measurement is honest: the request travels **through the proxy**, so the time is the
full round trip to a site, not a ping to a port. A dead address is cut off by a refused
connection or a timeout; a live one reports the exit address, which proves traffic really
went through it.

## A full pass

```json
{"action":"status"}
{"action":"check","choose":true}
{"action":"status"}
{"action":"off"}
```

## Rules and limits

- **HTTP(S) proxies only** (a CONNECT tunnel). There is no SOCKS5 here — that needs a
  dedicated proxy plugin.
- **Credentials are hidden in answers** (`http://***@host:8080`), but the address itself
  sits in the call arguments — do not repeat it in chat when it is a secret.
- **A live proxy is not automatically a usable one.** `check` proves delivery and shows the
  exit address; whether a given service blocks that proxy is only visible from a real model
  request.
- **The in-process proxy is installed through `undici`.** When that package is not
  installed next to the plugin, `set`/`env`/`check` say so plainly — then either install
  `undici` or use a dedicated proxy plugin with a settings card.
- **Never run two mechanisms at once.** If the profile already carries a proxy plugin
  (for example `@memef1f1y/dsh-plugin-proxy`), keep only one enabled: both write the same
  global dispatcher.
- **The proxy has a switch in the sidebar foot and its own settings page** (Settings -> Proxy): the address parts, the
  on/off switch and a latency check with the exit country. Settings made there live in
  `$DSH_HOME/rus-image-percent-gen.json` and, when that file exists, are applied at startup instead
  of `proxy.url` from the entry config.
- The switch lasts until DSH restarts. To have an address applied at startup, put it into
  the plugin entry config (`cordis.patch.yml`, field `proxy.url`) — see the README.
