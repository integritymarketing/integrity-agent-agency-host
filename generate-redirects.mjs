import fs from "fs";
import path from "path";

// Resolve the build directory and redirects file path
const buildDir = path.resolve("build");
const redirectsFile = path.join(buildDir, "_redirects");

// Ensure the build directory exists
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true }); // Create the build folder if not exists
}

// Define your redirects content here
const redirectsContent = `
/old-route /new-route 301
`;

// Write the _redirects file
fs.writeFileSync(redirectsFile, redirectsContent.trim());
