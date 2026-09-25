import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  FileText,
  Globe2,
  Home,
  Inbox,
  Percent,
  PlusCircle,
  Settings,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Tags,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

export interface ShopifyNavChild {
  label: string;
  href: string;
  badge?: string;
}

export interface ShopifyNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  children?: ShopifyNavChild[];
  defaultExpanded?: boolean;
}

export interface ShopifyNavSection {
  /** Section header shown above the items, e.g. "Sales channels". Omit for the main nav. */
  title?: string;
  items: ShopifyNavItem[];
}

/**
 * Default navigation structure mirroring the Shopify admin (Horizon).
 * Pass your own `sections` to <ShopifySidebar /> to override.
 */
export const SHOPIFY_NAV_SECTIONS: ShopifyNavSection[] = [
  {
    items: [
      { label: "Home", href: "/", icon: Home },
      { label: "Orders", href: "/orders", icon: Inbox },
      {
        label: "Products",
        href: "/products",
        icon: Tags,
        defaultExpanded: true,
        children: [
          { label: "Products", href: "/products" },
          { label: "Collections", href: "/products/collections" },
          { label: "Inventory", href: "/products/inventory" },
          { label: "Purchase orders", href: "/products/purchase-orders" },
          { label: "Transfers", href: "/products/transfers" },
          { label: "Gift cards", href: "/products/gift-cards" },
        ],
      },
      { label: "Customers", href: "/customers", icon: Users },
      { label: "Growth", href: "/growth", icon: TrendingUp, badge: "4" },
      { label: "Discounts", href: "/discounts", icon: Percent },
      { label: "Content", href: "/content", icon: FileText },
      { label: "Markets", href: "/markets", icon: Globe2 },
      { label: "Finance", href: "/finance", icon: Wallet },
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Sales channels",
    items: [
      { label: "Online Store", href: "/channels/online-store", icon: Store },
      { label: "Shop", href: "/channels/shop", icon: ShoppingBag },
      { label: "Point of Sale", href: "/channels/pos", icon: Smartphone },
      { label: "Agentic", href: "/channels/agentic", icon: Sparkles },
    ],
  },
  {
    title: "Apps",
    items: [{ label: "Add", href: "/apps/add", icon: PlusCircle }],
  },
];

export const SETTINGS_NAV_ITEM: ShopifyNavItem = {
  label: "Settings",
  href: "/settings",
  icon: Settings,
};
