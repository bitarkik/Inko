# Project PrintPanda / Inko - Handover Document

## 1. Project Overview
PrintPanda is a modern printing ecosystem designed to connect students with local print shops (like those in Nilkhet or university campuses). 

**The ecosystem consists of 3 parts:**
1. **Customer Mobile App (`customer-mobile-app`)**: A React Native (Expo) app for students to upload PDFs, pick shops, and track live printing queues. **(This is fully functional and feature-complete for MVP)**.
2. **Shop Owner Web Portal (`apps/web`)**: A Next.js marketing and partner portal where print shops register, set prices, and manage their dashboard. **(This is the target for the next session)**.
3. **Desktop Agent (`apps/desktop-agent`)**: An Electron app that runs on the print shop's Windows PC to actually automate the printer.
4. **Backend (`apps/server`)**: A NestJS API powered by PostgreSQL (Prisma).

---

## 2. What We Accomplished in the Mobile App
The Mobile App is fully wired up to the backend and ready for real-world testing.
* **UI/UX**: Implemented a "Quiet Luxury" minimal black-and-white theme.
* **Location Services**: Integrated `expo-location` and real Haversine distance calculations so students see the closest shops.
* **Authentication**: Built `AuthContext` and a persistent login/signup flow relying on Phone Number & Password.
* **Order Flow**: Customers can select a PDF, calculate dynamic pricing, choose Cash/bKash, and place an order directly into the PostgreSQL database.
* **Order Tracking & History**: Customers have a live Swiggy-style tracker and an "Orders" tab fetching historical data from `/orders/me`. 
* **Cancellation**: Users can safely cancel an order if the shop hasn't started printing yet.

---

## 3. Current Backend State (`apps/server`)
* **Database**: Running locally on `127.0.0.1:5433` via Docker (`docker-compose.yml` in root).
* **Models**: `User`, `Store`, and `Order` are fully modeled and migrated.
* **Enums**: `OrderStatus` handles the full lifecycle (`PENDING_PAYMENT`, `QUEUED`, `PROCESSING`, `READY_TO_PRINT`, `PRINTING`, `READY_TO_PICKUP`, `COMPLETED`, `CANCELLED`).
* **Seed**: We seeded 2 test stores (`downtown`, `library`) using `prisma/seed.ts`.

---

## 4. Next Steps for the Next Agent (Shop Owner Web Portal)
The next session will focus entirely on `apps/web` (Next.js).

1. **Wire up Partner Signup**: 
   - `apps/web/app/partner-signup/page.tsx` has a UI, but it needs to actually send the data to the NestJS backend to create a `Store` in the database.
   - *Backend Task*: Ensure the `POST /stores` route in NestJS is ready to accept Name, Address, and Base Price.
2. **Shop Owner Dashboard**: 
   - Build a dashboard where the shop owner can see a live queue of incoming orders.
   - Allow the shop owner to click a button to change an order's status from `QUEUED` to `PRINTING` (which will update the student's mobile app live).
3. **Map Integration**: 
   - Allow shop owners to drop a pin on a map during signup so their real `latitude/longitude` is saved to the database.
4. **Desktop Agent Prep**:
   - Provide a portal for the shop owner to download the `Inko Desktop Agent` and retrieve their unique `storeId` API key.
