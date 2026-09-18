import { i18n } from "@lingui/core";
import { Trans, useLingui } from "@lingui/react/macro";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@rakazo/ui-web";
import { Check, Plus } from "lucide-react";

export interface BotThreadSummary {
  id: string;
  createdAt: string;
  unread: boolean;
}

function formatThreadLabel(isoDate: string, locale: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleString(locale || "en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Lets the user start a new, separate conversation under the active bot and
 * switch back to any earlier one. Threads have no title of their own, so
 * each is labeled by when it was started.
 */
export function ThreadSwitcher({
  threads,
  activeThreadId,
  loading,
  onSelectThread,
  onCreateThread,
}: {
  threads: BotThreadSummary[];
  activeThreadId: string | undefined;
  loading: boolean;
  onSelectThread: (threadId: string) => void;
  onCreateThread: () => void;
}) {
  const { t } = useLingui();
  return (
    <div data-testid="thread-switcher" className="w-[min(280px,calc(100vw-2rem))]">
      <Command shouldFilter={false} className="rounded-none border-0 bg-transparent p-0">
        <CommandList className="max-h-80 p-1">
          <CommandGroup>
            <CommandItem
              value="new-chat"
              data-testid="thread-switcher-new-chat"
              onSelect={() => onCreateThread()}
              className="gap-2"
            >
              <Plus size={16} strokeWidth={1.8} aria-hidden="true" />
              <Trans>New Chat</Trans>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={loading ? undefined : t`Conversations`}>
            {threads.map((thread, index) => (
              <CommandItem
                key={thread.id}
                value={thread.id}
                data-testid={`thread-switcher-item-${thread.id}`}
                onSelect={() => onSelectThread(thread.id)}
                className="gap-2"
              >
                <span className="min-w-0 flex-1 truncate">
                  {index === threads.length - 1 ? (
                    <Trans>First conversation</Trans>
                  ) : (
                    formatThreadLabel(thread.createdAt, i18n.locale)
                  )}
                </span>
                {thread.unread ? (
                  <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-foreground" />
                ) : null}
                {thread.id === activeThreadId ? (
                  <Check size={15} strokeWidth={2} aria-hidden="true" className="shrink-0" />
                ) : null}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
