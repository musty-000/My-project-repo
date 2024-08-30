const inputName = document.getElementById("input-name");
const inputEmail = document.getElementById("input-email");
const inputPhone = document.getElementById("input-phone");

const errorName = document.querySelector(".error-name");
const errorPhone = document.querySelector(".error-phone");
const errorEmail = document.querySelector(".error-email");

const stepForm1 = document.getElementById("section-form1");
const stepForm2 = document.getElementById("section-form2");
const stepForm3 = document.getElementById("section-form3");
const stepForm4 = document.getElementById("section-form4");

const step1 = document.querySelector(".step1");
const step2 = document.querySelector(".step2");
const step3 = document.querySelector(".step3");
const step4 = document.querySelector(".step4");

const billArcade = document.querySelector(".bill-arcade");
const billAvanced = document.querySelector(".bill-advanced");
const billPro = document.querySelector(".bill-pro");

const allSection = document.querySelectorAll(".section-form");
const allNum = document.querySelectorAll(".num");
const allSubs = document.querySelectorAll(".sub");
const rateTitle = document.querySelectorAll(".rate");
const addons = document.querySelectorAll(".addon");
const cost = document.querySelectorAll(".cost");

const subscription = {
  monthly: {
    arcade: 9,
    advanced: 12,
    pro: 15,
  },
  yearly: {
    arcade: 90,
    advanced: 120,
    pro: 150,
  },
};
const addonObj = {
  addons: ["Online service", "Larger storage", "Customizable profile"],
  monthly: [1, 2, 2],
  yearly: [10, 20, 20],
};

const userObject = {};

const navigate = function (pageNum) {
  allSection.forEach((section) => {
    section.classList.add("hidden");
  });
  allSection[pageNum].classList.remove("hidden");
};
navigate(0);

const showActive = function () {
  for (let i = 0; i < allSection.length; i++) {
    if (!allSection[i].classList.contains("hidden")) {
      for (let j = 0; j < allNum.length; j++) {
        allNum[j].classList.remove("active-step");
        allNum[i].classList.add("active-step");
      }
    }
  }
};
showActive();

document.querySelector(".next1").addEventListener("click", function () {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    inputName.value != "" &&
    inputPhone.value != "" &&
    emailRegex.test(inputEmail.value) &&
    !inputEmail.value == ""
  ) {
    userObject.name = inputName.value;
    userObject.email = inputEmail.value;
    userObject.phone = inputPhone.value;
    console.log(userObject);
    
    navigate(1);
    showActive();
    billArcade.textContent = `$${subscription.monthly.arcade}/mo`;
    billAvanced.textContent = `$${subscription.monthly.advanced}/mo`;
    billPro.textContent = `$${subscription.monthly.pro}/mo`;
  } else {
    if (inputName.value == "") {
      errorName.textContent = "This field is required";
      inputName.style.borderColor = "var(--strawberry-red)";
      inputName.style.borderColor = "var(--cool-grey)";
      errorName.textContent = "";
    }
    if (inputPhone.value == "") {
      errorPhone.textContent = "This field is required";
      inputPhone.style.borderColor = "var(--strawberry-red)";
    } else {
      inputPhone.style.borderColor = "var(--cool-grey)";
      errorPhone.textContent = "";
    }
     if (inputEmail.value == "") {
       errorEmail.textContent = "This field is required";
       inputEmail.style.borderColor = "var(--strawberry-red)";
     } else if (!emailRegex.test(inputEmail.value)) {
       errorEmail.textContent = "valid email required";
       inputEmail.style.borderColor = "var(--strawberry-red)";
     } else {
       inputEmail.style.borderColor = "var(--cool-grey)";
       errorEmail.textContent = "";
     }
  }
});

document.querySelector(".back2").addEventListener("click", function () {
  navigate(0);
  showActive();
});
const toggle = document.querySelector(".toggle");
toggle.addEventListener("click", function () {
  toggle.classList.toggle("toggle-yearly");
  for (let i = 0; i < rateTitle.length; i++) {
    rateTitle[i].classList.toggle("active-rate");
  }
  if (toggle.classList.contains("toggle-yearly")) {
    billArcade.textContent = `$${subscription.yearly.arcade}/yr`;
    billAvanced.textContent = `$${subscription.yearly.advanced}/yr`;
    billPro.textContent = `$${subscription.yearly.pro}/yr`;
  } else {
    billArcade.textContent = `$${subscription.monthly.arcade}/mo`;
    billAvanced.textContent = `$${subscription.monthly.advanced}/mo`;
    billPro.textContent = `$${subscription.monthly.pro}/mo`;
  }
});

document.querySelector(".yearly").addEventListener("click", () => {
  toggle.classList.add("toggle-yearly");

  billArcade.textContent = `$${subscription.yearly.arcade}/yr`;
  billAvanced.textContent = `$${subscription.yearly.advanced}/yr`;
  billPro.textContent = `$${subscription.yearly.pro}/yr`;

  document.querySelector(".yearly").classList.add("active-rate");
  document.querySelector(".monthly").classList.remove("active-rate");
});
document.querySelector(".monthly").addEventListener("click", () => {
  toggle.classList.remove("toggle-yearly");

  billArcade.textContent = `$${subscription.monthly.arcade}/mo`;
  billAvanced.textContent = `$${subscription.monthly.advanced}/mo`;
  billPro.textContent = `$${subscription.monthly.pro}/mo`;

  document.querySelector(".monthly").classList.add("active-rate");
  document.querySelector(".yearly").classList.remove("active-rate");
});

for (let i = 0; i < allSubs.length; i++) {
  allSubs[i].addEventListener("click", function () {
    allSubs.forEach((sub) => {
      sub.classList.remove("active-sub");
      allSubs[i].classList.add("active-sub");
    });
  });
}
document.querySelector(".next2").addEventListener("click", function () {
  let timeframe = "";
  let subType = "";
  if (toggle.classList.contains("toggle-yearly")) {
    timeframe = "yearly";
    if (allSubs[0].classList.contains("active-sub")) {
      subType = "arcade";
    } else if (allSubs[1].classList.contains("active-sub")) {
      subType = "advanced";
    } else if (allSubs[2].classList.contains("active-sub")) {
      subType = "pro";
    }
  } else {
    timeframe = "monthly";
    if (allSubs[0].classList.contains("active-sub")) {
      subType = "arcade";
    } else if (allSubs[1].classList.contains("active-sub")) {
      subType = "advanced";
    } else if (allSubs[2].classList.contains("active-sub")) {
      subType = "pro";
    }
  }

  userObject.subscribtionDuration = timeframe;
  userObject.subscribtionType = subType;
  console.log(userObject);

  navigate(2);
  showActive();

  for (let i = 0; i < cost.length; i++) {
    timeframe == "monthly"
      ? (cost[i].textContent = `+$${addonObj.monthly[i]}/mo`)
      : (cost[i].textContent = `+$${addonObj.yearly[i]}/yr`);
  }
});
document.querySelector(".back3").addEventListener("click", function () {
  navigate(1);
  showActive();
});

userObject.addonList = new Set();
console.log(userObject.addonList);
for (let i = 0; i < addons.length; i++) {
  addons[i].addEventListener("click", function () {
    addons[i].classList.toggle("addon-active");

    if (addons[i].classList.contains("addon-active")) {
      userObject.addonList.add(i);
    } else {
      userObject.addonList.delete(i);
    }
  });
}
let div;
let divCost;
document.querySelector(".next3").addEventListener("click", function () {
  navigate(3);
  showActive();

  let subscribtionDuration = userObject.subscribtionDuration;
  let subtype = userObject.subscribtionType;

  // to display subscription type and cost
  document.querySelector(".user-sub-title").textContent = `${subtype.replace(
    subtype[0],
    subtype[0].toUpperCase()
  )} (${subscribtionDuration})`;

  document.querySelector(".user-sub").textContent =
    subscribtionDuration == "yearly"
      ? `$${subscription.yearly[subtype]}/yr`
      : `$${subscription.monthly[subtype]}/mo`;

  // TO DISPLAY ADDONS SLECTED AND COST.
  let totalCostAddon = 0;
  if (userObject.addonList.size != 0) {
    for (let addonlist of userObject.addonList) {
      div = document.createElement("div");
      div.textContent = `${addonObj.addons[addonlist]}`;
      document.querySelector(".chosen-addons").append(div);

      divCost = document.createElement("span");
      divCost.classList.add("user-addon-cost");
      subscribtionDuration == "yearly"
        ? (divCost.textContent = `$${addonObj[subscribtionDuration][addonlist]}/yr`)
        : (divCost.textContent = `$${addonObj[subscribtionDuration][addonlist]}/mo`);
      div.append(divCost);

      totalCostAddon += addonObj[subscribtionDuration][addonlist];
    }
  }

  // TO DISPLAY TE TOTAL COST
  userObject.totalCostOfAddons = totalCostAddon;
  console.log(subtype, typeof subtype);
  let variable = subscription[subscribtionDuration];
  console.log(subscription);
  console.log(variable);
  console.log(subscribtionDuration);
  let total = subscription[subscribtionDuration][subtype] + totalCostAddon;
  userObject.totalCostOfSubscribtion = total;
  document.querySelector(
    ".total-time"
  ).textContent = `Total per(${subscribtionDuration.slice(0, -2)})`;
  document.querySelector(".total-cost").textContent =
    subscribtionDuration == "yearly" ? `$${total}/yr` : `$${total}/mo`;
});

document.querySelector(".back4").addEventListener("click", function () {
  document.querySelector(".chosen-addons").textContent = "";
  navigate(2);
  showActive();
});
document.querySelector(".change").addEventListener("click", function () {
  for (let i = 0; i < addons.length; i++) {
    userObject.addonList.delete(i);
    addons[i].classList.remove("addon-active");
  }
  document.querySelector(".chosen-addons").textContent = "";
  navigate(1);
});
document.querySelector("#confirm").addEventListener("click", function () {
  console.log(userObject);
  navigate(4);
});
