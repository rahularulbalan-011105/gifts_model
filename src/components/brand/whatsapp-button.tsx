import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export function WhatsAppButton({
  children = "Chat on WhatsApp",
  message,
  size = "md",
  className,
}: {
  children?: React.ReactNode;
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-13 px-8 text-base",
  };
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp font-medium text-white transition-colors hover:bg-whatsapp-dark",
        sizes[size],
        className,
      )}
    >
      <MessageCircle className="h-4 w-4" />
      {children}
    </a>
  );
}
