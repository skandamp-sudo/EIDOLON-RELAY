# EIDOLON RELAY

Offline-first emergency resource coordination — Resurrect 2026.

This is a **research prototype**, not an operational emergency service.

## Concept
People can record emergency needs and resource offers locally. When connectivity is available between peers, records are exchanged, deduplicated and matched.

## Prototype
Python standard library + SQLite; simulated peer-to-peer synchronization, expiring records, resource matching and tests. Wireless transport and message signing are future work.

## Run
`python3 relay.py`

`python3 -m unittest discover -s tests -v`

## Pitch
See `docs/IDEA.md`. PowerPoint presentation is available separately for upload.
