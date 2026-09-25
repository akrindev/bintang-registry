"use client";

import * as React from "react";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  PanelLeft,
  Search,
  ShoppingBag,
} from "lucide-react";
import {
  SETTINGS_NAV_ITEM,
  SHOPIFY_NAV_SECTIONS,
  type ShopifyNavSection,
} from "@/lib/shopify-nav-data";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export interface ShopifySidebarProps {
  /** Store display name shown in the footer switcher. */
  storeName?: string;
  /** Initials rendered in the footer avatar. */
  storeInitials?: string;
  /** Currently active href. Child hrefs also mark their parent active. */
  activeHref?: string;
  /** Override the default Shopify nav structure. */
  sections?: ShopifyNavSection[];
  /** Called when a nav item is clicked. Defaults to a plain anchor. */
  onNavigate?: (href: string) => void;
  /** Called when the collapse toggle is clicked. */
  onCollapse?: () => void;
  /** Search input placeholder. */
  searchPlaceholder?: string;
  /** Called as the user types in the sidebar search. */
  onSearch?: (query: string) => void;
  /** Show the trial banner. Pass the number of days left, or null to hide. */
  trialDaysLeft?: number | null;
  className?: string;
}

/**
 * Shopify-style logo mark: green rounded square with a bag glyph.
 * Approximation for demos; replace with your own brand mark.
 */
export function ShopifyMark({ className }: { className?: string }) {
  return (
    <span
      className={cx(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-[#95bf47]",
        className
      )}
      aria-hidden
    >
      <ShoppingBag className="h-4 w-4 text-white" strokeWidth={2.2} />
    </span>
  );
}

function RowLink({
  label,
  href,
  icon: Icon,
  active,
  badge,
  onNavigate,
}: {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  active?: boolean;
  badge?: string;
  onNavigate?: (href: string) => void;
}) {
  return (
    <a
      href={href}
      onClick={
        onNavigate
          ? (e) => {
              e.preventDefault();
              onNavigate(href);
            }
          : undefined
      }
      aria-current={active ? "page" : undefined}
      className={cx(
        "flex h-9 w-full items-center gap-3 px-3 text-[14px] transition-colors",
        // only the active row gets a background, and only it is rounded
        active
          ? "rounded-[10px] bg-white/[0.12] font-medium text-white"
          : "font-normal text-zinc-100 hover:bg-white/[0.05]"
      )}
    >
      {Icon ? (
        <Icon
          className={cx(
            "h-5 w-5 shrink-0",
            active ? "text-white" : "text-zinc-400"
          )}
          strokeWidth={1.8}
        />
      ) : null}
      <span className="flex-1 truncate">{label}</span>
      {badge ? (
        <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-zinc-200">
          {badge}
        </span>
      ) : null}
    </a>
  );
}

function ParentRow({
  label,
  href,
  icon: Icon,
  children,
  activeHref,
  defaultExpanded,
  onNavigate,
}: {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: Array<{ label: string; href: string; badge?: string }>;
  activeHref?: string;
  defaultExpanded?: boolean;
  onNavigate?: (href: string) => void;
}) {
  const childActive = children.some((c) => c.href === activeHref);
  const selfActive = href === activeHref && !childActive;
  const [open, setOpen] = React.useState(defaultExpanded ?? childActive);

  React.useEffect(() => {
    if (childActive) setOpen(true);
  }, [childActive]);

  return (
    <div>
      <div
        className={cx(
          "flex h-9 w-full items-center gap-3 px-3 text-[14px] transition-colors",
          selfActive || childActive
            ? "rounded-[10px] bg-white/[0.12] font-medium text-white"
            : "font-normal text-zinc-100 hover:bg-white/[0.05]"
        )}
      >
        <a
          href={href}
          onClick={
            onNavigate
              ? (e) => {
                  e.preventDefault();
                  onNavigate(href);
                }
              : undefined
          }
          aria-current={selfActive ? "page" : undefined}
          className="flex min-w-0 flex-1 items-center gap-3"
        >
          <Icon
            className={cx(
              "h-5 w-5 shrink-0",
              selfActive || childActive ? "text-white" : "text-zinc-400"
            )}
            strokeWidth={1.8}
          />
          <span className="truncate">{label}</span>
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? `Collapse ${label}` : `Expand ${label}`}
          className="rounded p-0.5 text-zinc-500 hover:bg-white/10 hover:text-zinc-200"
        >
          {open ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>
      {open ? (
        <div className="py-0.5">
          {children.map((child) => (
            <RowLink
              key={child.href}
              label={child.label}
              href={child.href}
              badge={child.badge}
              active={child.href === activeHref}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Shopify Horizon-style admin sidebar (dark).
 *
 * Faithful details: near-black surface, square inactive rows, softly
 * rounded active highlight, muted section headers, store switcher footer
 * with optional trial banner.
 */
export function ShopifySidebar({
  storeName = "My Store",
  storeInitials = "MS",
  activeHref,
  sections = SHOPIFY_NAV_SECTIONS,
  onNavigate,
  onCollapse,
  searchPlaceholder = "Search",
  onSearch,
  trialDaysLeft = null,
  className,
}: ShopifySidebarProps) {
  const [query, setQuery] = React.useState("");
  const q = query.trim().toLowerCase();
  const matches = React.useCallback(
    (label: string) => !q || label.toLowerCase().includes(q),
    [q]
  );

  const visibleSections = React.useMemo(
    () =>
      sections
        .map((s) => ({
          ...s,
          items: s.items.filter(
            (item) =>
              matches(item.label) || item.children?.some((c) => matches(c.label))
          ),
        }))
        .filter((s) => s.items.length > 0),
    [sections, matches]
  );

  return (
    <aside
      className={cx(
        "flex h-full w-[218px] shrink-0 flex-col bg-[#1a1a1a] text-zinc-100",
        className
      )}
    >
      {/* logo + collapse */}
      <div className="flex items-center justify-between px-3 pb-1 pt-3">
        <ShopifyMark />
        <button
          type="button"
          onClick={onCollapse}
          aria-label="Collapse sidebar"
          className="rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-zinc-200"
        >
          <PanelLeft className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </button>
      </div>

      {/* search */}
      <div className="px-2 pb-1 pt-1">
        <label className="flex h-9 items-center gap-2 rounded-lg bg-white/[0.07] px-2.5 text-[14px] text-zinc-500 transition-colors focus-within:bg-white/[0.1] focus-within:text-zinc-300">
          <Search className="h-4 w-4 shrink-0" strokeWidth={2} />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder={searchPlaceholder}
            className="w-full bg-transparent text-zinc-100 outline-none placeholder:text-zinc-500"
          />
        </label>
      </div>

      {/* nav */}
      <nav className="flex-1 space-y-3 overflow-y-auto px-2 py-1 [scrollbar-width:thin]">
        {visibleSections.map((section, i) => (
          <div key={section.title ?? `main-${i}`}>
            {section.title ? (
              <button
                type="button"
                className="mb-0.5 flex h-8 w-full items-center gap-1 px-3 text-[13px] font-normal text-zinc-500 transition-colors hover:text-zinc-300"
              >
                <span className="flex-1 text-left">{section.title}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            ) : null}
            <div className="space-y-[2px]">
              {section.items.map((item) =>
                item.children ? (
                  <ParentRow
                    key={item.href}
                    label={item.label}
                    href={item.href}
                    icon={item.icon}
                    children={item.children}
                    activeHref={activeHref}
                    defaultExpanded={item.defaultExpanded}
                    onNavigate={onNavigate}
                  />
                ) : (
                  <RowLink
                    key={item.href}
                    label={item.label}
                    href={item.href}
                    icon={item.icon}
                    badge={item.badge}
                    active={item.href === activeHref}
                    onNavigate={onNavigate}
                  />
                )
              )}
            </div>
          </div>
        ))}
        {visibleSections.length === 0 ? (
          <p className="px-3 py-4 text-[13px] text-zinc-500">
            No results for &ldquo;{query}&rdquo;
          </p>
        ) : null}
      </nav>

      {/* footer */}
      <div className="border-t border-white/[0.08] px-2 py-2">
        <RowLink
          label={SETTINGS_NAV_ITEM.label}
          href={SETTINGS_NAV_ITEM.href}
          icon={SETTINGS_NAV_ITEM.icon}
          active={SETTINGS_NAV_ITEM.href === activeHref}
          onNavigate={onNavigate}
        />
        <div className="mt-1 flex h-10 items-center gap-2.5 px-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-[#95bf47] text-[11px] font-bold text-white">
            {storeInitials}
          </span>
          <span className="flex-1 truncate text-[14px] text-zinc-100">
            {storeName}
          </span>
          <button
            type="button"
            aria-label="Notifications"
            className="rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-zinc-200"
          >
            <Bell className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
        {trialDaysLeft !== null ? (
          <div className="flex h-9 items-center gap-2 px-3 text-[13px]">
            <span className="text-zinc-400">Trial</span>
            <span className="flex flex-1 items-center justify-end gap-1.5 text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
              {trialDaysLeft} days left
            </span>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
