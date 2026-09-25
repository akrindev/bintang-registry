"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { ShopifySidebar } from "@/components/shopify-sidebar";

/**
 * Example admin shell built on <ShopifySidebar />.
 * Mirrors the Shopify Horizon "Products" empty state from the reference design.
 */
export function ShopifyAdminDemo() {
  const [activeHref, setActiveHref] = React.useState("/products");

  return (
    <div className="flex h-[640px] overflow-hidden rounded-2xl border border-zinc-200 bg-white text-zinc-900">
      <ShopifySidebar
        storeName="MVSE"
        storeInitials="MV"
        activeHref={activeHref}
        onNavigate={setActiveHref}
        className="rounded-l-2xl"
      />
      <main className="flex flex-1 flex-col bg-[#f6f6f7]">
        {/* top bar */}
        <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-3">
          <p className="text-[13px] font-medium text-zinc-500">
            {activeHref === "/" ? "Home" : activeHref.replace(/^\//, "").replace(/-/g, " ")}
          </p>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-[11px] font-bold text-violet-700">
            MV
          </div>
        </header>

        {/* content */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="mt-1 text-[15px] text-zinc-500">Where it all starts</p>
          <div className="mt-5 flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-zinc-700"
            >
              <Plus className="h-4 w-4" />
              Product
            </button>
            <button
              type="button"
              className="rounded-lg border border-zinc-300 bg-white px-3.5 py-2 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              Import
            </button>
          </div>
          <p className="mt-10 max-w-sm text-[12px] leading-relaxed text-zinc-400">
            Don&rsquo;t have a SKU yet? Dropshipping or print on demand products
            ship directly from the supplier to your customer and you only have
            to pay for what you sell.{" "}
            <a href="#" className="font-medium text-zinc-600 underline">
              Learn more
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
