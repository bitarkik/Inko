# PrintPanda Project Handover & Context

Welcome to the PrintPanda project! This document contains all the essential context, knowledge, architecture details, and deployment instructions you need to continue working on this project. 

## 1. Project Overview
PrintPanda is a distributed printing network platform that connects users with local print shops ("Partners").
- **Users** can upload documents, select print options (B&W/Color), and send them to a specific print shop.
- **Shop Owners (Partners)** register their shops on the network, download a Desktop Agent, and receive incoming print jobs automatically to their local printers.

## 2. System Architecture
The platform is a monolithic repository (`bitarkik/Inko`) structured into several apps:

### A. The Backend API (`apps/server`)
- **Framework**: NestJS (TypeScript)
- **Database ORM**: Prisma + PostgreSQL
- **Key Models**: 
  - `Store` (id, name, address, latitude, longitude, basePrice, services, email, contactNumber, ownerName)
  - `Order` (status, fileUrl, totalPages, totalPrice)
- **Important Note on Validation**: NestJS uses `ValidationPipe` with `whitelist: true`. All incoming API requests *must* have a properly decorated DTO (like `CreateStoreDto.ts`). If you use inline typing (e.g. `@Body() body: { name: string }`), NestJS will aggressively strip all properties and cause silent failures.

### B. The Web Frontend (`apps/web`)
- **Framework**: Next.js (App Router, Tailwind CSS, lucide-react)
- **Deployment**: Vercel (Auto-deploys on `main` branch push)
- **Key Flows**: 
  - `/partner-signup`: The shop owner registration wizard.
  - `/partner`: The web-based shop owner dashboard.
- **Map & Geocoding**: We use `react-leaflet` for maps. Nominatim API is used for reverse-geocoding (fetching address strings from map pins). We use a debouncer (1.2s) and an email User-Agent header to prevent Nominatim from rate-limiting us.

### C. The Desktop Agent (`apps/desktop-agent`)
- **Framework**: Electron
- **Purpose**: Installed on the shop owner's physical computer to securely listen for print jobs from the API and execute them on their local printer hardware.
- **Distribution**: Hosted via GitHub Releases. The web frontend dynamically points to the `latest` GitHub release using a Magic URL (`/releases/latest/download/PrintPanda-Agent-Setup.exe`).

## 3. Current State & Recent Accomplishments
We recently revamped the **Partner Onboarding Flow** (`/partner-signup`):
- Added precise GPS Leaflet map pinning.
- Fixed Nominatim rate-limit issues with `useCallback` and debounce logic to prevent React infinite rendering loops.
- Expanded the Database Schema to include shop metadata, operating hours, `ownerName`, `contactNumber`, and `email`.
- Switched from automatic browser downloads to a highly reliable 1-click **GitHub Release Download** button that fetches the `.exe` instantly.

## 4. How to Approach Future Development (The Shop Owner Portal)
You are about to start working on the **Shop Owner Portal**. Here are the guiding principles:

### A. The Goal of the Web Portal vs. The Desktop Agent
- **The Desktop Agent** should act purely as a silent, background execution engine. Its only job is to stay online, poll for orders, and trigger the physical printer.
- **The Web Portal** (`/partner`) should be the control center. Shop owners should log into the web portal to view revenue, approve/reject orders, change their store hours, and update pricing. 

### B. Deployment Protocol
1. **Frontend/Backend Updates**: Simply push changes to the `main` branch on GitHub. Vercel and Render will automatically detect the commit and deploy the updates live. 
   ```bash
   git add .
   git commit -m "feat: your description"
   git push origin main
   ```
2. **Desktop Agent Updates**:
   - Bump the version number in your `package.json`.
   - Build the `.exe` file using your Electron builder.
   - Go to your GitHub repository and draft a new Release (e.g. `v2.2.0`).
   - Attach **two** copies of your executable: `PrintPanda-Agent-Setup-2.2.0.exe` (for the auto-updater) and `PrintPanda-Agent-Setup.exe` (for the website download button).

## 5. Known Quirks & Tips
- **Leaflet in Next.js**: Leaflet maps *must* be dynamically imported (`ssr: false`) because it references the `window` object. 
- **Prisma Schema Changes**: If you add a new field to `schema.prisma`, you MUST run `npx prisma db push` and `npx prisma generate` locally, and ensure you update your DTOs so the API doesn't strip the fields.
- **File Downloads**: Never use Google Drive for hosting executables larger than 100MB, as it forces a virus-scan interstitial page. Always use GitHub Releases for seamless 1-click downloads.

Good luck building the rest of the ecosystem!
