# EIDOLON RELAY — Resurrect 2026

## Problem
Floods, landslides and outages interrupt internet access. Requests for essentials and volunteer offers can become fragmented, duplicated and stale.

## Proposed solution
An offline-first store-and-forward emergency coordination system. People create structured NEED/OFFER messages. Devices exchange records opportunistically, suppress duplicates, expire old records, and match compatible offers.

## Technical architecture
Local SQLite ledger → peer synchronization transport (planned Bluetooth/Wi-Fi Direct/local hotspot) → deterministic reconciliation → resource matching → human confirmation.

## Differentiator
Focus on disrupted-network coordination and auditable message lifecycles, not a conventional internet-dependent SOS button. Prior art includes mesh messaging and disaster response tools; novelty needs comparative evaluation.

## Prototype evidence
Python reference simulation implements local storage, two-node record exchange, deduplication, expiry and matching. It does **not** yet implement radio transport, authentication, encryption, or multi-hop delivery.

## 24-hour milestone
Build a responsive interface, two-device local Wi-Fi synchronization, matching workflow, basic privacy and abuse protections, and repeatable demo.

## Evaluation
Synchronization success, duplicates, expiry, false matches, transfer latency, accessibility, and network-partition recovery.

## Safety
Prototype only. Not for actual emergency operations or guaranteed rescue dispatch.
