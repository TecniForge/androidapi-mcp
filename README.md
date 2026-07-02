# AndroidAPI.net MCP Connector

[![npm version](https://img.shields.io/npm/v/androidapi-mcp)](https://www.npmjs.com/package/androidapi-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue)](https://modelcontextprotocol.io)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org)

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io) connector for **[AndroidAPI.net](https://androidapi.net)** — lets Claude send SMS, WhatsApp messages, OTPs, manage contacts, run USSD codes and more, all via your linked Android device or gateway credits.

---

## Features

- **52 tools** covering every AndroidAPI.net API endpoint
- All tools prefixed with `androidapi_` — no naming conflicts with other MCP servers
- Full tool annotations (`readOnlyHint`, `destructiveHint`, etc.)
- Works with Claude Desktop, Claude Code, and any MCP-compatible host
- TypeScript source, zero runtime deps beyond the official MCP SDK

### Tool Categories

| Category | Tools |
|---|---|
| Account | `androidapi_get_credits` · `androidapi_get_subscription` |
| Partners | `androidapi_get_earnings` |
| Contacts | `androidapi_get_contacts` · `androidapi_create_contact` · `androidapi_delete_contact` · `androidapi_get_groups` · `androidapi_create_group` · `androidapi_delete_group` · `androidapi_get_unsubscribed` · `androidapi_delete_unsubscribed` |
| OTP | `androidapi_send_otp` · `androidapi_verify_otp` |
| SMS | `androidapi_send_sms` · `androidapi_send_sms_bulk` · `androidapi_get_sms_sent` · `androidapi_get_sms_received` · `androidapi_get_sms_pending` · `androidapi_get_sms_message` · `androidapi_get_sms_campaigns` · `androidapi_start_sms_campaign` · `androidapi_stop_sms_campaign` · `androidapi_delete_sms_sent` · `androidapi_delete_sms_received` · `androidapi_delete_sms_campaign` |
| Gateways | `androidapi_get_rates` |
| WhatsApp | `androidapi_send_whatsapp` · `androidapi_send_whatsapp_bulk` · `androidapi_get_wa_accounts` · `androidapi_get_wa_sent` · `androidapi_get_wa_received` · `androidapi_get_wa_pending` · `androidapi_get_wa_message` · `androidapi_get_wa_campaigns` · `androidapi_get_wa_groups` · `androidapi_get_wa_group_contacts` · `androidapi_validate_whatsapp_phone` · `androidapi_link_whatsapp_account` · `androidapi_relink_whatsapp_account` · `androidapi_get_wa_servers` · `androidapi_start_wa_campaign` · `androidapi_stop_wa_campaign` · `androidapi_delete_wa_sent` · `androidapi_delete_wa_received` · `androidapi_delete_wa_campaign` · `androidapi_delete_wa_account` |
| Android | `androidapi_get_devices` · `androidapi_delete_notification` · `androidapi_send_ussd` · `androidapi_get_ussd` · `androidapi_delete_ussd` |
| Miscellaneous | `androidapi_get_shorteners` |

---

## Prerequisites

1. An [AndroidAPI.net](https://androidapi.net) account
2. An API key from **Tools → API Keys** in the dashboard
3. Node.js 18 or higher

---

## Installation

### Option A — npx (recommended, no install needed)

```json
{
  "mcpServers": {
    "androidapi": {
      "command": "npx",
      "args": ["-y", "androidapi-mcp"],
      "env": {
        "ANDROIDAPI_SECRET": "YOUR_API_SECRET"
      }
    }
  }
}
```

### Option B — global install

```bash
npm install -g androidapi-mcp
```

```json
{
  "mcpServers": {
    "androidapi": {
      "command": "androidapi-mcp",
      "env": {
        "ANDROIDAPI_SECRET": "YOUR_API_SECRET"
      }
    }
  }
}
```

---

## Claude Desktop Setup

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)
or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "androidapi": {
      "command": "npx",
      "args": ["-y", "androidapi-mcp"],
      "env": {
        "ANDROIDAPI_SECRET": "YOUR_API_SECRET_HERE"
      }
    }
  }
}
```

Restart Claude Desktop. The `androidapi_*` tools will appear in Claude's tool list.

---

## Claude Code Setup

```bash
claude mcp add androidapi -- npx -y androidapi-mcp
```

Then set your secret in `~/.claude/settings.json` or shell profile:

```json
{
  "mcpServers": {
    "androidapi": {
      "command": "npx",
      "args": ["-y", "androidapi-mcp"],
      "env": {
        "ANDROIDAPI_SECRET": "YOUR_API_SECRET_HERE"
      }
    }
  }
}
```

---

## Example Prompts

Once connected, ask Claude:

- *"Send an SMS to +923012345678 saying 'Your order is ready' using my device"*
- *"Send an OTP to +923001234567 via WhatsApp and verify it when they type it back"*
- *"Create a contact group called 'VIP Customers' and add these numbers to it"*
- *"Send a bulk WhatsApp campaign to my Marketing group with this promotional message"*
- *"Check my remaining AndroidAPI credits"*
- *"Dial \*123# on SIM 1 of my Android device and show me the result"*
- *"Link a new WhatsApp account — show me the QR code to scan"*
- *"List all my sent SMS messages from today"*

---

## Configuration Reference

| Environment Variable | Required | Description |
|---|---|---|
| `ANDROIDAPI_SECRET` | ✅ | Your API key from AndroidAPI.net → Tools → API Keys |

---

## Development

```bash
git clone https://github.com/tecniforge/androidapi-mcp
cd androidapi-mcp
npm install
npm run build
ANDROIDAPI_SECRET=your_key npm start
```

### Project Structure

```
src/
├── index.ts      # MCP server entry point & error handling
├── tools.ts      # Tool definitions with schemas and annotations
├── handlers.ts   # Routes tool calls to API endpoints
├── client.ts     # Typed HTTP client (GET / multipart / URL-encoded)
└── types.ts      # TypeScript interfaces for API responses
```

### Test with MCP Inspector

```bash
ANDROIDAPI_SECRET=your_key npx @modelcontextprotocol/inspector node dist/index.js
```

---

## License

MIT — see [LICENSE](LICENSE)

---

## Claude Cowork Plugin

Prefer a no-code experience? Install the **AndroidAPI.net Cowork Plugin** — a ready-made set of skills for Claude Cowork that wraps this connector with natural language commands.

- `/send-sms` · `/send-whatsapp` · `/send-otp` · `/manage-contacts` · `/sms-campaigns` · `/whatsapp-campaigns`

**[Download Cowork Plugin →](https://github.com/TecniForge/androidapi-cowork-plugin/releases/latest)**  
**[Plugin Repository →](https://github.com/TecniForge/androidapi-cowork-plugin)**

---

## Links

- [AndroidAPI.net](https://androidapi.net) — Official website & dashboard
- [AndroidAPI.net API Docs](https://androidapi.net/docs) — Full API reference
- [MCP Documentation](https://modelcontextprotocol.io) — Model Context Protocol spec
- [TecniForge](https://tecniforge.com) — Built by TecniForge
- [ahmad@tecniforge.com](mailto:ahmad@tecniforge.com)
