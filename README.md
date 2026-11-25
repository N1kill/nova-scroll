# NOVA Scroll — 3D Bottle Showcase (M0–M2)

An interactive 3D WebGL product experience built with Next.js, React Three Fiber, Three.js, and GSAP ScrollTrigger.

## Milestones Implemented (M0–M2)
- **M0**: Next.js App Router setup with Tailwind CSS v4 and Three.js transpilation (`output: 'export'`).
- **M1**: Procedural LatheGeometry bottle with separated body, cap, pump mechanism, and label sleeve meshes.
- **M2**: GSAP ScrollTrigger timeline orchestrating:
  - 0–35%: Continuous 3-revolution bottle spin
  - 35–55%: Bottle component separation (come apart)
  - 55–75%: Camera zoom push-in on the label sleeve
  - 58–70%: Background color interpolation from Sage (`#CFE0D2`) to Plum (`#4A2545`)
  - 85–100%: Full reassembly back into pristine product state

## Local Execution
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Production Build & Static Export
```bash
npm run build
```
Creates an `out/` static directory ready for Cloudflare Pages.

### Cloudflare Pages Deployment Settings
- **Framework Preset**: None / Next.js (Static HTML Export)
- **Build command**: `npm run build`
- **Build output directory**: `out`
