export interface ApiResponse<T = unknown> {
    status: number;
    message: string;
    data: T;
}
export interface CreditsData {
    credits: string;
    currency: string;
}
export interface SubscriptionData {
    name: string;
    usage: Record<string, unknown>;
}
export interface EarningsData {
    earnings: string;
    currency: string;
}
export interface OtpData {
    phone: string;
    message: string;
    messageId: number;
    otp: number;
}
export interface MessageIdData {
    messageId: number;
}
export interface BulkSmsData {
    messageId: number;
}
export interface BulkWhatsAppData {
    campaignId: number;
    messageIds: number[];
}
export interface GatewayRatesData {
    gateways: unknown[];
    partners: unknown[];
}
export interface WaLinkData {
    qrstring: string;
    qrimagelink: string;
    infolink?: string;
}
export interface WaValidateData {
    jid: string;
    phone: string;
}
//# sourceMappingURL=types.d.ts.map