# Agent Shared Context

A microfrontend-compatible shared context module built for the Integrity platform. This package exposes global providers—such as `AppGlobalProvider`—to downstream microfrontend applications via Vite Module Federation. It centrally manages agent and agency authentication using Auth0, enabling consistent and secure login experiences across integrated apps.

---

## 🚀 Features

- ✅ Exposes `AppGlobalProvider` for context-sharing across MFEs
- ✅ Vite + Module Federation (`@originjs/vite-plugin-federation`)
- ✅ TypeScript + ESLint + Prettier integration
- ✅ Post-build redirect support for Netlify via `_redirects` file
- ✅ React 18 (experimental) compatibility

---

## 📦 Tech Stack

- **React (experimental release)**
- **Vite**
- **Module Federation**
- **TypeScript**
- **MUI 5**
- **Prettier + ESLint**
- **Yarn**

---

## 🧱 Project Structure

```bash
.
├── src/
│   ├── contexts/AgentGlobalProvider.tsx
│   ├── hooks/...
├── tsconfig.app.json
├── vite.config.ts
├── package.json
├── .npmrc (ignored)
├── .env        # NOT committed; required locally
└── generate-redirects.mjs
```

---

## 🛠️ Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Start the development server:
   ```bash
   yarn dev
   ```
4. Build the project for production:
   ```bash
   yarn build
   ```

---

## 📜 Available Scripts

The following scripts are available in the `package.json`:

- **`yarn dev`**: Starts the development server.
- **`yarn build`**: Builds the project for production.
- **`yarn lint`**: Runs ESLint to check for code quality issues.
- **`yarn format`**: Formats the code using Prettier.
- **`yarn test`**: Runs the test suite.

---

## 🔧 Required Node.js Version

This project requires **Node.js v>=22.14.0**. Ensure you have the correct version installed by running:

```bash
node -v
```

If you need to switch Node.js versions, consider using a version manager like [nvm](https://github.com/nvm-sh/nvm).

---

## 📄 License

This project is licensed under the MIT License.
