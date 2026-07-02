import { Tool } from "@modelcontextprotocol/sdk/types.js";

// All tool names are prefixed with "androidapi_" so they stay unambiguous
// when this server is loaded alongside other MCP servers.

export const TOOLS: Tool[] = [
  // ────────────────────────────────────────────────────────────────────────────
  // ACCOUNT
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: "androidapi_get_credits",
    description: "Get remaining credit balance (and currency) in your AndroidAPI.net account.",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "androidapi_get_subscription",
    description: "Get your current AndroidAPI.net subscription package name and usage stats.",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: { type: "object", properties: {} },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // PARTNERS
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: "androidapi_get_earnings",
    description: "Get your partner earnings from AndroidAPI.net.",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: { type: "object", properties: {} },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // CONTACTS
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: "androidapi_get_contacts",
    description: "List saved contacts (paginated). Returns id, name, phone, and group info.",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Results per page (default 10, max 100)." },
        page: { type: "number", description: "Page number (default 1)." },
      },
    },
  },
  {
    name: "androidapi_create_contact",
    description: "Create a new contact and assign it to one or more groups.",
    annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["phone", "name", "groups"],
      properties: {
        phone: {
          type: "string",
          description: "Phone number in E.164 (+923012345678) or local (03012345678) format.",
        },
        name: { type: "string", description: "Full name of the contact." },
        groups: {
          type: "string",
          description: "Comma-separated group IDs. Get IDs from androidapi_get_groups.",
        },
      },
    },
  },
  {
    name: "androidapi_delete_contact",
    description: "Permanently delete a contact by its ID.",
    annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["id"],
      properties: { id: { type: "number", description: "Contact ID to delete." } },
    },
  },
  {
    name: "androidapi_get_groups",
    description: "List contact groups (paginated).",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number" },
        page: { type: "number" },
      },
    },
  },
  {
    name: "androidapi_create_group",
    description: "Create a new contact group.",
    annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["name"],
      properties: { name: { type: "string", description: "Name of the group." } },
    },
  },
  {
    name: "androidapi_delete_group",
    description: "Delete a contact group by its ID.",
    annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["id"],
      properties: { id: { type: "number", description: "Contact group ID to delete." } },
    },
  },
  {
    name: "androidapi_get_unsubscribed",
    description: "List contacts that have unsubscribed (paginated).",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number" },
        page: { type: "number" },
      },
    },
  },
  {
    name: "androidapi_delete_unsubscribed",
    description: "Remove an unsubscribed contact record by ID.",
    annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["id"],
      properties: { id: { type: "number", description: "Unsubscribed contact ID." } },
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // OTP
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: "androidapi_send_otp",
    description:
      "Send a one-time password (OTP) to a phone number via SMS or WhatsApp. " +
      "Use {{otp}} in the message body to embed the generated code automatically.",
    annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["type", "message", "phone"],
      properties: {
        type: { type: "string", enum: ["sms", "whatsapp"], description: "Delivery channel." },
        message: {
          type: "string",
          description: "OTP message text. Must contain {{otp}} where the code should appear.",
        },
        phone: {
          type: "string",
          description: "Recipient phone number in E.164 format (e.g. +923012345678).",
        },
        expire: { type: "number", description: "OTP expiry in seconds (default 300 = 5 min)." },
        // SMS-only
        mode: {
          type: "string",
          enum: ["devices", "credits"],
          description: "[SMS only] 'devices' = linked Android device; 'credits' = gateway balance.",
        },
        device: { type: "string", description: "[SMS, devices mode] Linked device unique ID." },
        gateway: { type: "string", description: "[SMS, credits mode] Gateway ID or partner device ID." },
        sim: { type: "number", enum: [1, 2], description: "[SMS, devices mode] SIM slot number." },
        // WhatsApp-only
        account: { type: "string", description: "[WhatsApp only] WhatsApp account unique ID." },
        priority: {
          type: "number",
          enum: [1, 2],
          description: "[WhatsApp only] 1 = send immediately, 2 = normal queue.",
        },
      },
    },
  },
  {
    name: "androidapi_verify_otp",
    description:
      "Verify an OTP that was entered by the user. Returns success if the OTP is valid and not expired.",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["otp"],
      properties: { otp: { type: "string", description: "OTP code entered by the user." } },
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // SMS
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: "androidapi_send_sms",
    description: "Send a single SMS to one recipient. Spintax supported in the message body.",
    annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["mode", "phone", "message"],
      properties: {
        mode: {
          type: "string",
          enum: ["devices", "credits"],
          description: "'devices' = linked Android device; 'credits' = gateway/balance.",
        },
        phone: { type: "string", description: "Recipient phone number (E.164 or local format)." },
        message: { type: "string", description: "Message body. Spintax supported." },
        device: { type: "string", description: "[devices mode] Device unique ID." },
        gateway: { type: "string", description: "[credits mode] Gateway or partner device ID." },
        sim: { type: "number", enum: [1, 2], description: "[devices mode] SIM slot." },
        priority: {
          type: "number",
          enum: [0, 1, 2],
          description: "[devices mode] 0/1 = high priority (immediate), 2 = normal queue.",
        },
        shortener: { type: "number", description: "URL shortener ID to apply to links." },
      },
    },
  },
  {
    name: "androidapi_send_sms_bulk",
    description:
      "Send an SMS campaign to multiple phone numbers and/or contact groups. " +
      "Spintax and shortcodes are supported.",
    annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["mode", "campaign", "message"],
      properties: {
        mode: { type: "string", enum: ["devices", "credits"] },
        campaign: { type: "string", description: "Campaign name shown in the campaign manager." },
        numbers: { type: "string", description: "Comma-separated phone numbers. Required if 'groups' is empty." },
        groups: { type: "string", description: "Comma-separated group IDs. Required if 'numbers' is empty." },
        message: { type: "string", description: "Message body. Spintax and shortcodes supported." },
        device: { type: "string" },
        gateway: { type: "string" },
        sim: { type: "number", enum: [1, 2] },
        priority: { type: "number", enum: [0, 1, 2] },
        shortener: { type: "number" },
      },
    },
  },
  {
    name: "androidapi_get_sms_sent",
    description: "List sent SMS messages (paginated).",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      properties: { limit: { type: "number" }, page: { type: "number" } },
    },
  },
  {
    name: "androidapi_get_sms_received",
    description: "List received SMS messages (paginated).",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      properties: { limit: { type: "number" }, page: { type: "number" } },
    },
  },
  {
    name: "androidapi_get_sms_pending",
    description: "List SMS messages currently pending in the send queue (paginated).",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      properties: { limit: { type: "number" }, page: { type: "number" } },
    },
  },
  {
    name: "androidapi_get_sms_message",
    description: "Retrieve a single SMS message by its ID.",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["id", "type"],
      properties: {
        id: { type: "number", description: "Message ID." },
        type: { type: "string", enum: ["sent", "received"] },
      },
    },
  },
  {
    name: "androidapi_get_sms_campaigns",
    description: "List SMS campaigns (paginated).",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      properties: { limit: { type: "number" }, page: { type: "number" } },
    },
  },
  {
    name: "androidapi_start_sms_campaign",
    description: "Resume or start a paused SMS campaign.",
    annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["campaign"],
      properties: { campaign: { type: "number", description: "Campaign ID." } },
    },
  },
  {
    name: "androidapi_stop_sms_campaign",
    description: "Pause a running SMS campaign.",
    annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["campaign"],
      properties: { campaign: { type: "number", description: "Campaign ID." } },
    },
  },
  {
    name: "androidapi_delete_sms_sent",
    description: "Delete a sent SMS message record.",
    annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["id"],
      properties: { id: { type: "number" } },
    },
  },
  {
    name: "androidapi_delete_sms_received",
    description: "Delete a received SMS message record.",
    annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["id"],
      properties: { id: { type: "number" } },
    },
  },
  {
    name: "androidapi_delete_sms_campaign",
    description: "Delete an SMS campaign.",
    annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["id"],
      properties: { id: { type: "number" } },
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // GATEWAYS
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: "androidapi_get_rates",
    description:
      "Get available SMS gateways and partner device rates. " +
      "Use the returned IDs as 'gateway' when sending SMS in 'credits' mode.",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: { type: "object", properties: {} },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // WHATSAPP
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: "androidapi_send_whatsapp",
    description:
      "Send a single WhatsApp message to one recipient. " +
      "Supports text, media (image/audio/video), and document attachments via URL.",
    annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["account", "recipient", "message"],
      properties: {
        account: {
          type: "string",
          description: "WhatsApp account unique ID. Get from androidapi_get_wa_accounts.",
        },
        recipient: { type: "string", description: "Recipient phone (E.164) or WhatsApp group address." },
        type: {
          type: "string",
          enum: ["text", "media", "document"],
          description: "Message type (default: text).",
        },
        message: { type: "string", description: "Message text or caption. Spintax supported." },
        priority: { type: "number", enum: [1, 2], description: "1 = send immediately, 2 = normal queue." },
        media_url: { type: "string", description: "[media] Direct URL to image, gif, mp4, mp3, or ogg." },
        media_type: { type: "string", enum: ["image", "audio", "video"], description: "[media] Required with media_url." },
        document_url: { type: "string", description: "[document] Direct URL to pdf/xls/xlsx/doc/docx/xml." },
        document_name: { type: "string", description: "[document] Filename with extension, e.g. report.pdf." },
        document_type: {
          type: "string",
          enum: ["pdf", "xml", "xls", "xlsx", "doc", "docx"],
          description: "[document] Required with document_url.",
        },
        shortener: { type: "number", description: "URL shortener ID." },
      },
    },
  },
  {
    name: "androidapi_send_whatsapp_bulk",
    description:
      "Send a WhatsApp campaign to multiple recipients or contact groups. " +
      "Supports text, media, and document messages. Spintax and shortcodes supported.",
    annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["account", "campaign", "message"],
      properties: {
        account: { type: "string", description: "WhatsApp account unique ID." },
        campaign: { type: "string", description: "Campaign name." },
        recipients: { type: "string", description: "Comma-separated phones or group addresses. Required if 'groups' empty." },
        groups: { type: "string", description: "Comma-separated contact group IDs. Required if 'recipients' empty." },
        type: { type: "string", enum: ["text", "media", "document"], description: "Default: text." },
        message: { type: "string" },
        media_url: { type: "string" },
        media_type: { type: "string", enum: ["image", "audio", "video"] },
        document_url: { type: "string" },
        document_name: { type: "string" },
        document_type: { type: "string", enum: ["pdf", "xml", "xls", "xlsx", "doc", "docx"] },
        shortener: { type: "number" },
      },
    },
  },
  {
    name: "androidapi_get_wa_accounts",
    description: "List linked WhatsApp accounts (paginated).",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      properties: { limit: { type: "number" }, page: { type: "number" } },
    },
  },
  {
    name: "androidapi_get_wa_sent",
    description: "List sent WhatsApp chats (paginated).",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      properties: { limit: { type: "number" }, page: { type: "number" } },
    },
  },
  {
    name: "androidapi_get_wa_received",
    description: "List received WhatsApp chats (paginated).",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      properties: { limit: { type: "number" }, page: { type: "number" } },
    },
  },
  {
    name: "androidapi_get_wa_pending",
    description: "List WhatsApp messages currently pending in the queue (paginated).",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      properties: { limit: { type: "number" }, page: { type: "number" } },
    },
  },
  {
    name: "androidapi_get_wa_message",
    description: "Retrieve a single WhatsApp message by its ID.",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["id", "type"],
      properties: {
        id: { type: "number" },
        type: { type: "string", enum: ["sent", "received"] },
      },
    },
  },
  {
    name: "androidapi_get_wa_campaigns",
    description: "List WhatsApp campaigns (paginated).",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      properties: { limit: { type: "number" }, page: { type: "number" } },
    },
  },
  {
    name: "androidapi_get_wa_groups",
    description: "List WhatsApp groups that belong to a linked account.",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["unique"],
      properties: { unique: { type: "string", description: "WhatsApp account unique ID." } },
    },
  },
  {
    name: "androidapi_get_wa_group_contacts",
    description: "List all members of a specific WhatsApp group.",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["unique", "gid"],
      properties: {
        unique: { type: "string", description: "WhatsApp account unique ID." },
        gid: { type: "string", description: "WhatsApp group ID." },
      },
    },
  },
  {
    name: "androidapi_validate_whatsapp_phone",
    description: "Check whether a phone number is registered on WhatsApp.",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["unique", "phone"],
      properties: {
        unique: { type: "string", description: "WhatsApp account unique ID to use for the check." },
        phone: { type: "string", description: "Phone number in E.164 format." },
      },
    },
  },
  {
    name: "androidapi_link_whatsapp_account",
    description:
      "Generate a QR code to link a brand-new WhatsApp account. " +
      "Returns a QR image URL and a status link to poll until scanning is complete.",
    annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
    inputSchema: {
      type: "object",
      properties: {
        sid: { type: "number", description: "Optional WhatsApp server ID. Omit to auto-select." },
      },
    },
  },
  {
    name: "androidapi_relink_whatsapp_account",
    description: "Re-generate the QR code to reconnect an existing (disconnected) WhatsApp account.",
    annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["unique"],
      properties: {
        unique: { type: "string", description: "WhatsApp account unique ID to relink." },
        sid: { type: "number", description: "Optional WhatsApp server ID." },
      },
    },
  },
  {
    name: "androidapi_get_wa_servers",
    description: "List available WhatsApp servers for linking accounts.",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "androidapi_start_wa_campaign",
    description: "Resume a paused WhatsApp campaign.",
    annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["campaign"],
      properties: { campaign: { type: "number", description: "Campaign ID." } },
    },
  },
  {
    name: "androidapi_stop_wa_campaign",
    description: "Pause a running WhatsApp campaign.",
    annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["campaign"],
      properties: { campaign: { type: "number", description: "Campaign ID." } },
    },
  },
  {
    name: "androidapi_delete_wa_sent",
    description: "Delete a sent WhatsApp chat record.",
    annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["id"],
      properties: { id: { type: "number" } },
    },
  },
  {
    name: "androidapi_delete_wa_received",
    description: "Delete a received WhatsApp chat record.",
    annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["id"],
      properties: { id: { type: "number" } },
    },
  },
  {
    name: "androidapi_delete_wa_campaign",
    description: "Delete a WhatsApp campaign.",
    annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["id"],
      properties: { id: { type: "number" } },
    },
  },
  {
    name: "androidapi_delete_wa_account",
    description: "Remove a linked WhatsApp account from the system.",
    annotations: { readOnlyHint: false, destructiveHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["unique"],
      properties: { unique: { type: "string", description: "WhatsApp account unique ID." } },
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // ANDROID
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: "androidapi_get_devices",
    description: "List linked Android devices (paginated).",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      properties: { limit: { type: "number" }, page: { type: "number" } },
    },
  },
  {
    name: "androidapi_delete_notification",
    description: "Delete an Android notification record by ID.",
    annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["id"],
      properties: { id: { type: "number", description: "Notification ID." } },
    },
  },
  {
    name: "androidapi_send_ussd",
    description:
      "Send a USSD / MMI request from a linked Android device (e.g. check balance with *123#). " +
      "Use androidapi_get_devices to get valid device IDs.",
    annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["code", "sim", "device"],
      properties: {
        code: { type: "string", description: "USSD/MMI code, e.g. *123# or *100*1#." },
        sim: { type: "number", description: "SIM slot number (1 or 2)." },
        device: { type: "string", description: "Linked device unique ID." },
      },
    },
  },
  {
    name: "androidapi_get_ussd",
    description: "List USSD request history (paginated).",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      properties: { limit: { type: "number" }, page: { type: "number" } },
    },
  },
  {
    name: "androidapi_delete_ussd",
    description: "Delete a USSD request record by ID.",
    annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
    inputSchema: {
      type: "object",
      required: ["id"],
      properties: { id: { type: "number", description: "USSD request ID." } },
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // MISCELLANEOUS
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: "androidapi_get_shorteners",
    description:
      "List available URL shorteners you can use in SMS and WhatsApp campaigns. " +
      "Use the returned ID as the 'shortener' parameter when sending messages.",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: { type: "object", properties: {} },
  },
];
