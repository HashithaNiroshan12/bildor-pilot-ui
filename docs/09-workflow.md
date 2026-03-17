# 09 — Daily Development Workflow

> Practical recipes for the most common tasks you'll do day-to-day.
> Each section is a concrete step-by-step guide.

---

## Q: What does my typical development session look like?

```bash
# 1. Open the project folder
cd "D:\Builder Pilot\bildor-pilot-ui"

# 2. Start Storybook — your visual workspace
npm run storybook

# 3. Open browser → http://localhost:6006

# 4. Edit components in src/ui/ — Storybook hot-reloads instantly

# 5. Before committing, check for type errors
npm run typecheck

# 6. Check for code style issues
npm run lint
```

That's it for normal development. You rarely need to run `npm run build` unless you're preparing a release.

---

## Q: How do I add a new component? (Full checklist)

- [ ] Find the PrimeReact component at [primereact.org](https://primereact.org)
- [ ] Create `src/ui/ComponentName.tsx` using the wrapper pattern (see `04-components.md`)
- [ ] Add `export { ComponentName } from "./ComponentName";` to `src/ui/index.ts`
- [ ] Create `src/ui/ComponentName.stories.tsx` with at least 2 stories
- [ ] Open Storybook and verify it renders correctly
- [ ] Run `npm run typecheck` — fix any type errors
- [ ] Commit your changes

```bash
git add src/ui/ComponentName.tsx src/ui/ComponentName.stories.tsx src/ui/index.ts
git commit -m "feat: add ComponentName component"
```

---

## Q: How do I update an existing component?

```bash
# 1. Edit the component
# e.g. change DEFAULT_RADIUS in Button.tsx from 20 to 16

# 2. Check Storybook to confirm the visual change looks correct
# (Storybook auto-reloads — no restart needed)

# 3. Update the story if needed to show the new behaviour

# 4. Type check
npm run typecheck

# 5. Commit
git commit -am "fix: update button border radius to 16px"
```

---

## Q: How do I change the brand color?

```bash
# 1. Open src/theme/tokens.css
# 2. Change --brand in :root {} (light mode)
# 3. Change --brand in :root[data-theme="dark"] {} (dark mode)
# 4. Check Storybook — all components using brand color update immediately
# 5. Commit
git commit -am "style: update brand color to purple"
```

---

## Q: How do I publish a new version? (Full checklist)

- [ ] Make sure all changes are committed (`git status` is clean)
- [ ] Decide the version bump: `patch` / `minor` / `major` (see `08-publishing.md`)
- [ ] Run the version command

```bash
# Bump version, create commit + tag automatically
npm version patch       # or minor, or major

# Push code and the tag
git push origin main --follow-tags
```

- [ ] Go to `https://github.com/HashithaNiroshan12/bildor-pilot-ui/actions`
- [ ] Watch the "Publish to GitHub Packages" workflow run
- [ ] Green checkmark = package published successfully
- [ ] Go to `https://github.com/HashithaNiroshan12?tab=packages` to confirm

---

## Q: How do I quickly check if the build is working?

```bash
# Full build: JS files + TypeScript declarations
npm run build

# Then check what was produced
ls dist/
# Should show: index.es.js  index.cjs.js  index.css  (and ui/ theme/ folders with .d.ts files)
```

---

## Q: What is the git commit message convention to follow?

Use **Conventional Commits** format:

```
type: short description
```

| Type | When to use |
|---|---|
| `feat` | New component or feature |
| `fix` | Bug fix |
| `style` | Visual/CSS change, no logic change |
| `refactor` | Code restructure, no behavior change |
| `docs` | Documentation changes only |
| `chore` | Build config, dependencies, tooling |
| `test` | Adding or updating stories/tests |

**Examples:**
```bash
git commit -m "feat: add Accordion component"
git commit -m "fix: correct InputSwitch toggle size on mobile"
git commit -m "style: update brand color to indigo"
git commit -m "docs: add usage examples to Button story"
git commit -m "chore: upgrade primereact to 10.10.0"
```

---

## Q: What is the complete file checklist when adding a new component?

| File | Action | Required? |
|---|---|---|
| `src/ui/MyComponent.tsx` | Create | Yes |
| `src/ui/index.ts` | Add export line | Yes |
| `src/ui/MyComponent.stories.tsx` | Create | Yes |
| `docs/04-components.md` | Add row to component table | Optional |

---

## Q: What do I do when I get a TypeScript error I don't understand?

1. **Read the error message carefully** — TypeScript errors include the file name and line number
2. **Run `npm run typecheck`** to see all errors at once (not just the one Cursor is showing)
3. **Check the PrimeReact type definitions** — they're in `node_modules/primereact/<component>/<component>.d.ts`
4. **Common fixes:**

| Error | Likely fix |
|---|---|
| `Property 'X' does not exist on type 'Y'` | Wrong prop name — check PrimeReact docs |
| `Type 'string' is not assignable to type 'never'` | Generic type missing — use `<DataTable<MyRowType>>` |
| `Object is possibly 'null'` | Add `?` optional chaining: `value?.toString()` |
| `'X' is declared but its value is never read` | Remove the unused variable |

---

## Q: What is the recommended folder structure as the library grows?

When you have 30+ components, consider organizing them into groups:

```
src/ui/
├── inputs/          ← InputText, Dropdown, MultiSelect, Checkbox, etc.
│   └── index.ts
├── display/         ← Card, Message, Badge, ProgressBar, etc.
│   └── index.ts
├── navigation/      ← Menu, TabView, Breadcrumb, etc.
│   └── index.ts
├── overlays/        ← Dialog, Toast, Tooltip, etc.
│   └── index.ts
└── index.ts         ← re-exports from all sub-folders
```

For now with 18 components in a flat structure, this isn't needed. Reorganize when the flat list becomes hard to navigate.
