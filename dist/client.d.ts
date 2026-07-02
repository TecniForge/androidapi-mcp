import { ApiResponse } from "./types.js";
export declare function apiGet<T = unknown>(path: string, params?: Record<string, string | number | undefined>): Promise<ApiResponse<T>>;
export declare function apiPostForm<T = unknown>(path: string, body?: Record<string, string | number | undefined>): Promise<ApiResponse<T>>;
export declare function apiPostUrlEncoded<T = unknown>(path: string, body?: Record<string, string | number | undefined>): Promise<ApiResponse<T>>;
//# sourceMappingURL=client.d.ts.map