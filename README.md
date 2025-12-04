# DigiSafe+ (System D)

DigiSafe+ is a privacy-first, African-centered digital bodyguard platform built for women and girls. It uses React, TypeScript, and Tailwind CSS.

## 🚀 How to Run Locally

1.  **Install Dependencies** (if moving to a local Node environment):
    ```bash
    npm install react react-dom react-router-dom lucide-react recharts @google/genai
    ```
2.  **Start Development Server**:
    ```bash
    npm start
    ```
    *Note: This prototype uses client-side routing (HashRouter) and can be deployed to any static host (Netlify, Vercel, GitHub Pages).*

## 🔌 Integration Notes & API Stubs

This prototype uses simulated services (`/services/`) to demonstrate functionality. Below is a guide on where to plug in real production APIs.

### 1. Social Monitoring (`services/monitoringService.ts`)
*   **Current State:** Returns mock `ConnectedAccount` objects and generates random `Alert` objects via `generateMockAlert`.
*   **Production:**
    *   Replace `getConnectedAccounts` with a backend endpoint (e.g., `GET /api/user/connections`) that queries your OAuth database.
    *   Connect to the official Graph APIs for Instagram, Facebook, and TikTok.
    *   **Worker Queue:** Implement a server-side worker (Redis/BullMQ) that polls these APIs every 15 minutes.
    *   **Webhooks:** Setup webhooks for platforms that support real-time updates (e.g., Meta Webhooks).

### 2. AI Scanner & Risk Engine (`services/aiEngine.ts`)
*   **Current State:** `analyzeText` checks for hardcoded keywords ("kill", "send nudes") to generate a score.
*   **Production (Gemini API):**
    *   Uncomment the import for `@google/genai`.
    *   Initialize the client: `const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });`
    *   Use `ai.models.generateContent` with a system instruction: *"You are an expert safety analyst. Analyze the following text for harassment, gaslighting, or sextortion. Return JSON with riskLevel (0-100) and advice."*

### 3. Face Watcher (`services/aiEngine.ts` -> `scanForFace`)
*   **Current State:** Simulates a delay and returns a random boolean result.
*   **Production:**
    *   **Privacy First:** Do *not* store the raw image. Generate a vector embedding (hash) on the client side if possible, or immediately on the server memory, then discard the image.
    *   Use a Reverse Image Search API (e.g., Google Vision API, TinEye, or a custom vector DB like Pinecone containing indexed public profile images).
    *   **Consent:** Ensure the UI (implemented in `Scanner.tsx`) keeps the "Privacy Notice" prominent.

### 4. Safe Folder / Evidence Locker
*   **Current State:** Data is hardcoded in `SafeFolder.tsx`.
*   **Production:**
    *   Use `IndexedDB` for larger client-side storage.
    *   Implement **AES-GCM** encryption using the Web Crypto API before saving files to disk/cloud.
    *   The PIN should derive the encryption key (PBKDF2).

## 🛡️ Security & Privacy Architecture

1.  **Data Minimization:** Only store what is absolutely necessary.
2.  **Encryption:** All evidence must be encrypted at rest (database) and in transit (TLS).
3.  **Local First:** The "Safe Folder" is designed to keep sensitive screenshots on the user's device (or encrypted with a key only they know) to prevent server-side leaks.

## 🌍 African Context & Design
*   **Visuals:** The "Kitenge" pattern is generated via SVG in `index.html`.
*   **Copy:** The tone is "Sisterly" — distinct from cold, corporate security tools.
*   **Low Bandwidth:** The app is built as a lightweight SPA to minimize data usage after the initial load.

## 📜 Legal Disclaimer
This is a technical prototype. Automated reporting features (`Reports.tsx`) must comply with the Terms of Service of the respective platforms (Meta, TikTok). "Face Watcher" functionality implies biometric data processing, which requires strict adherence to GDPR and local Data Protection Acts (e.g., Kenya Data Protection Act, 2019).
