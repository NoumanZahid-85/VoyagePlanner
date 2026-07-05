# Design System

## Colors

### Light Mode
- Background: hsl(0, 0%, 100%)
- Foreground: hsl(240, 10%, 3.9%)
- Primary: hsl(262.1, 83.3%, 57.8%)
- Secondary: hsl(220, 14.3%, 95.9%)

### Dark Mode
- Background: hsl(240, 10%, 3.9%)
- Foreground: hsl(0, 0%, 98%)
- Primary: hsl(263.4, 70%, 50.4%)
- Secondary: hsl(215, 27.9%, 16.9%)

## Typography
- Font: System UI stack (Inter, Plus Jakarta Sans)
- Scale: 12px-72px range
- Weights: 400, 500, 600, 700

## Spacing
- 4px grid base
- Sidebar: 240px
- Card padding: 24px
- Component gap: 8px/16px

## Dark Mode
- 50% of users expected in dark mode
- Class strategy on `<html>`
- Persistent preference via localStorage

## Components
- shadcn/ui: Button, Card, Dialog, DropdownMenu, Input, Select, Badge, Separator, Skeleton
- lucide-react icons

## Animations
- fade-in, slide-up, scale-in for modals
- hover: scale(1.02) for cards
- transition: 200ms ease
