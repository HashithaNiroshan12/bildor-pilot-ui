# Bildor Pilot UI — Documentation Index

> All docs are written as **Q&A sessions** — each file is a topic,
> each section is a question you might ask as a beginner.

---

## Reading Order (Beginner → Advanced)

| File | Topic | Read when |
|---|---|---|
| [00-overview.md](./00-overview.md) | What is this project? Folder structure. | First time opening the project |
| [01-getting-started.md](./01-getting-started.md) | Install, run, daily commands | Setting up a new machine |
| [02-vite-config.md](./02-vite-config.md) | How Vite library mode works | Confused about `vite.config.ts` |
| [03-package-json.md](./03-package-json.md) | Every `package.json` field explained | Confused about `exports`, `peerDeps`, `files` |
| [04-components.md](./04-components.md) | How to create + extend components | Adding a new component |
| [05-theme.md](./05-theme.md) | Design tokens, dark mode, brand colors | Changing colors or branding |
| [06-storybook.md](./06-storybook.md) | Storybook setup + writing stories | Adding stories, Storybook not loading |
| [07-typescript.md](./07-typescript.md) | Three tsconfig files, `.d.ts` generation | TypeScript errors, declaration files |
| [08-publishing.md](./08-publishing.md) | GitHub Packages: publish + consume | Releasing a new version |
| [09-workflow.md](./09-workflow.md) | Day-to-day dev recipes + checklists | "How do I do X?" quick reference |

---

## Quick Reference

```bash
npm run storybook         # Start visual component gallery → localhost:6006
npm run build             # Build dist/ (JS + TypeScript types)
npm run typecheck         # Type check without building
npm run lint              # Check code style

npm version patch         # Bump version 0.1.0 → 0.1.1
git push origin main --follow-tags   # Trigger publish workflow
```

---

## Project at a Glance

```
@hashithaniroshan12/bildor-pilot-ui
  ├── 18 PrimeReact wrapper components
  ├── Design token system (light + dark mode)
  ├── Storybook 10 with autodocs + a11y
  └── Auto-publishes to GitHub Packages on git tag
```
