import unittest
from relay import Relay

class RelayTests(unittest.TestCase):
    def test_sync_dedup_and_match(self):
        a,b=Relay(),Relay()
        a.create("need","water",3,"Puttur")
        b.create("offer","water",7,"Puttur")
        self.assertEqual(a.ingest(b.export()),1)
        self.assertEqual(a.ingest(b.export()),0)
        self.assertEqual(len(a.matches()),1)

    def test_invalid_quantity(self):
        with self.assertRaises(ValueError):
            Relay().create("need","water",0,"Puttur")

    def test_expiry(self):
        a,b=Relay(),Relay()
        m=a.create("need","food",1,"Puttur")
        m["expires"]=0
        self.assertEqual(b.ingest([m]),0)

if __name__=="__main__":
    unittest.main()
