const appName = "FinPrivSys";
const page = document.body.dataset.page;

// Set default login token state
if (!sessionStorage.getItem("loggedIn")) {
  sessionStorage.setItem("loggedIn", "false");
}
console.log("Logged in: " + sessionStorage.getItem("loggedIn")); // Print login state for testing

// Redirect to login page if not logged in
if (page !== "login" && sessionStorage.getItem("loggedIn") === "false") {
  location.href = "index.html";
}

// Initialise Connected Accounts
if (!sessionStorage.getItem("connectedAccounts")) {
  const initialAccounts = [
    {
      title: "BNZ",
      balance: 1000,
      savings: 500,
      kiwisaver: 2000,
      mortgage: -500000,
      recentTransactions: [
        {
          from: "Spendings",
          to: "John Doe",
          amount: 200,
          date: "2026-06-01",
        },
        {
          from: "Spendings",
          to: "Savings",
          amount: 500,
          date: "2026-01-15",
        },
        {
          from: "Spendings",
          to: "Jane Smith",
          amount: 20,
          date: "2026-09-27",
        },
      ],
    },
    {
      title: "StudyLink",
      balance: -10000,
      nextPaymentDate: "2026-10-20",
    },
    {
      title: "Sharesies",
      balance: 3000,
      stocks: [
        {
          symbol: "AAPL",
          shares: 10,
          purchasePrice: 300,
          purchaseDate: "2026-02-12",
        },
        {
          symbol: "GOOG",
          shares: 5,
          purchasePrice: 250,
          purchaseDate: "2026-03-19",
        }
      ]
    }
  ]

  sessionStorage.setItem("connectedAccounts", JSON.stringify(initialAccounts));
}

//====================================================================
// Shared Navigation Section

const homeButton = document.getElementById("homeButton");
const logoutButton = document.getElementById("logoutButton");

if (homeButton) {
  homeButton.addEventListener("click", (event) => {
    if (sessionStorage.getItem("loggedIn") === "true") {
      location.href = "home.html";
    }
    event.preventDefault();
  });
}
if (logoutButton) {
  logoutButton.addEventListener("click", (event) => {
    sessionStorage.setItem("loggedIn", "false");
    location.href = "index.html";
    event.preventDefault();
  });
}

//====================================================================
// Login/Pin Page Section  Lucas
if (page === "login") {

  const pinPopup = document.getElementById("pinPopup");
  const pinInput = document.getElementById("pinInput");
  const pinError = document.getElementById("pinError");
  const loginButton = document.getElementById("loginButton");
  const pinButton = document.getElementById("pinButton");
  const cancelPinButton = document.getElementById("cancelPinButton");
  const quickBalanceButton = document.getElementById("quickBalanceButton");
  const balancePopup = document.getElementById("balancePopup");
  const balanceList = document.getElementById("balanceList");
  const closeBalanceButton = document.getElementById("closeBalanceButton");

  const forgotLink = document.getElementById("forgotLink");
  const forgotPopup = document.getElementById("forgotPopup");
  const forgotForm = document.getElementById("forgotForm");
  const forgotEmailInput = document.getElementById("forgotEmailInput");
  const forgotError = document.getElementById("forgotError");
  const forgotMessage = document.getElementById("forgotMessage");
  const forgotSendButton = document.getElementById("forgotSendButton");
  const forgotCloseButton = document.getElementById("forgotCloseButton");

  // Show the pin popup after pressing login
  loginButton.addEventListener("click", () => {
    pinPopup.style.display = "flex";
    pinInput.focus();
  });

  // Accept any 4 digit pin
  pinButton.addEventListener("click", () => {
    if (/^\d{4}$/.test(pinInput.value)) {
      sessionStorage.setItem("loggedIn", "true");
      location.href = "home.html";
    } else {
      pinError.style.display = "block";
      pinInput.value = "";
    }
  });

  // Close the popup
  cancelPinButton.addEventListener("click", () => {
    pinPopup.style.display = "none";
    pinError.style.display = "none";
    pinInput.value = "";
  });

  // Show the balances popup, no login needed
  var balances = JSON.parse(sessionStorage.getItem("connectedAccounts"));
  quickBalanceButton.addEventListener("click", () => {
    balanceList.innerHTML = "";
    for (var i in balances) {
      var balanceCard = document.createElement("div");
      balanceCard.classList.add("balance-card");
      var balanceTitle = document.createElement("p");
      balanceTitle.textContent = balances[i].title;
      balanceTitle.classList.add("balance-title");
      var balanceAmount = document.createElement("p");
      balanceAmount.textContent = "$" + balances[i].balance;
      balanceAmount.classList.add("balance-amount");
      var balanceAvailable = document.createElement("p");
      balanceAvailable.textContent = "$" + balances[i].balance + " Available";
      balanceAvailable.classList.add("balance-available");
      balanceCard.appendChild(balanceTitle);
      balanceCard.appendChild(balanceAmount);
      balanceCard.appendChild(balanceAvailable);
      balanceList.appendChild(balanceCard);
    }
    balancePopup.style.display = "flex";
  });

  closeBalanceButton.addEventListener("click", () => {
    balancePopup.style.display = "none";
  });
  // Show the forgot details popup
  forgotLink.addEventListener("click", (event) => {
    forgotPopup.style.display = "flex";
    forgotEmailInput.focus();
    event.preventDefault();
  });

  // Check the email and show a confirmation message
  forgotSendButton.addEventListener("click", () => {
    if (/^\S+@\S+\.\S+$/.test(forgotEmailInput.value)) {
      forgotForm.style.display = "none";
      forgotMessage.textContent = "A link to reset your username and password has been sent to " + forgotEmailInput.value + ". Check your inbox and spam folder.";
      forgotMessage.style.display = "block";
      forgotCloseButton.textContent = "Close";
    } else {
      forgotError.style.display = "block";
    }
  });

  // Close the popup and reset it
  forgotCloseButton.addEventListener("click", () => {
    forgotPopup.style.display = "none";
    forgotForm.style.display = "block";
    forgotMessage.style.display = "none";
    forgotError.style.display = "none";
    forgotEmailInput.value = "";
    forgotCloseButton.textContent = "Cancel";
  });
}

//====================================================================
// Quick Balances Page Section  Lucas

else if (page === "quickBalances") {

  const balanceTable = document.getElementById("balanceTable");
  const backButton = document.getElementById("backButton");

  // Balances shown in the quick balance popup
  const balances = [
    { title: "Account 1", balance: 1000 },
    { title: "Account 2", balance: 2000 },
    { title: "Account 3", balance: 3000 },
  ];

  balances.forEach((account) => {
    balanceTable.innerHTML +=
      '<tr><td class="col1">' + account.title + '</td>' +
      '<td class="col2">$' + account.balance.toFixed(2) + '</td></tr>';
  });

  backButton.addEventListener("click", () => {
    location.href = "index.html";
  });
}

//====================================================================
// Tyzaks Section for budgeting page
else if (page === "budgeting") {
  const jsonData = sessionStorage.getItem("connectionDetailsData");
  if (jsonData) {
    const data = JSON.parse(jsonData);

    createBudget(data.balance);
  }

  function loadBudgetData() {
    const budgetData = sessionStorage.getItem("budgetData");
    if (budgetData) {
      const data = JSON.parse(budgetData);
      document.getElementById("billsInput").value = data.bills || 0;
      document.getElementById("carInput").value = data.car || 0;
      document.getElementById("groceriesInput").value = data.groceries || 0;
      document.getElementById("insurancesInput").value = data.insurances || 0;
      document.getElementById("subscriptionsInput").value =
        data.subscriptions || 0;
      document.getElementById("spendingInput").value = data.spending || 0;
      document.getElementById("savingsInput").value = data.savings || 0;
    }
    const budget = document.getElementById("budgetInput");
    const bills = document.getElementById("billsInput");
    const car = document.getElementById("carInput");
    const groceries = document.getElementById("groceriesInput");
    const insurances = document.getElementById("insurancesInput");
    const subscriptions = document.getElementById("subscriptionsInput");
    const spending = document.getElementById("spendingInput");
    const savings = document.getElementById("savingsInput");

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        const total =
          (parseFloat(bills.value) || 0) +
          (parseFloat(car.value) || 0) +
          (parseFloat(groceries.value) || 0) +
          (parseFloat(insurances.value) || 0) +
          (parseFloat(subscriptions.value) || 0) +
          (parseFloat(spending.value) || 0) +
          (parseFloat(savings.value) || 0);

        const remaining = parseFloat(budget.value) - total;
        remainingElement.textContent = `Left: $${remaining.toFixed(2)}`;
        const savingsAmount = document.getElementById("savingsResult");
        savingsAmount.textContent = `Savings: $${savings.toFixed(2)}`;
      });
    });
  }

  function createBudget(amount) {
    const budget = document.getElementById("budgetInput");
    const bills = document.getElementById("billsInput");
    const car = document.getElementById("carInput");
    const groceries = document.getElementById("groceriesInput");
    const insurances = document.getElementById("insurancesInput");
    const subscriptions = document.getElementById("subscriptionsInput");
    const spending = document.getElementById("spendingInput");
    const savings = document.getElementById("savingsInput");
    budget.value = amount;
    const remainingElement = document.getElementById("RemainingAmount");
    remainingElement.textContent = `Left: $${amount.toFixed(2)}`;

    const inputs = [
      budget,
      bills,
      car,
      groceries,
      insurances,
      subscriptions,
      spending,
      savings,
    ];

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        const total =
          (parseFloat(bills.value) || 0) +
          (parseFloat(car.value) || 0) +
          (parseFloat(groceries.value) || 0) +
          (parseFloat(insurances.value) || 0) +
          (parseFloat(subscriptions.value) || 0) +
          (parseFloat(spending.value) || 0) +
          (parseFloat(savings.value) || 0);

        const remaining = parseFloat(budget.value) - total;
        remainingElement.textContent = `Left: $${remaining.toFixed(2)}`;
        const savingsAmount = document.getElementById("savingsResult");
        const savingMoney = parseFloat(savings.value) || 0;
        savingsAmount.textContent = `Savings: $${savingMoney.toFixed(2)}`;
      });
    });
  }

  function saveBudget() {
    const budget = document.getElementById("budgetInput");
    const bills = document.getElementById("billsInput");
    const car = document.getElementById("carInput");
    const groceries = document.getElementById("groceriesInput");
    const insurances = document.getElementById("insurancesInput");
    const subscriptions = document.getElementById("subscriptionsInput");
    const spending = document.getElementById("spendingInput");
    const savings = document.getElementById("savingsInput");

    const budgetData = {
      budget: parseFloat(budget.value) || 0,
      bills: parseFloat(bills.value) || 0,
      car: parseFloat(car.value) || 0,
      groceries: parseFloat(groceries.value) || 0,
      insurances: parseFloat(insurances.value) || 0,
      subscriptions: parseFloat(subscriptions.value) || 0,
      spending: parseFloat(spending.value) || 0,
      savings: parseFloat(savings.value) || 0,
    };
    sessionStorage.setItem("budgetData", JSON.stringify(budgetData));
    const saveResult = document.getElementById("saveResult");
    saveResult.textContent = "Budget saved successfully!";
    saveResult.style.display = "block";
  }

  function exportBudget() {
    const budget = document.getElementById("budgetInput");
    const bills = document.getElementById("billsInput");
    const car = document.getElementById("carInput");
    const groceries = document.getElementById("groceriesInput");
    const insurances = document.getElementById("insurancesInput");
    const subscriptions = document.getElementById("subscriptionsInput");
    const spending = document.getElementById("spendingInput");
    const savings = document.getElementById("savingsInput");

    const budgetData = {
      budget: parseFloat(budget.value) || 0,
      bills: parseFloat(bills.value) || 0,
      car: parseFloat(car.value) || 0,
      groceries: parseFloat(groceries.value) || 0,
      insurances: parseFloat(insurances.value) || 0,
      subscriptions: parseFloat(subscriptions.value) || 0,
      spending: parseFloat(spending.value) || 0,
      savings: parseFloat(savings.value) || 0,
    };

    const dataStr = JSON.stringify(budgetData);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFile = "budgetData.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFile);
    linkElement.click();
  }

  const saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", saveBudget);

  const exportButton = document.getElementById("exportButton");
  exportButton.addEventListener("click", exportBudget);

  const loadDataButton = document.getElementById("loadData");
  loadDataButton.addEventListener("click", loadBudgetData);
}

//====================================================================
// Home/Dashboard Page Section
else if (page === "home") {
  const connectionsList = document.getElementById("connectionsList");

  const accountData = JSON.parse(sessionStorage.getItem("connectedAccounts"));

  function accountButton(data) {
    const btn = document.createElement("button");
    btn.classList.add("connection-button");
    const tbl = document.createElement("table");
    tbl.classList.add("connection-table");
    const tr1 = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = data.title;
    th.classList.add("col1");
    tr1.appendChild(th);
    tbl.appendChild(tr1);
    switch(data.title) {
      case "BNZ":
        var bnzData = bnz(data)
        for (var i in bnzData) {
          tbl.appendChild(bnzData[i]);
        }
        break;
      case "StudyLink":
        var studyLinkData = studyLink(data)
        for (var i in studyLinkData) {
          tbl.appendChild(studyLinkData[i]);
        }
        break;
      case "Sharesies":
        var sharesiesData = sharesies(data)
        for (var i in sharesiesData) {
          tbl.appendChild(sharesiesData[i]);
        }
        break;
      default:
        break;
    }
    btn.appendChild(tbl);
    btn.addEventListener("click", () => {
      sessionStorage.setItem("connectionDetailsData", JSON.stringify(data));
      location.href = "connectionDetails.html";
    });
    connectionsList.appendChild(btn);
  }

  function bnz(data) {
    const fields = {"Balance": data.balance, "Kiwisaver": data.kiwisaver, "Mortgage": data.mortgage, "Savings": data.savings};

    var rows = [];
    for (var fieldName in fields) {
      var row = document.createElement("tr");
      var field = document.createElement("td");
      field.classList.add("col1");
      field.textContent = fieldName;
      var value = document.createElement("td");
      value.classList.add("col2");
      value.textContent = fields[fieldName];
      row.appendChild(field);
      row.appendChild(value);
      rows.push(row);
    }

    return rows;
  }

  function studyLink(data) {
    const fields = {"Balance": data.balance, "Next Payment Due": data.nextPaymentDate};
    
    var rows = [];
    for (var fieldName in fields) {
      var row = document.createElement("tr");
      var field = document.createElement("td");
      field.classList.add("col1");
      field.textContent = fieldName;
      var value = document.createElement("td");
      value.classList.add("col2");
      value.textContent = fields[fieldName];
      row.appendChild(field);
      row.appendChild(value);
      rows.push(row);
    }

    return rows;
  }

  function sharesies(data) {
    const fields = {"Balance": data.balance};

    var rows = [];
    for (var fieldName in fields) {
      var row = document.createElement("tr");
      var field = document.createElement("td");
      field.classList.add("col1");
      field.textContent = fieldName;
      var value = document.createElement("td");
      value.classList.add("col2");
      value.textContent = fields[fieldName];
      row.appendChild(field);
      row.appendChild(value);
      rows.push(row);
    }

    return rows;
  }

  // Create a button for each account
  for (var i in accountData) {
    const data = accountData[i];
    accountButton(data);
  }

  // Append 'view all connections' button to bottom of list
  const viewConnectionsButton = document.createElement("button");
  viewConnectionsButton.textContent = "View All Connections";
  viewConnectionsButton.id = "viewConnectionsButton";
  connectionsList.appendChild(viewConnectionsButton);
}

//====================================================================
// Connection Details Page Section
else if (page === "connectionDetails") {
  const jsonData = sessionStorage.getItem("connectionDetailsData");
  const accountTitle = document.getElementById("accountTitle");
  const accountBalance = document.getElementById("accountBalance");

  if (jsonData) {
    const data = JSON.parse(jsonData);

    accountTitle.textContent = data.title;
    accountBalance.textContent = "Total Balance: $" + data.balance;

    var moreDetails = document.getElementById("moreDetails");
    switch (data.title) {
      case "BNZ":
        var savings = document.createElement("h3");
        savings.textContent = "Savings: $" + data.savings;
        var kiwisaver = document.createElement("h3");
        kiwisaver.textContent = "Kiwisaver: $" + data.kiwisaver;
        var mortgage = document.createElement("h3");
        mortgage.textContent = "Mortgage: $" + data.mortgage;
        moreDetails.appendChild(savings);
        moreDetails.appendChild(kiwisaver);
        moreDetails.appendChild(mortgage);
        var recentTransactions = document.createElement("div");
        var rtHeader = document.createElement("h2");
        rtHeader.textContent = "Recent Transactions";
        recentTransactions.appendChild(rtHeader);
        for (var i in data.recentTransactions) {
          var transaction = document.createElement("div");
          transaction.classList.add("transaction");
          for (var j in data.recentTransactions[i]) {
            var p = document.createElement("p");
            var jCap = String(j[0]).toUpperCase() + String(j).slice(1);
            p.textContent = jCap + ": " + data.recentTransactions[i][j];
            transaction.appendChild(p);
          }
          recentTransactions.appendChild(transaction);
        }
        moreDetails.appendChild(recentTransactions);
        break;
      case "StudyLink":
        var nextPaymentDate = document.createElement("h3");
        nextPaymentDate.textContent = "Next Payment Date: " + data.nextPaymentDate;
        moreDetails.appendChild(nextPaymentDate);
        break;
      case "Sharesies":
        var stocks = document.createElement("div");
        for (var i in data.stocks) {
          var stock = document.createElement("div");
          stock.classList.add("stock");
          for (var j in data.stocks[i]) {
            var p = document.createElement("p");
            var jCap = String(j[0]).toUpperCase() + String(j).slice(1);
            p.textContent = jCap + ": " + data.stocks[i][j];
            stock.appendChild(p);
          }
          stocks.appendChild(stock);
        }
        moreDetails.appendChild(stocks);
        break;
      default:
        break;
    }
  }
}

//====================================================================
// Connections List Page Section
else if (page === "connectionsList") {
  // ...
}

//====================================================================
// Add Connection Page Section
else if (page === "connectionsList") {
  // ...
}

//====================================================================
// Manage Connections Page Section
else if (page === "manageConnection") {
  // ...
}

//====================================================================
// Disconnect Service Page Section
else if (page === "disconnectService") {
  const jsonData = sessionStorage.getItem("disconnectionData");
  const accountTitle = document.getElementById("accountTitle");
  const disconnectNote1 = document.getElementById("disconnectNote1");
  const disconnectNote2 = document.getElementById("disconnectNote2");
  const cancelButton = document.getElementById("cancelButton");
  const disconnectButton = document.getElementById("disconnectButton");

  if (jsonData) {
    const data = JSON.parse(jsonData);

    accountTitle.textContent = "Disconnect " + data.title + "?";
    disconnectNote1.textContent =
      data.title + " will no longer be accessible by " + appName;
    disconnectNote2.textContent = "Your " + data.title + " will not be closed";

    cancelButton.addEventListener("click", () => {
      location.href = "manageConnection.html";
    });
    disconnectButton.addEventListener("click", () => {
      location.href = "successfulDisconnect.html";
    });
  }
}

//====================================================================
// Successful Disconnection Page Section
else if (page === "successfulDisconnect") {
  const jsonData = sessionStorage.getItem("disconnectionData");
  const disconnectNote1 = document.getElementById("disconnectNote1");
  const disconnectNote2 = document.getElementById("disconnectNote2");
  const returnButton = document.getElementById("returnButton");
  const dashboardButton = document.getElementById("dashboardButton");

  if (jsonData) {
    const data = JSON.parse(jsonData);

    disconnectNote1.textContent = data.title + " has been disconnected";
    disconnectNote2.textContent =
      appName + " can no longer access " + data.title;

    returnButton.addEventListener("click", () => {
      location.href = "connectionsList.html";
    });
    dashboardButton.addEventListener("click", () => {
      location.href = "home.html";
    });
  }
}
