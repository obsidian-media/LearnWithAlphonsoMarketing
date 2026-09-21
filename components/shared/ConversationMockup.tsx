import { PhoneFrame } from "./PhoneFrame";
import { MicIcon } from "./icons";

export function ConversationMockup() {
  return (
    <PhoneFrame>
      <div className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
        <MicIcon className="size-4 text-coral" />
        Scenario: Ordering coffee
      </div>
      <div className="mt-4 space-y-3">
        <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-cream px-3 py-2 text-sm text-ink">
          Hi! What can I get you today?
        </div>
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-royal px-3 py-2 text-sm text-white">
          I&apos;d like a large latte, please.
        </div>
        <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-cream px-3 py-2 text-sm text-ink">
          Great choice! For here or to go?
        </div>
      </div>
    </PhoneFrame>
  );
}
