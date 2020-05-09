'use strict';

let btnStart = document.querySelector("#start"),

   budgetValue = document.querySelector(".budget-value"),
   dayBudgetValue = document.querySelector(".daybudget-value"),
   levelValue = document.querySelector(".level-value"),
   expensesValue = document.querySelector(".expenses-value"),
   optionalExpensesValue = document.querySelector(".optionalexpenses-value"),
   incomeValue = document.querySelector(".income-value"),
   monthSavingsValue = document.querySelector(".monthsavings-value"),
   yearSavingsValue = document.querySelector(".yearsavings-value"),

   expensesItem = document.querySelectorAll(".expenses-item"),
   expensesItemBtn = document.getElementsByTagName("button")[0],

   optionalExpensesItem = document.querySelectorAll(".optionalexpenses-item"),
   optionalExpensesBtn = document.getElementsByTagName("button")[1],

   countBudgetBtn = document.getElementsByTagName("button")[2],

   chooseIncome = document.querySelector(".choose-income"),

   savingsBox = document.querySelector("#savings"),
   chooseSum = document.querySelector(".choose-sum"),
   choosePercent = document.querySelector(".choose-percent"),
   savingsBlock = document.querySelector(".choose-sevings"),

   yearValue = document.querySelector(".year-value"),
   monthValue = document.querySelector(".month-value"),
   dayValue = document.querySelector(".day-value");

let money, time;

expensesItemBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBudgetBtn.disabled = true;

// ----------------Start---------------------

btnStart.addEventListener("click", function () {
   time = prompt("Введите дату в формате YYYY-MM-DD", "");

   while (time == "" || time == null) {
      time = prompt("Введите дату в формате YYYY-MM-DD", "");
   }

   appData.timeData = time;
   yearValue.value = new Date(Date.parse(time)).getFullYear();
   monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
   dayValue.value = new Date(Date.parse(time)).getDate();

   money = +prompt("Ваш бюджет на месяц?", "");

   while (isNaN(money) || money == "" || money == null) {
      money = +prompt("Ваш бюджет на месяц?", "");
   }

   appData.budget = money;
   budgetValue.textContent = money.toFixed(2) + " рублей";

   expensesItemBtn.disabled = false;
   optionalExpensesBtn.disabled = false;
   countBudgetBtn.disabled = false;
});

// --------------------------------------------------
expensesItemBtn.addEventListener("click", function () {
   let sum = 0;
   for (let i = 0; i < expensesItem.length; i++) {
      let spending = expensesItem[i].value,
         amount = +expensesItem[++i].value;
      sum += amount;


      if ((typeof (spending)) != null && (typeof (amount)) != null && spending != "" && amount != "" && spending.length < 50) {
         console.log("good!");
         appData.expenses[spending] = +amount;
      } else {
         console.log("error!");
         i--;
      }
   }
   expensesValue.textContent = sum.toFixed(0) + " рублей";
   appData.expensesSum = sum;
});

// -------------------------------------------------------
optionalExpensesBtn.addEventListener("click", function () {
   for (let i = 0; i < optionalExpensesItem.length; i++) {
      if (typeof (optionalExpensesItem[i].value) != null && optionalExpensesItem[i].value != "") {
         appData.optionalExpenses[i + 1] = optionalExpensesItem[i].value;
      }
   }

   let a = "";
   for (let key in appData.optionalExpenses) {
      a += `${key}. ${appData.optionalExpenses[key]} <br>`;
   }
   optionalExpensesValue.innerHTML = a;
});

// -----------------------------------------------------
countBudgetBtn.addEventListener("click", function () {
   if (appData.budget && appData.expensesSum) {
      appData.moneyPerDay = Math.round((appData.budget - appData.expensesSum) / 30);
      dayBudgetValue.textContent = appData.moneyPerDay + " рублей";

      if (appData.moneyPerDay < 600) {
         levelValue.textContent = "Минимальный доход";
      } else if (appData.moneyPerDay >= 600 && appData.moneyPerDay < 1500) {
         levelValue.textContent = "Средний доход";
      } else if (appData.moneyPerDay >= 1500) {
         levelValue.textContent = "Высокий доход";
      } else {
         levelValue.textContent = "Ошибка!";
      }
   } else {
      dayBudgetValue.textContent = "Для расчета введите данные!";
   }

});

// -----------------------------------------------------
chooseIncome.addEventListener("input", function () {

   while (chooseIncome.value == "" || chooseIncome.value == null) {
      incomeValue.textContent = "введите доход";
   }
   appData.income = chooseIncome.value.split(",");

   let a = "";
   appData.income.forEach(function (item, i) {
      a += `${i + 1}. ${item} <br>`;
   });
   incomeValue.innerHTML = a;

});

// ------------------------------------------------------
savingsBox.addEventListener("click", function () {
   chooseSum.value = "";
   choosePercent.value = "";

   if (savingsBox.checked) {
      appData.savings = true;
      savingsBlock.style.display = "block";
   } else {
      appData.savings = false;
      savingsBlock.style.display = "none";
      monthSavingsValue.textContent = "";
      yearSavingsValue.textContent = "";
   }
});


choosePercent.addEventListener("input", function () {
   let save = +chooseSum.value;
   let percent = +choosePercent.value;

   appData.monthIncome = (save / 100 / 12 * percent).toFixed(2) + " рублей";
   appData.yearIncome = (save / 100 * percent).toFixed(2) + " рублей";
   monthSavingsValue.textContent = appData.monthIncome;
   yearSavingsValue.textContent = appData.yearIncome;

});

chooseSum.addEventListener("input", function () {
   let save = +chooseSum.value;
   let percent = +choosePercent.value;

   appData.monthIncome = (save / 100 / 12 * percent).toFixed(2) + " рублей";
   appData.yearIncome = (save / 100 * percent).toFixed(2) + " рублей";
   monthSavingsValue.textContent = appData.monthIncome;
   yearSavingsValue.textContent = appData.yearIncome;

});


const appData = {
   budget: money,
   timeData: time,
   expenses: {},
   optionalExpenses: {},
   income: [],
   savings: false
};

