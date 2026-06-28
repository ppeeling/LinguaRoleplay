# Architecture Decision Records (ARDs)

## ARD 001: PWA Offline Architecture
**Context:** The application must function completely offline and be deployable to GitHub Pages without server-side dependencies.
**Decision:** We implement a standard Progressive Web App (PWA) architecture using `vite-plugin-pwa`. This registers a service worker to cache application shells, Vite-hashed assets, and core routes. 
**Consequences:** Enables zero-network functionality for mobile users.

## ARD 002: Client-side Storage for Spaced Repetition (SRS)
**Context:** Need to store user progress, repetitions, and review intervals without a backend database.
**Decision:** Use `IndexedDB` wrapped by the `Dexie.js` library for robust, asynchronous, and easy-to-use client-side storage.
**Consequences:** State persists across browser sessions locally. Data does not sync across devices unless a sync layer is explicitly built later.

## ARD 003: Spaced Repetition System (SRS) Algorithm
**Context:** The app needs to decide when a user should replay a scenario based on self-scored pass/fail grades.
**Decision:** Implement a modified SuperMemo-2 (SM-2) algorithm. Passing increases the interval multiplier, failing resets the repetition counter but preserves a degraded "easiness" factor to avoid infinite penalization.
**Consequences:** Ensures efficient review scheduling optimized for memory retention.

## ARD 004: Text-to-Speech (TTS) Engine
**Context:** Offline requirement precludes using cloud-based TTS services (like Google Cloud TTS or OpenAI TTS).
**Decision:** Utilize the native `window.speechSynthesis` Web Speech API. 
**Consequences:** Zero latency and offline capability. Voice quality depends on the end-user's operating system and installed language packs.
