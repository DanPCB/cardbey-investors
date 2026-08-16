/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_INVESTOR_PLATFORM_V2?: string;
  readonly VITE_ENABLE_INVESTOR_PLATFORM_V3?: string;
  readonly VITE_INVESTOR_V3_PRIMARY?: string;
  readonly VITE_INVESTOR_V2_REVIEW_MODE?: string;
  readonly VITE_INVESTOR_V2_PUBLIC?: string;
  readonly VITE_INVESTOR_V2_PRIMARY?: string;
  readonly VITE_IR_PACK_EN?: string;
  readonly VITE_IR_PACK_VI?: string;
  readonly VITE_IR_SAFE_EN?: string;
  readonly VITE_IR_SAFE_VI?: string;
  readonly VITE_IR_FOUNDER?: string;
  readonly VITE_IR_FOUNDER_NAME?: string;
  readonly VITE_IR_CALENDLY?: string;
  readonly VITE_API_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
