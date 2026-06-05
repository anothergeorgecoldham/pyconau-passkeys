import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import yaml from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const informationDir = path.join(root, "Information");
const outputDir = path.join(root, "src", "assets", "slides");
const dataPath = path.join(root, "src", "_data", "talk.yaml");

const sourceImages = new Map([
  ["passkeys_authentication_in_elegant_design.png", "ChatGPT Image Jun 5, 2026, 10_30_42 PM.png"],
  ["authentication_challenges_with_decorative_elegance.png", "ChatGPT Image Jun 5, 2026, 10_31_33 PM.png"],
  ["the_future_of_authentication.png", "ChatGPT Image Jun 5, 2026, 10_32_14 PM.png"],
  ["digital_security_through_elegant_design.png", "ChatGPT Image Jun 5, 2026, 10_32_51 PM.png"],
  ["fragile_connections_shared_secrets_and_security.png", "ChatGPT Image Jun 5, 2026, 10_33_10 PM.png"],
  ["passkeys_explained_with_elegant_design.png", "ChatGPT Image Jun 5, 2026, 10_33_51 PM.png"],
  ["biometric_security_infographic_with_floral_design.png", "ChatGPT Image Jun 5, 2026, 10_34_07 PM.png"],
  ["phishing_real_vs_fake_doors.png", "ChatGPT Image Jun 5, 2026, 10_34_19 PM.png"],
  ["passkeys_and_origin_binding_infographic.png", "ChatGPT Image Jun 5, 2026, 10_34_37 PM.png"],
  ["password_reuse_a_dangerous_connection.png", "ChatGPT Image Jun 5, 2026, 10_34_53 PM.png"],
  ["distinct_keys_for_distinct_services.png", "ChatGPT Image Jun 5, 2026, 10_35_07 PM.png"],
  ["resources_and_further_reading.png", "ChatGPT Image Jun 6, 2026, 12_06_59 AM.png"]
]);

await fs.mkdir(outputDir, { recursive: true });

const talk = yaml.load(await fs.readFile(dataPath, "utf8"));

for (const slide of talk.slides) {
  if (slide.image.endsWith(".webp")) {
    const placeholderPath = path.join(outputDir, slide.image);
    await sharp({
      create: {
        width: 1672,
        height: 941,
        channels: 4,
        background: "#FCFFEB"
      }
    })
      .composite([
        {
          input: Buffer.from(
            `<svg width="1672" height="941" xmlns="http://www.w3.org/2000/svg">
              <rect x="36" y="36" width="1600" height="869" rx="42" fill="#FCFFEB" stroke="#A8813A" stroke-width="4"/>
              <rect x="74" y="74" width="1524" height="793" rx="30" fill="none" stroke="#A8813A" stroke-opacity=".38" stroke-width="2"/>
              <text x="836" y="410" text-anchor="middle" font-family="Georgia, serif" font-size="82" fill="#474350">Resources</text>
              <text x="836" y="500" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" fill="#2F2B38">Slides, notes, source links and implementation references</text>
              <text x="836" y="570" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#474350">QR code and public URL to be added after deployment</text>
            </svg>`
          )
        }
      ])
      .webp({ quality: 92 })
      .toFile(placeholderPath);
    console.log(`created ${path.relative(root, placeholderPath)}`);
    continue;
  }

  const sourceName = sourceImages.get(slide.image);
  if (!sourceName) {
    throw new Error(`No source image mapping for ${slide.image}`);
  }

  const sourcePath = path.join(informationDir, sourceName);
  const outputPath = path.join(outputDir, slide.image.replace(/\.png$/i, ".webp"));
  await sharp(sourcePath).webp({ quality: 92 }).toFile(outputPath);
  console.log(`converted ${sourceName} -> ${path.relative(root, outputPath)}`);
}
