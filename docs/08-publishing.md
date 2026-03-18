# 08 — Publishing to GitHub Packages

> How to publish your library so any app can install it,
> and how the GitHub Actions automation works.

---

## Q: What is GitHub Packages?

GitHub Packages is a **private npm registry** that GitHub provides for free.

It works exactly like `npmjs.com` but:
- Packages are tied to your GitHub account
- Only people with access to your repo can install your package
- Authentication is via GitHub Personal Access Token (PAT)
- Package URLs look like: `https://npm.pkg.github.com/@hashithaniroshan12/bildor-pilot-ui`

---

## Q: What are the one-time setup steps before publishing for the first time?

**Step 1: Create the GitHub repository**

Go to [github.com/new](https://github.com/new) and create a repository named `bildor-pilot-ui`.

**Step 2: Enable Actions write permissions (CRITICAL — easy to miss)**

In your repo → **Settings → Actions → General → Workflow permissions**
→ Select **"Read and write permissions"** → Save

Without this, `GITHUB_TOKEN` cannot write to GitHub Packages and the publish step will fail with exit code 1.

**Step 3: Push your code**

```bash
cd "D:\Builder Pilot\bildor-pilot-ui"

git init
git add .
git commit -m "feat: initial bildor pilot ui library"
git branch -M main
git remote add origin https://github.com/HashithaNiroshan12/bildor-pilot-ui.git
git push -u origin main
```

---

## Q: How do I publish my first version?

```bash
# Option A: Use npm version (recommended — creates commit + tag automatically)
npm version patch    # bumps 0.1.0 → 0.1.1
git push origin main --follow-tags   # pushes code AND the tag

# Option B: Manually tag
git tag v0.1.0
git push origin v0.1.0
```

When the tag reaches GitHub, the Actions workflow triggers automatically. Watch it run at:
`https://github.com/HashithaNiroshan12/bildor-pilot-ui/actions`

---

## Q: The GitHub Actions job failed with exit code 1. What should I check?

Work through this checklist in order:

**1. Actions permissions (most common cause)**
Go to: repo → Settings → Actions → General → Workflow permissions
→ Must be set to **"Read and write permissions"**

**2. Workflow file is on main branch**
The `publish.yml` must be committed and pushed to `main` before you push a tag. Pushing a tag before the workflow file exists means the trigger fires but there's nothing to run.

**3. Node.js deprecation warning (not an error)**
The message about "Node.js 20 actions are deprecated" is a WARNING, not the cause of the failure.
The current workflow already handles this two ways:
- `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` env variable opts into Node 24 now
- `actions/checkout@v5` and `actions/setup-node@v5` run natively on Node 24

See: [GitHub changelog — Deprecation of Node 20 on GitHub Actions runners](https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/)

**4. Check the full Actions log**
Go to: repo → Actions → click the failed run → click the failed step → read the full output. The exact error will be there.

---

## Q: How many ways can the workflow be triggered?

Two ways:

| Trigger | When it fires | Use for |
|---|---|---|
| **Tag push** | Automatically when you push a `v*` tag | Real releases |
| **workflow_dispatch** | Manually from the GitHub Actions UI | Testing, debugging, dry runs |

---

## Q: How do I run the workflow manually from GitHub?

**Step 1** — Go to your repo:
`https://github.com/HashithaNiroshan12/bildor-pilot-ui`

**Step 2** — Click the **Actions** tab in the top navigation

**Step 3** — In the left sidebar, click **"Publish to GitHub Packages"**

**Step 4** — Click the **"Run workflow"** button on the right side of the page

**Step 5** — A dropdown panel appears. Set the options:
```
Branch: main
Dry run — build and verify dist/ but skip npm publish
  [ false ]  ← "false" = full publish,  "true" = test only
```

**Step 6** — Click the green **"Run workflow"** button

> **Tip:** Always run with `dry_run = true` first to verify the build works in CI
> before running with `dry_run = false` to actually publish.

---

## Q: What is a "dry run" and when should I use it?

A dry run runs the full pipeline — install → build → verify `dist/` — but **skips the final `npm publish` step**.

Use it when:
- You want to check if the CI build works without releasing a new version
- You've changed the build config (`vite.config.ts`, `tsconfig.build.json`) and want to verify it
- Something failed before and you want to debug without bumping the version

---

## Q: Can you explain the `publish.yml` workflow line by line?

```yaml
name: Publish to GitHub Packages

# Trigger 1: automatically on git tag push (e.g. v0.1.0)
# Trigger 2: manually from the GitHub Actions UI
on:
  push:
    tags:
      - "v*"              # matches v0.1.0, v1.0.0, v2.3.1, etc.
  workflow_dispatch:
    inputs:
      dry_run:
        description: "Dry run — build and verify dist/ but skip npm publish"
        required: false
        default: "false"
        type: choice
        options:
          - "false"
          - "true"
```

```yaml
jobs:
  publish:
    runs-on: ubuntu-latest

    # Opts into Node.js 24 for the Actions runtime now, before the June 2026
    # forced migration. See: github.blog/changelog/2025-09-19-deprecation-of-node-20
    env:
      FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true

    permissions:
      contents: read     # Read the repo code
      packages: write    # Write (publish) to GitHub Packages
                         # ← MUST be enabled in repo Settings → Actions → General
```

```yaml
    steps:
      - name: Checkout code
        uses: actions/checkout@v5     # v5 runs natively on Node 24 — no deprecation warning

      - name: Setup Node.js 20
        uses: actions/setup-node@v5   # v5 runs natively on Node 24 — no deprecation warning
        with:
          node-version: "20"
          registry-url: "https://npm.pkg.github.com"   # point npm at GitHub Packages
          scope: "@hashithaniroshan12"
          cache: "npm"                # cache node_modules between runs (faster CI)

      - name: Install dependencies
        run: npm install              # tolerant of lockfile drift, unlike npm ci

      - name: Build library
        run: npm run build            # runs: vite build && tsc -p tsconfig.build.json
```

```yaml
      - name: Verify dist/ was produced
        # Fails fast with a clear message if any output file is missing
        run: |
          echo "--- dist/ contents ---"
          ls -la dist/
          test -f dist/index.es.js  || (echo "ERROR: dist/index.es.js missing" && exit 1)
          test -f dist/index.cjs.js || (echo "ERROR: dist/index.cjs.js missing" && exit 1)
          test -f dist/index.d.ts   || (echo "ERROR: dist/index.d.ts missing"   && exit 1)
          echo "--- dist/ verified OK ---"
```

```yaml
      - name: Publish to GitHub Packages
        # Skipped entirely when dry_run = "true"
        if: ${{ github.event.inputs.dry_run != 'true' }}
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}  # auto-provided by GitHub

      - name: Dry run complete
        # Only runs when dry_run = "true" — confirms the pipeline passed
        if: ${{ github.event.inputs.dry_run == 'true' }}
        run: echo "Dry run finished — build verified, publish skipped."
```

---

## Q: What version numbering system should I use?

Use **Semantic Versioning (SemVer)**: `MAJOR.MINOR.PATCH`

| Type | When to use | Example |
|---|---|---|
| `patch` | Bug fix, no API changes | `0.1.0 → 0.1.1` |
| `minor` | New component or feature added, backwards-compatible | `0.1.0 → 0.2.0` |
| `major` | Breaking change — existing code would need updating | `0.1.0 → 1.0.0` |

**Examples of breaking changes (require major bump):**
- Renaming a component (e.g. `Button` → `PrimaryButton`)
- Removing a prop that apps currently use
- Changing a prop's type

**Examples of non-breaking changes (minor or patch):**
- Adding a new component
- Adding an optional prop
- Fixing a bug

---

## Q: How does a consumer app install the package from GitHub Packages?

The consumer app needs two things:

**Step 1: Add `.npmrc` to the consumer app's root**

```
# .npmrc
@hashithaniroshan12:registry=https://npm.pkg.github.com
```

**Step 2: Authenticate** (one-time, per developer machine)

The developer needs a GitHub Personal Access Token (PAT) with `read:packages` permission.

Create one at: `GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)`

Then configure npm:
```bash
npm login --registry=https://npm.pkg.github.com --scope=@hashithaniroshan12
# Enter username: HashithaNiroshan12
# Enter password: <paste your PAT>
# Enter email: your-email@example.com
```

**Step 3: Install**

```bash
npm install @hashithaniroshan12/bildor-pilot-ui
```

---

## Q: How do I use the library in the consumer app after installing?

```typescript
// In the app's main.tsx — import styles ONCE at the top level
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@hashithaniroshan12/bildor-pilot-ui/styles";

// Import and use theme utilities
import { initTheme } from "@hashithaniroshan12/bildor-pilot-ui";
initTheme();
```

```typescript
// In any component file
import { Button, Card, Dropdown } from "@hashithaniroshan12/bildor-pilot-ui";

function MyPage() {
  return (
    <Card title="Hello">
      <Button label="Click me" />
    </Card>
  );
}
```

---

## Q: Can I test the library locally without publishing?

There are two approaches. The `file:` path method is simpler and more reliable on Windows.

### Option A — `file:` path (recommended for local dev)

In the consumer app's `package.json`, reference the library by its local folder path:

```json
"dependencies": {
  "@hashithaniroshan12/bildor-pilot-ui": "file:../../bildor-pilot-ui"
}
```

Then run `npm install`. npm copies the `dist/` folder directly — no registry, no auth needed.

When you're ready to use the published version, change the value back to `"^0.1.0"`.

### Option B — `npm link`

```bash
# In the library folder — register it globally
cd "D:\Builder Pilot\bildor-pilot-ui"
npm link

# In the consumer app — link to the registered library
cd "D:\Builder Pilot\example-app"
npm link @hashithaniroshan12/bildor-pilot-ui
```

Use `npm run build:watch` in the library to auto-rebuild on every save:

```bash
npm run build:watch
```

To unlink when done:
```bash
cd "D:\Builder Pilot\example-app"
npm unlink @hashithaniroshan12/bildor-pilot-ui
```
