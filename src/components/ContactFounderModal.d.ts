import type { ReactElement, ReactNode } from "react";

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
  }) => void | Promise<void>;
  text?: Record<string, unknown>;
  children?: ReactNode;
};

declare function ContactFounderModal(props: Props): ReactElement;
export function resolveContactApiPath(apiBase?: string): string;
export default ContactFounderModal;
