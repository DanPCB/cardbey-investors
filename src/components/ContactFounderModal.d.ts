import type { ReactElement, ReactNode } from "react";

export const REQUEST_GENERAL: "GENERAL_INVESTOR_ENQUIRY";
export const REQUEST_MATERIALS: "INVESTOR_MATERIALS";

type Props = {
  open: boolean;
  onClose: () => void;
  founderName?: string;
  email?: string;
  phone?: string;
  deckUrl?: string | null;
  lang?: string;
  apiPath?: string;
  onSubmit?: (payload: {
    name: string;
    email: string;
    message: string;
    requestType: "GENERAL_INVESTOR_ENQUIRY" | "INVESTOR_MATERIALS";
  }) => void | Promise<void>;
  text?: Record<string, unknown>;
  children?: ReactNode;
};

declare function ContactFounderModal(props: Props): ReactElement;
export function resolveContactApiPath(apiBase?: string): string;
export default ContactFounderModal;
