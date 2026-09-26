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
  /** Collapse to icons-only with a smooth width transition. */
  collapsed?: boolean;
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

function NavLabel({
  children,
  collapsed,
}: {
  children: React.ReactNode;
  collapsed?: boolean;
}) {
  return (
    <span
      className={cx(
        "flex-1 truncate whitespace-nowrap transition-all duration-200 ease-in-out",
        collapsed ? "max-w-0 opacity-0" : "max-w-[160px] opacity-100"
      )}
    >
      {children}
    </span>
  );
}

function RowLink({
  label,
  href,
  icon: Icon,
  active,
  badge,
  collapsed,
  onNavigate,
}: {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  active?: boolean;
  badge?: string;
  collapsed?: boolean;
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
      title={collapsed ? label : undefined}
      className={cx(
        "flex h-9 w-full items-center gap-3 rounded-[10px] text-[13px] transition-colors",
        collapsed ? "justify-center px-0" : "px-3",
        // only the active row gets a background; hover shares the same radius
        active
          ? "bg-white/[0.12] font-medium text-white"
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
      <NavLabel collapsed={collapsed}>{label}</NavLabel>
      {badge && !collapsed ? (
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
  collapsed,
  onNavigate,
}: {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: Array<{ label: string; href: string; badge?: string }>;
  activeHref?: string;
  defaultExpanded?: boolean;
  collapsed?: boolean;
  onNavigate?: (href: string) => void;
}) {
  const childActive = children.some((c) => c.href === activeHref);
  const selfActive = href === activeHref && !childActive;
  const [open, setOpen] = React.useState(defaultExpanded ?? childActive);
  const show = open && !collapsed;

  React.useEffect(() => {
    if (childActive) setOpen(true);
  }, [childActive]);

  return (
    <div>
      <div
        className={cx(
          "flex h-9 w-full items-center gap-3 rounded-[10px] text-[13px] transition-colors",
          collapsed ? "justify-center px-0" : "px-3",
          selfActive || childActive
            ? "bg-white/[0.12] font-medium text-white"
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
          title={collapsed ? label : undefined}
          className={cx(
            "flex min-w-0 items-center gap-3",
            collapsed ? "justify-center" : "flex-1"
          )}
        >
          <Icon
            className={cx(
              "h-5 w-5 shrink-0",
              selfActive || childActive ? "text-white" : "text-zinc-400"
            )}
            strokeWidth={1.8}
          />
          <NavLabel collapsed={collapsed}>{label}</NavLabel>
        </a>
        {!collapsed ? (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? `Collapse ${label}` : `Expand ${label}`}
            className="rounded p-0.5 text-zinc-500 hover:bg-white/10 hover:text-zinc-200"
          >
            <ChevronDown
              className={cx(
                "h-4 w-4 transition-transform duration-200 ease-in-out",
                open ? "rotate-0" : "-rotate-90"
              )}
            />
          </button>
        ) : null}
      </div>
      <div
        className={cx(
          "grid transition-all duration-200 ease-in-out",
          show ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-[2px] py-0.5">
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
        </div>
      </div>
    </div>
  );
}

/**
 * Shopify Horizon-style admin sidebar (dark).
 *
 * Faithful details: near-black surface, square inactive rows, softly
 * rounded active highlight, muted section headers, store switcher footer
 * with optional trial banner. Supports an animated collapsed (icons-only)
 * state and smoothly expanding sub-menus.
 */
export function ShopifySidebar({
  storeName = "My Store",
  storeInitials = "MS",
  activeHref,
  sections = SHOPIFY_NAV_SECTIONS,
  onNavigate,
  onCollapse,
  collapsed = false,
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
        "relative flex h-full shrink-0 flex-col overflow-hidden bg-[linear-gradient(180deg,#262626_0%,#1c1c1c_45%,#1a1a1a_100%)] text-zinc-100 transition-[width] duration-300 ease-in-out",
        collapsed ? "w-[68px]" : "w-[218px]",
        className
      )}
    >
      {/* warm golden glow behind the footer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[190px] bg-[radial-gradient(ellipse_90%_100%_at_50%_100%,rgba(122,102,28,0.45),transparent_70%)]"
      />
      {/* logo + collapse */}
      <div
        className={cx(
          "flex items-center pb-1 pt-3",
          collapsed ? "justify-center px-0" : "justify-between px-3"
        )}
      >
        {collapsed ? null : <ShopifyMark />}
        <button
          type="button"
          onClick={onCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-zinc-200"
        >
          <PanelLeft className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </button>
      </div>

      {/* search */}
      <div className={cx("pb-1 pt-1", collapsed ? "px-2" : "px-2")}>
        <label
          className={cx(
            "flex h-9 items-center gap-2 rounded-lg bg-white/[0.07] text-[13px] text-zinc-500 transition-colors focus-within:bg-white/[0.1] focus-within:text-zinc-300",
            collapsed ? "justify-center px-0" : "px-2.5"
          )}
        >
          <Search className="h-4 w-4 shrink-0" strokeWidth={2} />
          {collapsed ? null : (
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                onSearch?.(e.target.value);
              }}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent text-zinc-100 outline-none placeholder:text-zinc-500"
            />
          )}
        </label>
      </div>

      {/* nav */}
      <nav className="flex-1 space-y-3 overflow-y-auto overflow-x-hidden px-2 py-1 [scrollbar-width:thin]">
        {visibleSections.map((section, i) => (
          <div key={section.title ?? `main-${i}`}>
            {section.title && !collapsed ? (
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
                    collapsed={collapsed}
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
                    collapsed={collapsed}
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
          collapsed={collapsed}
          onNavigate={onNavigate}
        />
        <div
          className={cx(
            "mt-1 flex h-10 items-center gap-2.5",
            collapsed ? "justify-center px-0" : "px-2"
          )}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-[#95bf47] text-[11px] font-bold text-white">
            {storeInitials}
          </span>
          {collapsed ? null : (
            <>
              <span className="flex-1 truncate text-[13px] text-zinc-100">
                {storeName}
              </span>
              <button
                type="button"
                aria-label="Notifications"
                className="rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-zinc-200"
              >
                <Bell className="h-4 w-4" strokeWidth={1.8} />
              </button>
            </>
          )}
        </div>
        {trialDaysLeft !== null && !collapsed ? (
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
