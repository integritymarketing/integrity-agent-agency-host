import fs from "fs";
import path from "path";

// Resolve the build directory and redirects file path
const buildDir = path.resolve("dist");
const redirectsFile = path.join(buildDir, "_redirects");

// Ensure the build directory exists
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true }); // Create the dist folder if not exists
}

// Define your redirects content here
const redirectsContent = `
/* /index.html 200
`;

// Write the _redirects file
fs.writeFileSync(redirectsFile, redirectsContent.trim());