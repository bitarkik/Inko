# Inko / PrintPanda Architecture & Context

This document provides a high-level overview of the entire Print-on-Demand marketplace ecosystem to help agents get up to speed quickly.

## 🏗️ System Overview
The platform is a multi-tenant, distributed print-on-demand marketplace. Customers can upload PDFs via web or mobile apps, select a partner print shop location, and securely transmit the print job. A local hardware agent running at the physical store intercepts the job and prints it automatically.

## 📂 Repository Structure

### 1. Cloud Backend (`apps/server`)
- **Framework:** NestJS, TypeScript
- **Database:** PostgreSQL managed by Prisma ORM (`schema.prisma`). Models include `Store` and `Order`.
- **Queues:** Redis & BullMQ for asynchronous document analysis and processing.
- **Key Concepts:** Uses Multer for PDF `FormData` parsing. Strict relational bindings ensure that orders are sandboxed by `storeId`. Deployed via Render (`render.yaml`).

### 2. Customer Web App (`apps/web`)
- **Framework:** Next.js 14, React, Tailwind CSS
- **Features:** 
  - Dynamic store location selection (hydrated from the backend).
  - Modern Landing, Studio, and Checkout flows.
  - PDF previews via `pdfjs`.
  - "Master Admin Dashboard" and Partner Onboarding (`/partner-signup`).

### 3. Desktop Hardware Agent (`apps/desktop-agent`)
- **Framework:** Electron, Vite, React
- **Purpose:** Installed on a physical Windows PC at the partner print shop.
- **Features:**
  - Persists `STORE_ID` on launch.
  - Long-polls the production Cloud API for new orders.
  - Downloads PDF streams and executes native OS print commands (e.g., PowerShell `Start-Process -Verb Print`).
  - Contains a manual control dashboard for the shop owner and supports cover page printing.
  - **CI/CD:** Uses `electron-updater` and GitHub Actions (`.github/workflows/build-electron.yml`) to automatically compile and distribute `.exe` updates over the air.

### 4. Customer Mobile App (`customer-mobile-app`)
- **Framework:** React Native / Expo
- **Purpose:** A native mobile application port of the customer checkout and upload flow. Supports advanced styling and themes.

## 🚀 Deployment & Infrastructure
- The Cloud backend and Web frontend are deployed to **Render** using a centralized `render.yaml` blueprint.
- Seed scripts (`seed.ts`) and Prisma migrations (`npx prisma db push`) are configured to run automatically during the production build cycle.
- Local development relies on Docker Compose for PostgreSQL and Redis.

## 🧠 Agent Instructions
When working in this repository:
1. Always be mindful of the microservice boundaries. If a frontend needs new data, ensure the Prisma schema and NestJS controllers are updated first.
2. Remember that the Desktop Agent relies on specific Windows shell commands. Test carefully when modifying download/print execution paths.
3. Be aware of strict TypeScript configurations across all apps.
