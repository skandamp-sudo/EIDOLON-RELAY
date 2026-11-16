# EIDOLON RELAY — Hackathon Build Plan

## Purpose
This repository is a **pre-hackathon concept and UI prototype**, not a completed emergency coordination platform. Resurrect 2026 has an online idea round and an onsite 24-hour task assigned by organizers. Confirm the actual finale task and any rules about pre-existing code before implementing the event solution.

## Existing baseline (before event)
- Python SQLite reference engine with basic need/offer matching, expiry and duplicate suppression.
- Static HTML/CSS/JS futuristic command center with a perspective-based canvas visualization.
- Browser-local request and offer records, seeded sample scenario, and simulated sync button.
- Presentation and design documentation.

**Not built:** true peer-to-peer transport, multi-user shared state, backend API, real-time synchronization, authentication, signed messages, delivery receipts, operational emergency functionality.

## Milestone H0 — Freeze baseline
- Tag the last pre-hackathon commit and document its SHA.
- Run Python tests and verify the browser demo.
- Capture baseline screenshots and known issues.
- Do not rewrite history or claim baseline features were built onsite.

## Milestone H1 — Task alignment (0–2 hours)
- Read the organizer-assigned problem.
- Map reusable modules to that task.
- Record any restrictions on prior code, libraries, or AI tools.
- Write acceptance criteria for the event implementation.

## Milestone H2 — Real application flow (2–8 hours)
- Add a backend API with validated create/list operations.
- Persist records to an appropriate database.
- Connect UI to API and show error/loading states.
- Verify requests created in one session appear in another.

## Milestone H3 — Local device exchange (8–15 hours)
- Prototype sync between two devices over a local Wi-Fi network.
- Idempotent message imports, expiration and reconnect handling.
- Document unsupported platforms and transport limitations.

## Milestone H4 — Trust and matching (15–20 hours)
- Introduce basic identity, validation, abuse limits, and human-confirmed matches.
- Test invalid data, stale messages and duplicate deliveries.

## Milestone H5 — Evidence and demo (20–24 hours)
- Run automated and manual tests.
- Demonstrate two-device data exchange, outage and recovery.
- Record exact implemented features, limitations, commit SHAs and test results.

## Safety and honesty
This is not an emergency-grade service. Do not claim real radio mesh connectivity, dispatch or rescue guarantees. Preserve provenance and follow organizer rules.
