import { apiGet, apiPostForm, apiPostUrlEncoded } from "./client.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Args = Record<string, any>;

export async function handleTool(name: string, args: Args): Promise<unknown> {
  const a = args ?? {};

  switch (name) {
    // ── Account ─────────────────────────────────────────────────────────────
    case "androidapi_get_credits":      return apiGet("/get/credits");
    case "androidapi_get_subscription": return apiGet("/get/subscription");

    // ── Partners ─────────────────────────────────────────────────────────────
    case "androidapi_get_earnings": return apiGet("/get/earnings");

    // ── Contacts ─────────────────────────────────────────────────────────────
    case "androidapi_get_contacts":
      return apiGet("/get/contacts", { limit: a.limit, page: a.page });
    case "androidapi_create_contact":
      return apiPostForm("/create/contact", { phone: a.phone, name: a.name, groups: a.groups });
    case "androidapi_delete_contact":
      return apiGet("/delete/contact", { id: a.id });
    case "androidapi_get_groups":
      return apiGet("/get/groups", { limit: a.limit, page: a.page });
    case "androidapi_create_group":
      return apiPostForm("/create/group", { name: a.name });
    case "androidapi_delete_group":
      return apiGet("/delete/group", { id: a.id });
    case "androidapi_get_unsubscribed":
      return apiGet("/get/unsubscribed", { limit: a.limit, page: a.page });
    case "androidapi_delete_unsubscribed":
      return apiGet("/delete/unsubscribed", { id: a.id });

    // ── OTP ──────────────────────────────────────────────────────────────────
    case "androidapi_send_otp":
      return apiPostForm("/send/otp", {
        type: a.type, message: a.message, phone: a.phone,
        expire: a.expire, priority: a.priority, account: a.account,
        mode: a.mode, device: a.device, gateway: a.gateway, sim: a.sim,
      });
    case "androidapi_verify_otp":
      return apiGet("/get/otp", { otp: a.otp });

    // ── SMS ──────────────────────────────────────────────────────────────────
    case "androidapi_send_sms":
      return apiPostForm("/send/sms", {
        mode: a.mode, phone: a.phone, message: a.message,
        device: a.device, gateway: a.gateway, sim: a.sim,
        priority: a.priority, shortener: a.shortener,
      });
    case "androidapi_send_sms_bulk":
      return apiPostForm("/send/sms.bulk", {
        mode: a.mode, campaign: a.campaign, numbers: a.numbers,
        groups: a.groups, message: a.message, device: a.device,
        gateway: a.gateway, sim: a.sim, priority: a.priority, shortener: a.shortener,
      });
    case "androidapi_get_sms_sent":
      return apiGet("/get/sms.sent", { limit: a.limit, page: a.page });
    case "androidapi_get_sms_received":
      return apiGet("/get/sms.received", { limit: a.limit, page: a.page });
    case "androidapi_get_sms_pending":
      return apiGet("/get/sms.pending", { limit: a.limit, page: a.page });
    case "androidapi_get_sms_message":
      return apiGet("/get/sms.message", { id: a.id, type: a.type });
    case "androidapi_get_sms_campaigns":
      return apiGet("/get/sms.campaigns", { limit: a.limit, page: a.page });
    case "androidapi_start_sms_campaign":
      return apiGet("/remote/start.sms", { campaign: a.campaign });
    case "androidapi_stop_sms_campaign":
      return apiGet("/remote/stop.sms", { campaign: a.campaign });
    case "androidapi_delete_sms_sent":
      return apiGet("/delete/sms.sent", { id: a.id });
    case "androidapi_delete_sms_received":
      return apiGet("/delete/sms.received", { id: a.id });
    case "androidapi_delete_sms_campaign":
      return apiGet("/delete/sms.campaign", { id: a.id });

    // ── Gateways ─────────────────────────────────────────────────────────────
    case "androidapi_get_rates": return apiGet("/get/rates");

    // ── WhatsApp ─────────────────────────────────────────────────────────────
    case "androidapi_send_whatsapp":
      return apiPostForm("/send/whatsapp", {
        account: a.account, recipient: a.recipient, type: a.type,
        message: a.message, priority: a.priority,
        media_url: a.media_url, media_type: a.media_type,
        document_url: a.document_url, document_name: a.document_name,
        document_type: a.document_type, shortener: a.shortener,
      });
    case "androidapi_send_whatsapp_bulk":
      return apiPostUrlEncoded("/send/whatsapp.bulk", {
        account: a.account, campaign: a.campaign,
        recipients: a.recipients, groups: a.groups, type: a.type,
        message: a.message, media_url: a.media_url, media_type: a.media_type,
        document_url: a.document_url, document_name: a.document_name,
        document_type: a.document_type, shortener: a.shortener,
      });
    case "androidapi_get_wa_accounts":
      return apiGet("/get/wa.accounts", { limit: a.limit, page: a.page });
    case "androidapi_get_wa_sent":
      return apiGet("/get/wa.sent", { limit: a.limit, page: a.page });
    case "androidapi_get_wa_received":
      return apiGet("/get/wa.received", { limit: a.limit, page: a.page });
    case "androidapi_get_wa_pending":
      return apiGet("/get/wa.pending", { limit: a.limit, page: a.page });
    case "androidapi_get_wa_message":
      return apiGet("/get/wa.message", { id: a.id, type: a.type });
    case "androidapi_get_wa_campaigns":
      return apiGet("/get/wa.campaigns", { limit: a.limit, page: a.page });
    case "androidapi_get_wa_groups":
      return apiGet("/get/wa.groups", { unique: a.unique });
    case "androidapi_get_wa_group_contacts":
      return apiGet("/get/wa.group.contacts", { unique: a.unique, gid: a.gid });
    case "androidapi_validate_whatsapp_phone":
      return apiGet("/validate/whatsapp", { unique: a.unique, phone: a.phone });
    case "androidapi_link_whatsapp_account":
      return apiGet("/create/wa.link", { sid: a.sid });
    case "androidapi_relink_whatsapp_account":
      return apiGet("/create/wa.relink", { unique: a.unique, sid: a.sid });
    case "androidapi_get_wa_servers":
      return apiGet("/get/wa.servers");
    case "androidapi_start_wa_campaign":
      return apiGet("/remote/start.chats", { campaign: a.campaign });
    case "androidapi_stop_wa_campaign":
      return apiGet("/remote/stop.chats", { campaign: a.campaign });
    case "androidapi_delete_wa_sent":
      return apiGet("/delete/wa.sent", { id: a.id });
    case "androidapi_delete_wa_received":
      return apiGet("/delete/wa.received", { id: a.id });
    case "androidapi_delete_wa_campaign":
      return apiGet("/delete/wa.campaign", { id: a.id });
    case "androidapi_delete_wa_account":
      return apiGet("/delete/wa.account", { unique: a.unique });

    // ── Android ───────────────────────────────────────────────────────────────
    case "androidapi_get_devices":
      return apiGet("/get/devices", { limit: a.limit, page: a.page });
    case "androidapi_delete_notification":
      return apiGet("/delete/notification", { id: a.id });
    case "androidapi_send_ussd":
      return apiPostForm("/send/ussd", { code: a.code, sim: a.sim, device: a.device });
    case "androidapi_get_ussd":
      return apiGet("/get/ussd", { limit: a.limit, page: a.page });
    case "androidapi_delete_ussd":
      return apiGet("/delete/ussd", { id: a.id });

    // ── Miscellaneous ─────────────────────────────────────────────────────────
    case "androidapi_get_shorteners":
      return apiGet("/get/shorteners");

    default:
      throw new Error(
        `Unknown tool: ${name}. Check androidapi_get_credits or androidapi_get_wa_accounts to explore available tools.`
      );
  }
}
