# PrintIt by Inko Project Handover Document

## Project Context
PrintIt by Inko is an on-demand document printing platform that connects mobile users to local print shops. Users can select documents, configure print settings (color, copies, paper size), find nearby shops, and place an order. Shop owners use a Desktop Agent to receive and print these orders automatically.

### Architecture Overview
The project is a monorepo containing three main applications:
1. **Cloud Backend (`apps/server`)**: A NestJS + Prisma (PostgreSQL) REST API that handles orders, users, shops, and file uploads. It utilizes Cloudflare R2 for scalable S3-compatible document storage and BullMQ/Redis for background processing. Hosted on Render.
2. **Customer Mobile App (`customer-mobile-app`)**: A React Native (Expo Router) application for customers. Users can browse shops (with geospatial sorting), configure prints, upload PDFs, and track their order status in real-time (Swiggy/Uber-style). Supports Guest Checkout and OTA updates via EAS.
3. **Desktop Agent (`apps/desktop-agent`)**: An Electron + React application meant to run on print shop computers. It connects to the backend, fetches the shop's queue, and automatically interfaces with the local machine's printers using `pdf-to-printer` and `unix-print`.

## State of Development
- **Backend**: Fully deployed on Render with an active PostgreSQL database and Redis queue. Migrations are automatically applied during Render deploys (`npx prisma db push --accept-data-loss`). Cloudflare R2 is configured for file storage (`multer` in memory -> `PutObjectCommand`). 
- **Mobile App**: Uses Expo Go for local development. Connected to the production Render API. `expo-updates` is configured for OTA updates via EAS Build. Guest checkout is implemented. The real-time tracker and order history map database statuses (e.g., `READY_TO_PRINT`) to user-friendly strings.
- **Desktop Agent**: Fully functional. It communicates with the production API, maps user names to orders (first name bolded above the order ID), and handles IPC for local printing. 

## Key Technical Decisions & Lessons Learned
1. **Cloudflare R2 TLS/SSL Quirk**: 
   - *Problem*: `multer-s3` caused a 500 error (`SSL alert number 40`) when uploading files to Cloudflare R2 on Render.
   - *Root Cause*: Twofold. First, Cloudflare's edge dropped the TLS handshake because the Account ID in the R2 Endpoint URL had a typo. Second, Cloudflare's wildcard certificate (`*.r2.cloudflarestorage.com`) doesn't cover nested subdomains (`bucket.account.r2...`).
   - *Solution*: Replaced `multer-s3` streaming with `memoryStorage()` + manual `PutObjectCommand`. Added `forcePathStyle: true` to the AWS SDK `S3Client` instantiation to prevent the SDK from using virtual-hosted subdomains. *Do not revert this.*
2. **Mobile App Navigation (Endless Back Stack)**:
   - *Problem*: Users clicking "Back" after placing an order would cycle endlessly through previously visited pages.
   - *Solution*: Replaced `router.replace` with `router.dismissAll(); router.push(...)` in `checkout.tsx` to wipe the stack before entering the order tracker.
3. **Environment & Deployment**:
   - The user strictly prefers pointing everything to the Cloud server (`https://printpanda-api.onrender.com`) for end-to-end testing, rather than using localhost.
   - Any backend `render.yaml` changes or database schema modifications pushed to GitHub `main` branch will automatically trigger a Render redeploy. Give Render ~90 seconds to apply updates before testing.

## Next Steps / Future Work
- **Shop Owner Web Portal**: (Epic 3) The user needs a web dashboard for shop owners to register their shops, configure pricing (Base price, Color price, B&W price), set their location, and view analytics. Currently, shops are seeded manually or via raw API calls.
- **Push Notifications**: Integrating Expo Push Notifications for order status updates.

## Local Development Commands
**Backend**:
```bash
cd apps/server
npx prisma generate
npm run start:dev
```
**Mobile App**:
```bash
cd customer-mobile-app
npx expo start
```
*Note: To build an APK with OTA support for physical devices, run `eas build -p android --profile preview`.*

**Desktop Agent**:
```bash
cd apps/desktop-agent
npm run dev
```
