const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let pendingPayments = [];

app.post("/pending-payments", (req, res) => {
  const { username, txnId, amount } = req.body;
  pendingPayments.push({ username, txnId, amount, approved: false });
  res.json({ success: true });
});

app.get("/pending-payments", (req, res) => {
  const unapproved = pendingPayments.filter(p => !p.approved);
  res.json(unapproved);
});

app.post("/approve-payment", (req, res) => {
  const { txnId } = req.body;
  const payment = pendingPayments.find(p => p.txnId === txnId);
  if (payment) {
    payment.approved = true;
    res.json({ success: true, message: "Payment approved!" });
  } else {
    res.json({ success: false, message: "Txn ID not found." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
