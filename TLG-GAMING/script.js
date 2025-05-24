function login() {
    window.location.href = 'login.html';
  }
  
  function showUPIForm() {
    if (!localStorage.getItem("username")) {
      alert("Please log in to join the tournament.");
      return;
    }
    document.getElementById("upi-form").style.display = "block";
  }
  
  function submitPayment() {
    const txnId = document.getElementById("txnId").value;
    const username = localStorage.getItem("username");
  
    if (!txnId) {
      alert("Enter a valid transaction ID.");
      return;
    }
  
    fetch("http://localhost:3000/pending-payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, txnId, amount: 20 })
    })
    .then(res => res.json())
    .then(data => {
      alert("Submitted for approval!");
      document.getElementById("upi-form").style.display = "none";
    });
  }
  