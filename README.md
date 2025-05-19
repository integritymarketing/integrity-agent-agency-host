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
   git clone https://github.com/integritymarketing/integrity-agent-agency-host
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

## 🔑 Setting Up `.npmrc`

To publish or install private packages from GitHub, you need to create a `.npmrc` file in the root of your project and include your GitHub personal access token. Follow these steps:

1. **Generate a GitHub Personal Access Token**:

   - Go to your GitHub account settings.
   - Navigate to **Developer settings > Personal access tokens > Tokens (classic)**.
   - Generate a new token with the `write:packages` and `read:packages` permissions.

2. **Create a `.npmrc` File**:
   Add the following content to your `.npmrc` file:

   ```plaintext
   //npm.pkg.github.com/:_authToken=YOUR_PERSONAL_ACCESS_TOKEN
   ```

   Replace `YOUR_PERSONAL_ACCESS_TOKEN` with the token you generated.

3. **Important Note**:
   - Do **NOT** commit the `.npmrc` file containing your token to version control.
   - If the token is accidentally published, GitHub will automatically revoke it.

---

## 🌐 Hosting

This site has been hosted and deployed to **Netlify**.

## 📄 License

This project is licensed under the MIT License.
