# Agent Shared Context

A microfrontend-compatible shared context module built for the Integrity platform. This package exposes global providers—such as `AppGlobalProvider`—to downstream microfrontend applications via Vite Module Federation. It centrally manages agent and agency authentication using Auth0, enabling consistent and secure login experiences across integrated apps.

---

## 🚀 Features

- ✅ Exposes `AppGlobalProvider` for context-sharing across MFEs
- ✅ Vite + Module Federation (`@originjs/vite-plugin-federation`)
- ✅ TypeScript + ESLint + Prettier integration
- ✅ Post-build redirect support for Netlify via `_redirects` file
- ✅ React 18
- ✅ Uses **MUI 6** for UI components
- ✅ Uses icons from **FontAwesome**
- ✅ Uses **Auth0** for authentication
- ✅ Logs errors in **Sentry** for monitoring and debugging

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
2. Set up your GitHub token for private package installation:  
   See [🔑 Setting Up `.npmrc` and GitHub Token](#-setting-up-npmrc-and-github-token) below for instructions.

3. Install dependencies:

   ```bash
   yarn install
   ```

4. Copy the environment variable template and rename it:

   ```bash
      cp .env.sample .env
   ```

   Why?
   .env.sample is a template file containing all the required environment variable names and example values.
   You must rename it to .env so that Vite and other tools can load your actual environment variables at runtime.
   Update the values in .env with your real secrets and configuration for local development.
   Never commit your .env file to version control.

5. Start the development server:
   ```bash
   yarn dev
   ```
6. Build the project for production:
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

## 🔑 Setting Up `.npmrc` and GitHub Token

To publish or install private packages from GitHub, you need to create a `.npmrc` file in the root of your project and include your GitHub personal access token. **Do not share or commit your token.**

### 1. **Generate a GitHub Personal Access Token**

- Go to your GitHub account settings.
- Navigate to **Developer settings > Personal access tokens > Tokens (classic)**.
- Generate a new token with the `read:packages` (and `write:packages` if you plan to publish) permissions.
- **Copy the token and keep it secure.**

### 2. **Create a `.npmrc` File**

Add the following content to your `.npmrc` file:

```plaintext
//npm.pkg.github.com/:_authToken=YOUR_PERSONAL_ACCESS_TOKEN
```

Replace `YOUR_PERSONAL_ACCESS_TOKEN` with the token you generated.

### 3. **Set the Token Securely for Installation**

**Do NOT commit your `.npmrc` file with the token to version control.**  
Instead, you can use an environment variable for local development:

#### **For PowerShell (Windows):**

```powershell
$env:GITHUB_TOKEN="your_token_here"
npm install
```

#### **For Bash (macOS/Linux):**

```bash
export GITHUB_TOKEN=your_token_here
npm install
```

Then, in your `.npmrc`, use:

```plaintext
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

> **Note:**
>
> - This environment variable approach works with `npm` and Yarn v3+ (not Yarn v1).
> - Never share or commit your token.
> - For CI/CD, set the `GITHUB_TOKEN` as a secret/environment variable in your pipeline settings.

---

## 🌐 Hosting

This site is hosted and deployed to **Netlify** at the following URLs:

- [Development](https://ia-dev.integritymarketinggroup.com)
- [QA](https://ia-qa.integritymarketinggroup.com)
- [Staging](https://ia-stage.integritymarketinggroup.com)
- [UAT](https://ia-uat.integritymarketinggroup.com)

## 📄 License

This project is licensed under the MIT License.
