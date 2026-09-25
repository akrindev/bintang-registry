"use client";

import * as React from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  PanelLeftClose,
  Search,
} from "lucide-react";
import {
  SETTINGS_NAV_ITEM,
  SHOPIFY_NAV_SECTIONS,
  type ShopifyNavItem,
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
  /** Search input placeholder. */
  searchPlaceholder?: string;
  /** Called as the user types in the sidebar search. */
  onSearch?: (query: string) => void;
  className?: string;
}

function NavRow({
  label,
  href,
  icon: Icon,
  active,
  badge,
  indented,
  onNavigate,
  trailing,
}: {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  active?: boolean;
  badge?: string;
  indented?: boolean;
  onNavigate?: (href: string) => void;
  trailing?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={onNavigate ? (e) => { e.preventDefault(); onNavigate(href); } : undefined}
      aria-current={active ? "page" : undefined}
      className={cx(
        "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[13px] font-medium transition-colors",
        indented && "pl-[34px]",
        active
          ? "bg-white/[0.08] text-white"
          : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
      )}
    >
      {Icon ? (
        <Icon className={cx("h-4 w-4 shrink-0", active ? "text-zinc-100" : "text-zinc-500 group-hover:text-zinc-300")} />
      ) : null}
      <span className="flex-1 truncate">{label}</span>
      {badge ? (
        <span className="rounded-full bg-white/[0.08] px-1.5 py-0.5 text-[11px] font-semibold leading-none text-zinc-300">
          {badge}
        </span>
      ) : null}
      {trailing}
    </a>
  );
}

function ParentRow({
  item,
  activeHref,
  onNavigate,
}: {
  item: ShopifyNavItem;
  activeHref?: string;
  onNavigate?: (href: string) => void;
}) {
  const childActive = item.children?.some((c) => c.href === activeHref) ?? false;
  const selfActive = item.href === activeHref;
  const [open, setOpen] = React.useState(item.defaultExpanded ?? childActive);

  React.useEffect(() => {
    if (childActive) setOpen(true);
  }, [childActive]);

  return (
    <div>
      <div
        className={cx(
          "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[13px] font-medium transition-colors",
          selfActive || childActive
            ? "bg-white/[0.08] text-white"
            : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
        )}
      >
        <a
          href={item.href}
          onClick={onNavigate ? (e) => { e.preventDefault(); onNavigate(item.href); } : undefined}
          className="flex flex-1 items-center gap-2.5 truncate"
          aria-current={selfActive ? "page" : undefined}
        >
          <item.icon className="h-4 w-4 shrink-0 text-zinc-500 group-hover:text-zinc-300" />
          <span className="truncate">{item.label}</span>
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? `Collapse ${item.label}` : `Expand ${item.label}`}
          className="rounded p-0.5 text-zinc-500 hover:bg-white/10 hover:text-zinc-200"
        >
          {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
        </button>
      </div>
      {open && item.children ? (
        <div className="mt-0.5 space-y-0.5">
          {item.children.map((child) => (
            <NavRow
              key={child.href}
              label={child.label}
              href={child.href}
              badge={child.badge}
              indented
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
 * Drop-in navigation shell: search, collapsible nav with badges,
 * sectioned sales channels / apps, and a settings + store switcher footer.
 */
export function ShopifySidebar({
  storeName = "My store",
  storeInitials = "MS",
  activeHref,
  sections = SHOPIFY_NAV_SECTIONS,
  onNavigate,
  searchPlaceholder = "Search",
  onSearch,
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
              matches(item.label) ||
              item.children?.some((c) => matches(c.label))
          ),
        }))
        .filter((s) => s.items.length > 0),
    [sections, matches]
  );

  return (
    <aside
      className={cx(
        "flex h-full w-60 shrink-0 flex-col bg-[#1b1b1b] text-zinc-300",
        className
      )}
    >
      {/* search */}
      <div className="px-3 pb-1 pt-3">
        <label className="flex items-center gap-2 rounded-lg bg-white/[0.06] px-2.5 py-[7px] text-[13px] text-zinc-500 transition-colors focus-within:bg-white/[0.09] focus-within:text-zinc-300">
          <Search className="h-4 w-4 shrink-0" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder={searchPlaceholder}
            className="w-full bg-transparent text-zinc-200 outline-none placeholder:text-zinc-500"
          />
        </label>
      </div>

      {/* nav */}
      <nav className="flex-1 space-y-4 overflow-y-auto px-3 py-2 [scrollbar-width:thin]">
        {visibleSections.map((section, i) => (
          <div key={section.title ?? `main-${i}`}>
            {section.title ? (
              <button
                type="button"
                className="mb-1 flex w-full items-center gap-1 px-2.5 py-1 text-[12px] font-semibold text-zinc-500 transition-colors hover:text-zinc-300"
              >
                <span className="flex-1 text-left">{section.title}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            ) : null}
            <div className="space-y-0.5">
              {section.items.map((item) =>
                item.children ? (
                  <ParentRow
                    key={item.href}
                    item={item}
                    activeHref={activeHref}
                    onNavigate={onNavigate}
                  />
                ) : (
                  <NavRow
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
          <p className="px-2.5 py-4 text-[13px] text-zinc-500">
            No results for &ldquo;{query}&rdquo;
          </p>
        ) : null}
      </nav>

      {/* footer */}
      <div className="space-y-0.5 border-t border-white/[0.06] px-3 py-2">
        <NavRow
          label={SETTINGS_NAV_ITEM.label}
          href={SETTINGS_NAV_ITEM.href}
          icon={SETTINGS_NAV_ITEM.icon}
          active={SETTINGS_NAV_ITEM.href === activeHref}
          onNavigate={onNavigate}
        />
        <div className="flex items-center gap-2 rounded-lg px-1.5 py-1.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-zinc-700 text-[11px] font-bold text-white">
            {storeInitials}
          </span>
          <span className="flex-1 truncate text-[13px] font-medium text-zinc-200">
            {storeName}
          </span>
          <button
            type="button"
            aria-label="Switch store"
            className="rounded p-1 text-zinc-500 hover:bg-white/10 hover:text-zinc-200"
          >
            <ChevronsUpDown className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label="Collapse sidebar"
            className="rounded p-1 text-zinc-500 hover:bg-white/10 hover:text-zinc-200"
          >
            <PanelLeftClose className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
