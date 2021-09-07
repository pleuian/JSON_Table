import {displayColor} from "./eye-colors.js";
import {table} from "./script.js";

let rowIndex;
let inputFirstName = document.getElementById("input_first-name");
let inputLastName = document.getElementById("input_last-name");
let inputAbout = document.getElementById("input_about");
let inputEyeColor = document.getElementById("input_eye-color");
export let editButton = document.querySelector(".btn-edit");

//заполнение полей формы редактирования
//соответствующим содержимым выбранного ряда
export function selectedRowToInput(tr) {
    rowIndex = tr.rowIndex;
    inputFirstName.value = tr.cells[0].textContent;
    inputLastName.value = tr.cells[1].textContent;
    inputAbout.value = tr.cells[2].textContent;
    inputEyeColor.value = tr.cells[3].textContent;
}

//перенос данных из формы редактирования в таблицу
export function editHTMLTableSelectedRow() {
    table.rows[rowIndex].cells[0].innerText = inputFirstName.value;
    table.rows[rowIndex].cells[1].innerText = inputLastName.value;
    table.rows[rowIndex].cells[2].children[0].textContent = inputAbout.value;

    //отображение заданного цвета в качестве фона в ячейках с цветом глаз
    let eyeColorUnit = table.rows[rowIndex].cells[3];
    eyeColorUnit.innerText = inputEyeColor.value;
    displayColor(eyeColorUnit);

    //очистка формы и снятие выбора со строки таблицы
    inputFirstName.value = "";
    inputLastName.value = "";
    inputAbout.value = "";
    inputEyeColor.value = "";
    rowIndex = null;
}