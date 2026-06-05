# Counter Anchor Frontend

React + Vite frontend for the `Counter_Anchor_contract` Anchor counter program.

The UI currently shows a neo-brutalist frontend shell only. Backend and wallet transaction wiring are not connected yet, so the counter value is intentionally displayed as `--` and the instruction buttons are disabled. This prevents the frontend from pretending that on-chain or backend data exists.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Bun package manager

## Current Behavior

- Displays the Counter Anchor interface.
- Shows backend status as `Disconnected`.
- Shows current count as `--`.
- Keeps Initialize, Increment, and Decrement actions disabled until real backend or wallet wiring is added.
- Uses Tailwind utility classes for the neo-brutalist design.

## Getting Started

Install dependencies:

```bash
bun install
```

Start the development server:

```bash
bun run dev
```

The app will run at the local URL printed by Vite, usually:

```bash
http://localhost:5173/
```

Build for production:

```bash
bun run build
```

Preview the production build:

```bash
bun run preview
```

## Project Structure

```text
frontend/
  index.html
  src/
    App.tsx
    main.tsx
    styles.css
  package.json
  vite.config.ts
  tsconfig.json
```

## Styling

Tailwind CSS is configured through the Vite plugin in `vite.config.ts`.

The main design lives in `src/App.tsx` as Tailwind utility classes. `src/styles.css` imports Tailwind and contains only small global base styles such as the page background and font setup.

## Backend Note

The frontend does not currently fetch data from the backend or Solana program. To make the counter live, add a real connection layer that reads the counter account and sends Initialize, Increment, and Decrement instructions. Until then, the UI should keep showing a disconnected state.
