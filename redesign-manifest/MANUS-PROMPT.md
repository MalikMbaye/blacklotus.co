# Redesign Brief — Asset Rules for Black Lotus Case Studies

You are redesigning **blacklotus.co**. Every case study page must reuse the EXACT
graphics from the current site — all of them, full-resolution, in the original order.
Do NOT invent, AI-generate, substitute, crop, or omit images.

## Source of truth (attached)
- **assets-by-project.md** — per project, the ordered list of every content image + video, each with a fetchable URL and the section it belongs to.
- **assets-manifest.json** — same data, structured: `projects[slug].images[]` / `.videos[]`, each image has `file`, `url`, `filename`, `section`, `alt`, `exists`.

## Hard rules
1. **Use EVERY asset** listed for a project — no omissions, no extras, no stand-ins.
2. **Preserve the ORDER** given (it mirrors the live page top→bottom). The `section` label shows which content block each asset belongs to.
3. **Full-resolution originals only** — already resolved for you; never downscale or swap for a thumbnail.
4. **Content assets only.** Site chrome (logo, nav, footer) is intentionally excluded — design fresh chrome around these.
5. **Fetch** each asset from its CDN URL (jsDelivr): `https://cdn.jsdelivr.net/gh/MalikMbaye/blacklotus.co@main/<path>` (already URL-encoded in the manifest; no rate limits).
6. **Videos:** `embed` = YouTube/Vimeo, keep as an embed. `file` = local video, fetch via its URL.

## Coverage
30 case studies · 529 content images · 27 videos.

## WARNING — assets missing from the export (source these separately first)
- **bridge-travel-app**: 16 of 17 images missing (referenced a `2022/` media folder not present in the export).
- **bookum-app**: 1 of 18 images missing (referenced a `2022/` media folder not present in the export).

These files are flagged `⚠️MISSING` in the manifest and have `"exists": false` in the JSON. Re-source them from the original Figma / WordPress media library before building those pages.
