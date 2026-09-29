const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env");

if (!process.env.DATABASE_URL && !fs.existsSync(envPath)) {
  console.log("[ensure-env] Creating fallback .env with SQLite DATABASE_URL and NEXTAUTH_SECRET");
  fs.writeFileSync(
    envPath,
    'DATABASE_URL="file:./dev.db"\nNEXTAUTH_SECRET="zaltrex-enterprise-super-secret-key-prod-omega-2026"\n'
  );
} else {
  console.log("[ensure-env] Environment or .env already present.");
}
