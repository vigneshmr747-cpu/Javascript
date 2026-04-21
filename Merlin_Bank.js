const readline = require("readline-sync");

// User Data
let balance = 10000;
const correctPIN = "1234";

// Messages (Multi-language)
const messages = {
  en: {
    welcome: "🏦 Welcome to SBI ATM",
    insert: "👉 Please insert your card...",
    pin: "Enter your PIN: ",
    wrongPin: "❌ Incorrect PIN",
    menu: "\n===== ATM MENU =====",
    deposit: "Enter amount to deposit: ",
    withdraw: "Enter amount to withdraw: ",
    successDeposit: "✅ Amount Deposited Successfully",
    successWithdraw: "✅ Please collect your cash",
    insufficient: "❌ Insufficient Balance",
    balance: (bal) => `💰 Your Balance: ₹${bal}`,
    exit: "🙏 Thank you for using SBI ATM",
    invalid: "❌ Invalid Option"
  },
  ta: {
    welcome: "🏦 எஸ்.பி.ஐ ATM வரவேற்கிறது",
    insert: "👉 கார்டை உள்ளிடவும்...",
    pin: "PIN எண்ணை உள்ளிடவும்: ",
    wrongPin: "❌ தவறான PIN",
    menu: "\n===== ATM MENU =====",
    deposit: "செலுத்த வேண்டிய தொகை: ",
    withdraw: "எடுக்க வேண்டிய தொகை: ",
    successDeposit: "✅ தொகை வெற்றிகரமாக செலுத்தப்பட்டது",
    successWithdraw: "✅ பணத்தை எடுத்துக்கொள்ளுங்கள்",
    insufficient: "❌ போதுமான இருப்பு இல்லை",
    balance: (bal) => `💰 இருப்பு: ₹${bal}`,
    exit: "🙏 நன்றி! மீண்டும் வருக",
    invalid: "❌ தவறான தேர்வு"
  },
  hi: {
    welcome: "🏦 एसबीआई एटीएम में आपका स्वागत है",
    insert: "👉 कृपया कार्ड डालें...",
    pin: "अपना PIN दर्ज करें: ",
    wrongPin: "❌ गलत PIN",
    menu: "\n===== ATM MENU =====",
    deposit: "जमा राशि दर्ज करें: ",
    withdraw: "निकासी राशि दर्ज करें: ",
    successDeposit: "✅ राशि सफलतापूर्वक जमा हुई",
    successWithdraw: "✅ कृपया अपना नकद लें",
    insufficient: "❌ अपर्याप्त शेष राशि",
    balance: (bal) => `💰 शेष राशि: ₹${bal}`,
    exit: "🙏 धन्यवाद! फिर आएं",
    invalid: "❌ अमान्य विकल्प"
  }
};

// Language Selection
console.log("Select Language:");
console.log("1. English");
console.log("2. Tamil");
console.log("3. Hindi");

let langChoice = readline.question("Enter choice: ");
let lang = langChoice === "2" ? "ta" : langChoice === "3" ? "hi" : "en";
const msg = messages[lang];

// Welcome
console.log("\n" + msg.welcome);
console.log(msg.insert);

// PIN Verification (3 attempts)
let attempts = 3;
while (attempts > 0) {
  let pin = readline.question(msg.pin);
  if (pin === correctPIN) break;
  attempts--;
  console.log(msg.wrongPin);
  if (attempts === 0) process.exit();
}

// Menu Loop
while (true) {
  console.log(msg.menu);
  console.log("1. Deposit");
  console.log("2. Withdraw");
  console.log("3. Balance Enquiry");
  console.log("4. Exit");

  let choice = readline.question("Choose option: ");

  switch (choice) {
    case "1":
      let dep = parseFloat(readline.question(msg.deposit));
      if (dep > 0) {
        balance += dep;
        console.log(msg.successDeposit);
      } else {
        console.log(msg.invalid);
      }
      break;

    case "2":
      let wd = parseFloat(readline.question(msg.withdraw));
      if (wd > balance) {
        console.log(msg.insufficient);
      } else if (wd > 0) {
        balance -= wd;
        console.log(msg.successWithdraw);
      } else {
        console.log(msg.invalid);
      }
      break;

    case "3":
      console.log(msg.balance(balance));
      break;

    case "4":
      console.log(msg.exit);
      process.exit();

    default:
      console.log(msg.invalid);
  }
}