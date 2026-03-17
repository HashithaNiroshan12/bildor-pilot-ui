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
The message about "Node.js 20 actions are deprecated" is a WARNING, not the cause of the failure. It's suppressed by the `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` env variable in the updated workflow.

**4. Check the full Actions log**
Go to: repo → Actions → click the failed run → click the failed step → read the full output. The exact error will be there.

---

## Q: Can you explain the `publish.yml` workflow line by line?

```yaml
name: Publish to GitHub Packages

# Only run this workflow when a tag starting with "v" is pushed
on:
  push:
    tags:
      - "v*"         # matches v0.1.0, v1.0.0, v2.3.1, etc.
```

```yaml
jobs:
  publish:
    runs-on: ubuntu-latest

    # Suppresses the "Node.js 20 is deprecated" warning on GitHub Actions
    env:
      FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true

    permissions:
      contents: read     # Read the repo code
      packages: write    # Write (publish) to GitHub Packages
```

```yaml
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          registry-url: "https://npm.pkg.github.com"
          scope: "@hashithaniroshan12"
          cache: "npm"       # Cache node_modules between runs

      - name: Install dependencies
        run: npm install     # More tolerant than npm ci for lockfile drift

      - name: Build library
        run: npm run build   # vite build + tsc -p tsconfig.build.json

      - name: Verify dist/ was produced
        run: |
          ls -la dist/
          test -f dist/index.es.js  || exit 1
          test -f dist/index.cjs.js || exit 1
          test -f dist/index.d.ts   || exit 1

      - name: Publish to GitHub Packages
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
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
