# @bintang registry

shadcn registry by akrindev. reusable UI components, starting with a
Shopify Horizon-style admin sidebar clone.

## items

| item | type | description |
| ---- | ---- | ----------- |
| `shopify-sidebar` | component | dark admin sidebar: search, collapsible nav with badges, sales channels + apps sections, settings and store switcher footer |
| `shopify-nav-data` | lib | default nav structure (items, sections, badges) used by the sidebar |
| `shopify-admin-demo` | block | example admin shell with the sidebar + products empty state |

## install

no config needed, straight from github:

```bash
npx shadcn@latest add akrindev/bintang-registry/shopify-sidebar
```

this also pulls `shopify-nav-data` automatically and installs `lucide-react`.

## use the @bintang namespace

add to your `components.json`:

```json
{
  "registries": {
    "@bintang": "https://raw.githubusercontent.com/akrindev/bintang-registry/main/public/r/{name}.json"
  }
}
```

then:

```bash
npx shadcn@latest add @bintang/shopify-sidebar
```

## usage

```tsx
import { ShopifySidebar } from "@/components/shopify-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <ShopifySidebar
        storeName="MVSE"
        storeInitials="MV"
        activeHref="/products"
      />
      <main className="flex-1">{children}</main>
    </div>
  );
}
```

pass your own `sections` to replace the default shopify nav, or edit
`@/lib/shopify-nav-data.ts` after install since the code is yours.

## develop

edit files under `registry/bintang/`, update `registry.json`, then:

```bash
npx shadcn@latest build
```
