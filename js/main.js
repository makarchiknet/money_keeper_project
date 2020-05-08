'use strict';

let btnStart = document.querySelector("#start"),

   budgetValue = document.querySelector(".budget-value"),
   dayBudgetValue = document.querySelector(".daybudget-value"),
   levelValue = document.querySelector(".level-value"),
   expensesValue = document.querySelector(".expenses-value"),
   optionaLexpensesValue = document.querySelector(".optionalexpenses-value"),
   incomeValue = document.querySelector(".income-value"),
   monthSavingsValue = document.querySelector(".monthsavings-value"),
   yearSavingsValue = document.querySelector(".yearsavings-value"),

   expensesItem = document.querySelectorAll(".expenses-item"),
   expensesItemBtn = document.getElementsByTagName("button")[0],

   optionalExpensesItem = document.querySelectorAll(".optionalexpenses-item"),
   optionalExpensesBtn = document.getElementsByTagName("button")[1],

   countBudgetBtn = document.getElementsByTagName("button")[2],

   chooseIncome = document.querySelector(".choose-income"),

   savings = document.querySelector("#savings"),
   chooseSum = +document.querySelector(".choose-sum").value,
   choosePercent = +document.querySelector(".choose-percent").value,

   yearValue = document.querySelector(".year-value"),
   monthValue = document.querySelector(".month-value"),
   dayValue = document.querySelector(".day-value");

let money, time;


function start() {
   money = +prompt("Ваш бюджет на месяц?", "");
   time = prompt("Введите дату в формате YYYY-MM-DD", "");

   while (isNaN(money) || money == "" || money == null) {
      money = +prompt("Ваш бюджет на месяц?", "");
   }
}
start();

const appData = {
   budget: money,
   timeData: time,
   expenses: {},
   optionalExpenses: {},
   income: [],
   savings: false,
   chooseExpenses: function () {
      for (let i = 0; i < 2; i++) {
         let spending = prompt("Введите обязательную статью расходов в этом месяце", ""),
            amount = prompt("Во сколько обойдется?", "");

         if ((typeof (spending)) != null && (typeof (amount)) != null && spending != "" && amount != "" && spending.length < 50) {
            console.log("good!");
            appData.expenses[spending] = +amount;

         } else {
            console.log("error!");
            i--;
         }
      }
   },
   detectDayBudget: function () {
      appData.moneyPerDay = Math.round(appData.budget / 30);
      console.log(appData.moneyPerDay);
   },
   detectLevel: function () {
      if (appData.moneyPerDay < 600) {
         console.log("Минимальный доход");
      } else if (appData.moneyPerDay >= 600 && appData.moneyPerDay < 1500) {
         console.log("Средний доход");
      } else if (appData.moneyPerDay >= 1500) {
         console.log("Высокий доход");
      } else {
         console.log("Ошибка!");
      }
   },
   checkSavings: function () {
      if (appData.savings == true) {
         let save = +prompt("Какова сумма накоплений?", "");
         while (isNaN(save) || save == "" || save == null) {
            save = +prompt("Какова сумма накоплений?", "");
         }

         let percent = +prompt("Какие проценты по кредиту?", "");
         while (isNaN(percent) || percent == "" || percent == null) {
            percent = +prompt("Какие проценты по кредиту?", "");
         }

         appData.monthIncome = +(save / 100 / 12 * percent).toFixed(2);
         alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
      }
   },
   chooseOptExpenses: function () {
      for (let i = 0; i < 3; i++) {
         let optExpenses = prompt("Статья необязательных расходов?", "");
         if (typeof (optExpenses) != null && optExpenses != "") {
            appData.optionalExpenses[i + 1] = optExpenses;
         } else {
            i--;
         }
      }
   },
   chooseIncome: function () {
      let items = prompt("что может принести дополнительный доход (перечислите через запятую?)", "");
      while (typeof (items) == "number" || items == "" || items == null) {
         items = prompt("что может принести дополнительный доход (перечислите через запятую?)", "");
      }
      appData.income = items.split(", ");
      appData.income.push(prompt("Может что-то еще?", ""));
      appData.income.sort();

      let a = "Способы доп. заработка: " + "\n";
      appData.income.forEach(function (item, i) {
         a += `${i + 1} ${item}\n`;
      });
      alert(a);
   }
};


function showAppData() {
   console.log("Наша программа включает в себя данные:");
   for (let key in appData) {
      console.log(key);
   }
}
showAppData();
