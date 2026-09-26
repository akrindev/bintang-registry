"use client";

import * as React from "react";
import { Bot, History, Mic, Pencil, Plus, X } from "lucide-react";
import { ShopifySidebar } from "@/components/shopify-sidebar";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const SWEATER_IMG =
  "https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/en/assets/cream-sweater-01dd07d7d289.png?width=450";
const CHAIR_IMG =
  "https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/en/assets/green-chair-8aaed6f645ac.png?width=400";

interface SetupCard {
  eyebrow?: string;
  title: string;
  body: string;
  cta: string;
}

const CARDS: SetupCard[] = [
  {
    title: "Add something to sell",
    body: "A title, a price, and a photo is enough to start selling. Add detail later.",
    cta: "Add product",
  },
  {
    title: "Choose your store design",
    body: "Start with a free theme. You can refine it once you're selling.",
    cta: "Choose theme",
  },
  {
    title: "Set up payments",
    body: "Choose a payment provider to let customers pay by card or digital wallet.",
    cta: "Activate payments",
  },
  {
    eyebrow: "Get $20 back",
    title: "Claim your store's web address",
    body: "Give your store a branded URL that's easy to find, trust, and remember.",
    cta: "Set up domain",
  },
  {
    title: "Review shipping rates",
    body: "Your rates decide what customers pay at checkout — and what you cover.",
    cta: "Set your rates",
  },
];

function CardIllustration({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="relative h-full w-full">
        <img
          src={SWEATER_IMG}
          alt=""
          className="absolute bottom-0 left-[6%] h-[88%] object-contain"
        />
        <img
          src={CHAIR_IMG}
          alt=""
          className="absolute bottom-0 right-[5%] h-[92%] object-contain"
        />
        <div className="absolute left-1/2 top-1/2 flex h-[128px] w-[128px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[12px] border-2 border-dashed border-zinc-300 bg-white">
          <Plus className="h-5 w-5 text-zinc-700" />
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="relative h-full w-full">
        <div className="absolute bottom-2 left-[10%] h-[80%] w-[38%] -rotate-6 rounded-[10px] border border-zinc-200 bg-gradient-to-br from-sky-100 to-white shadow-sm" />
        <div className="absolute bottom-2 right-[10%] h-[80%] w-[38%] rotate-6 rounded-[10px] border border-zinc-200 bg-white shadow-sm">
          <span className="absolute left-2 top-2 text-[22px] font-black tracking-tight text-red-500">
            CH
          </span>
        </div>
        <div className="absolute left-1/2 top-1/2 flex h-[128px] w-[128px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[12px] border-2 border-dashed border-zinc-300 bg-white">
          <span className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-zinc-700 text-[20px] font-semibold text-white">
            Aa
          </span>
        </div>
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="relative h-full w-full">
        <div className="absolute bottom-[30%] left-[12%] -rotate-12 rounded-[10px] border border-zinc-200 bg-white px-4 py-2 shadow-sm">
          <span className="text-[18px] font-black italic text-[#003087]">
            Pay<span className="text-[#0079c1]">Pal</span>
          </span>
        </div>
        <div className="absolute bottom-[12%] left-[30%] -rotate-6 rounded-[10px] bg-[#1a1f71] px-5 py-2.5 shadow-sm">
          <span className="text-[20px] font-black italic tracking-wide text-white">
            VISA
          </span>
        </div>
        <div className="absolute bottom-[28%] right-[12%] flex rotate-6 items-center rounded-[10px] bg-zinc-900 px-3 py-2.5 shadow-sm">
          <span className="h-6 w-6 rounded-full bg-red-500" />
          <span className="-ml-2.5 h-6 w-6 rounded-full bg-amber-500/90" />
        </div>
      </div>
    );
  }
  if (index === 3) {
    return (
      <div className="relative h-full w-full">
        <div className="absolute bottom-[8%] left-[8%] right-[8%] top-[10%] rounded-[12px] border border-zinc-200 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-2.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 text-[10px] text-zinc-400">
              ⌂
            </span>
            <span className="h-6 flex-1 rounded-full bg-zinc-100 px-3 text-[11px] leading-6 text-zinc-400">
              <span className="text-zinc-300">mystore</span>.com
            </span>
          </div>
          <div className="grid grid-cols-6 gap-px p-4 opacity-40">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="h-4 rounded-[3px] bg-zinc-100" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="relative h-[62%] w-[46%] [transform:rotateX(12deg)_rotateY(-18deg)]">
        <div className="absolute inset-0 rounded-[6px] border border-zinc-200 bg-gradient-to-br from-white to-zinc-100 shadow-md" />
        <div className="absolute left-1/2 top-0 h-full w-[10px] -translate-x-1/2 bg-zinc-200/70" />
        <div className="absolute left-[12%] top-[18%] rounded-[4px] bg-zinc-800 px-2 py-1 text-[9px] font-bold text-white">
          EXPRESS
        </div>
        <div className="absolute bottom-[14%] left-[12%] right-[12%] space-y-1">
          <div className="h-1.5 rounded bg-zinc-200" />
          <div className="h-1.5 w-2/3 rounded bg-zinc-200" />
        </div>
      </div>
    </div>
  );
}

function SetupCardView({
  card,
  index,
  onDismiss,
}: {
  card: SetupCard;
  index: number;
  onDismiss: () => void;
}) {
  return (
    <article className="relative h-[320px] overflow-hidden rounded-[20px] border border-[#e3e3e3] bg-white p-[20px] pt-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss card"
        className="absolute right-[21px] top-[20px] rounded p-0.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
      >
        <X className="h-[15px] w-[15px]" />
      </button>
      {card.eyebrow ? (
        <p className="mb-1.5 text-[12.5px] text-zinc-500">{card.eyebrow}</p>
      ) : null}
      <h3 className="pr-6 text-[16px] font-semibold text-[#1a1a1a]">
        {card.title}
      </h3>
      <p className="mt-[6px] text-[14px] leading-[1.45] text-[#5c5c5c]">
        {card.body}
      </p>
      <div className="absolute bottom-[15px] left-0 right-0 h-[45%] overflow-hidden">
        <CardIllustration index={index} />
      </div>
      <button
        type="button"
        className="absolute bottom-[15px] left-[20px] z-10 flex h-[37px] items-center rounded-full border border-[#d1d1d1] bg-white px-[18px] text-[13.5px] font-medium text-[#1a1a1a] transition-colors hover:bg-zinc-50"
      >
        {card.cta}
      </button>
    </article>
  );
}

/**
 * Pixel-faithful Shopify Horizon home demo.
 * Measurements were taken from a real Shopify admin: floating rounded
 * content sheet, 320px setup cards, Sidekick prompt field and trial pill.
 */
export function ShopifyAdminDemo() {
  const [activeHref, setActiveHref] = React.useState("/");
  const [collapsed, setCollapsed] = React.useState(false);
  const [dismissed, setDismissed] = React.useState<number[]>([]);
  const visible = CARDS.filter((_, i) => !dismissed.includes(i));

  return (
    <div className="flex h-screen overflow-hidden bg-[#1a1a1a]">
      <ShopifySidebar
        storeName="My Store"
        storeInitials="MS"
        activeHref={activeHref}
        onNavigate={setActiveHref}
        collapsed={collapsed}
        onCollapse={() => setCollapsed((v) => !v)}
        trialDaysLeft={3}
      />

      {/* floating content sheet */}
      <main className="relative m-[4px] ml-[2px] flex-1 overflow-hidden rounded-[12px] bg-[#f7f7f7]">
        {/* trial pill */}
        <div className="absolute right-6 top-4 z-10 flex h-[38px] items-center gap-2.5 rounded-full bg-[#1a1a1a] px-[20px]">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <span className="text-[13.5px] text-white">
            Get 3 months for $1/month
          </span>
          <span className="h-4 w-px bg-white/20" />
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-[13.5px] font-semibold text-white hover:underline"
          >
            Select a plan
          </a>
        </div>

        <div className="h-full overflow-y-auto px-6 pb-16 pt-10">
          <div className="mx-auto max-w-[1000px]">
            {/* heading */}
            <div className="mb-[20px] text-center">
              <h1 className="text-[28px] font-medium text-[#1a1a1a]">
                Welcome to Shopify
              </h1>
              <p className="mt-[4px] flex items-center justify-center gap-2 text-[28px] font-medium text-[#1a1a1a]">
                Let&rsquo;s set up My Store
                <Pencil className="h-4 w-4 text-zinc-500" />
              </p>
            </div>

            {/* sidekick prompt */}
            <div className="relative mx-auto mb-[36px] w-full max-w-[647px]">
              <div
                aria-hidden
                className="absolute -inset-1.5 rounded-[30px] bg-gradient-to-r from-violet-200/70 via-indigo-100/60 to-violet-200/70 blur-lg"
              />
              <div className="relative h-[108px] rounded-[24px] border-2 border-dashed border-zinc-300 bg-white p-[20px]">
                <p className="text-[14px] text-[#6d7175]">
                  Create a product listing
                </p>
                <div className="absolute bottom-[20px] left-[20px] right-[20px] flex items-center justify-between">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100">
                    <Bot className="h-4 w-4 text-violet-600" />
                  </span>
                  <span className="flex items-center gap-3">
                    <button
                      type="button"
                      className="flex items-center gap-1.5 text-[13px] font-medium text-zinc-600 transition-colors hover:text-zinc-900"
                    >
                      <History className="h-4 w-4" />
                      Recents
                    </button>
                    <span className="h-4 w-px bg-zinc-200" />
                    <button
                      type="button"
                      aria-label="Add files and more"
                      className="rounded-full p-1 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                    >
                      <Plus className="h-[18px] w-[18px]" />
                    </button>
                    <button
                      type="button"
                      aria-label="Voice input"
                      className="rounded-full p-1 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                    >
                      <Mic className="h-[18px] w-[18px]" />
                    </button>
                  </span>
                </div>
              </div>
            </div>

            {/* setup cards */}
            {visible.length > 0 ? (
              <div className="grid grid-cols-6 gap-[18px]">
                {visible.slice(0, 2).map((card) => {
                  const i = CARDS.indexOf(card);
                  return (
                    <div key={card.title} className="col-span-3">
                      <SetupCardView
                        card={card}
                        index={i}
                        onDismiss={() =>
                          setDismissed((d) => [...d, i])
                        }
                      />
                    </div>
                  );
                })}
                {visible.slice(2).map((card) => {
                  const i = CARDS.indexOf(card);
                  return (
                    <div key={card.title} className="col-span-2">
                      <SetupCardView
                        card={card}
                        index={i}
                        onDismiss={() =>
                          setDismissed((d) => [...d, i])
                        }
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="py-16 text-center text-[14px] text-zinc-500">
                You&rsquo;re all set. Nice work!
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
