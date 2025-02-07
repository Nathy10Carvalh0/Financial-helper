const tbody = document.querySelector("tbody");
const date = document.querySelector("#date");
const description = document.querySelector("#description");
const value = document.querySelector("#value");
const type = document.querySelector("#type");
const btnInclude = document.querySelector("#btnInclude");

const Incomes = document.querySelector("#Income");
const Expenses = document.querySelector("#Expense");
const total = document.querySelector("#total");

let items;

function deleteItem(index){
    items.splice(index,1);
    setItensBD();
    loadItens();
}

function insertItem(item, index){
    let tr = document.createElement("tr");

    tr.innerHTML = `
    <td>${item.date}</td>
    <td>${item.description}</td>
    <td>R$${item.value}</td>
    <td class="columnType">${
        item.type === "entrada"
        ?'<i class="bx bxs-chevron-up-circle></i>'
        :'<i class="bx bxs-chevron-down-circle></i>'
    }</td>
    <td class=columnAction>
    <button onclick="deleteItem(${index})"<i class='bx bx-trash'></i></button>
    </td>
    `;
}

function loadItens(){
    items= getItensBD();
    tbody.innerHTML = "";
    items.forEach((item,index)=>{
        insertItem(item,index);
    })
    getTotals();
}
function getTotals(){
    const valueIncomes = items
    .filter((item)=> item.type === "income")
    .map((transaction)=>Number(transaction.value));

    const  valueExpenses= items
    .filter((item)=> item.type === "expense")
    .map((transaction)=>Number(transaction.value));

    const totalIncomes = valueIncomes
    .reduce((acc,cur)=> acc + cur, 0)
    .toFixed(2);
    
    const totalIncomes = valueIncomes
    .reduce((acc,cur)=> acc + cur, 0)
    .toFixed(2);
}
const getItensBD = () => JSON.parse(localStorage.getItem("db_items")) ?? [];
const setItensBD = () =>
    localStorage.setItem("db_items",JSON.stringify(items));

loadItens();
