"""Local simulation of opportunistic emergency message exchange."""
import sqlite3
import time
import uuid

class Relay:
    def __init__(self, path=":memory:"):
        self.db = sqlite3.connect(path)
        self.db.execute("CREATE TABLE IF NOT EXISTS messages (id TEXT PRIMARY KEY, kind TEXT, category TEXT, quantity INTEGER, location TEXT, expires INTEGER)")
        self.db.commit()

    def create(self, kind, category, quantity, location, ttl=3600):
        if kind not in ("need", "offer") or not isinstance(quantity, int) or quantity <= 0 or not isinstance(ttl, int) or ttl <= 0 or not category.strip() or not location.strip():
            raise ValueError("Invalid message")
        m = dict(id=str(uuid.uuid4()), kind=kind, category=category.strip().lower(), quantity=quantity, location=location.strip().lower(), expires=int(time.time())+ttl)
        self.ingest([m])
        return m

    def ingest(self, messages):
        count = 0
        for m in messages:
            try:
                uuid.UUID(m["id"])
                if m["kind"] not in ("need", "offer") or type(m["quantity"]) is not int or m["quantity"] <= 0 or type(m["expires"]) is not int or m["expires"] <= int(time.time()) or not m["category"] or not m["location"]:
                    continue
                cur = self.db.execute("INSERT OR IGNORE INTO messages VALUES (?,?,?,?,?,?)", (m["id"], m["kind"], m["category"], m["quantity"], m["location"], m["expires"]))
                count += cur.rowcount
            except (KeyError, ValueError, TypeError, sqlite3.Error):
                continue
        self.db.commit()
        return count

    def export(self):
        rows = self.db.execute("SELECT id,kind,category,quantity,location,expires FROM messages WHERE expires > ? ORDER BY id", (int(time.time()),)).fetchall()
        return [dict(zip(("id","kind","category","quantity","location","expires"), r)) for r in rows]

    def matches(self):
        records = self.export()
        return [(n["id"], o["id"]) for n in records for o in records if n["kind"] == "need" and o["kind"] == "offer" and n["category"] == o["category"] and n["location"] == o["location"]]

if __name__ == "__main__":
    a,b=Relay(),Relay()
    a.create("need","water",5,"Puttur")
    b.create("offer","water",10,"Puttur")
    print("Imported:",a.ingest(b.export()),"Matches:",a.matches())
