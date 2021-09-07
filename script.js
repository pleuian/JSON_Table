import {dataJSON} from "./data.js";
import {displayColor} from "./eye-colors.js";
import {checkboxFirstName, checkboxLastName, checkboxAbout, checkboxEyeColor, hideShowColumn} from "./checkboxes.js";
import {editButton, selectedRowToInput, editHTMLTableSelectedRow} from "./edit-form.js";

export let table = document.getElementById("table");

let personData = JSON.parse(dataJSON);

let order = true;
let rowsPerPage = 10;
let currentPage = 1;
let editForm = document.querySelector(".edit-form")
let btnClose = document.querySelector(".btn-close");
let btnNext = document.querySelector(".btn-next");
let btnPrev = document.querySelector(".btn-prev");
let pageSpan = document.querySelector(".page");

//загрузка данных из JSON в таблицу
//в соответствии с номером страницы
function loadTableData(personData, page) {
    //при значении "hide" у чекбокса соответствующая ему колонка отображается
    let showFirstName = checkboxFirstName.value === "hide";
    let showLastName = checkboxLastName.value === "hide";
    let showAbout = checkboxAbout.value === "hide";
    let showEyeColor = checkboxEyeColor.value === "hide";

    let firstNameHeader;
    let lastNameHeader;
    let aboutHeader;
    let eyeColorHeader;

    //построение заголовка таблицы в зависимости от значений чекбоксов
    if (showFirstName) {
        firstNameHeader = `<th class="column_first-name">First Name</th>`
    } else {
        firstNameHeader = `<th class="column_first-name" style="display: none">First Name</th>`
    }
    if (showLastName) {
        lastNameHeader = `<th class="column_last-name">Last Name</th>`
    } else {
        lastNameHeader = `<th class="column_last-name" style="display: none">Last Name</th>`
    }
    if (showAbout) {
        aboutHeader = `<th class="column_about">About</th>`
    } else {
        aboutHeader = `<th class="column_about" style="display: none">About</th>`
    }
    if (showEyeColor) {
        eyeColorHeader = `<th class="column_eye-color">Eye Color</th>`
    } else {
        eyeColorHeader = `<th class="column_eye-color" style="display: none">Eye Color</th>`
    }

    let dataHTML = `<tr>${firstNameHeader}${lastNameHeader}${aboutHeader}${eyeColorHeader}</tr>`;

    //постраничное отображение данных таблицы
    //с учётом количества строк на страницу
    for (let i = (page - 1) * rowsPerPage; i < (page * rowsPerPage) && i < personData.length; i++) {
        let person = personData[i];

        let firstNameCell;
        let lastNameCell;
        let aboutCell;
        let eyeColorCell;

        //построение тела таблицы в зависимости от значений чекбоксов
        if (showFirstName) {
            firstNameCell = `<td class="column_first-name">${person.name.firstName}</td>`
        } else {
            firstNameCell = `<td class="column_first-name" style="display: none">${person.name.firstName}</td>`
        }
        if (showLastName) {
            lastNameCell = `<td class="column_last-name">${person.name.lastName}</td>`
        } else {
            lastNameCell = `<td class="column_last-name" style="display: none">${person.name.lastName}</td>`
        }
        if (showAbout) {
            aboutCell = `<td class="column_about"><p>${person.about}</p></td>`
        } else {
            aboutCell = `<td class="column_about" style="display: none"><p>${person.about}</p></td>`
        }
        if (showEyeColor) {
            eyeColorCell = `<td class="column_eye-color">${person.eyeColor}</td>`
        } else {
            eyeColorCell = `<td class="column_eye-color" style="display: none">${person.eyeColor}</td>`
        }

        dataHTML += `<tr>${firstNameCell}${lastNameCell}${aboutCell}${eyeColorCell}</tr>`;
    }

    //заполнение таблицы
    table.innerHTML = dataHTML;

    //ограничение и отображение количества страниц
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();
    pageSpan.innerHTML = page + "/" + numPages();

    //внешний вид кнопок-стрелочек в зависимости
    //от номера страницы, на которой находится пользователь
    if (page === 1) {
        btnPrev.style.opacity = "0.5";
        btnPrev.style.cursor = "default";
    } else {
        btnPrev.style.opacity = "1";
        btnPrev.style.cursor = "pointer"
    }

    if (page === numPages()) {
        btnNext.style.opacity = "0.5";
        btnNext.style.cursor = "default";
    } else {
        btnNext.style.opacity = "1";
        btnNext.style.cursor = "pointer"
    }

    //добавление слушателей при каждом вызове данной функции
    addListenersOnPage();
}

//подбор количества страниц в зависимости от длины массива объектов
//и количества строк на одной странице
function numPages() {
    return Math.ceil(personData.length / rowsPerPage);
}

//переключение между страницами при нажатии на кнопки-стрелочки
btnPrev.onclick = function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadTableData(personData, currentPage);
    }
}

btnNext.onclick = function nextPage() {
    if (currentPage < numPages()) {
        currentPage++;
        loadTableData(personData, currentPage);
    }
}

//расположение содержимого указанного столбца в соответствии с порядком сортировки
function comparer(columnIndex, order) {
    return compareRows;

    //перемещение табличных строк в соответствии со значениями ячеек в сортируемом столбце
    function compareRows(row1, row2) {
        return compareCells(getCellValue(order ? row1 : row2, columnIndex), getCellValue(order ? row2 : row1, columnIndex));

        //поячеечное сравнение данных в столбце
        function compareCells(cell1, cell2) {
            return cell1 !== '' && cell2 !== '' && !isNaN(cell1) && !isNaN(cell2) ? cell1 - cell2 : cell1.toString().localeCompare(cell2);
        }

        //получение данных из ячеек
        function getCellValue(tr, columnIndex) {
            return tr.children[columnIndex].textContent;
        }
    }
}

//добавление слушателей на страницу
function addListenersOnPage() {
    //отображение цвета глаз в качестве фона у ячеек 4-ого столбца, исключая ячейку с заголовком
    document.querySelectorAll('tr:nth-child(n + 2)').forEach(tr => displayColor(tr.children[3]));

    //показ формы редактирования строки с данными при нажатии на неё, исключая строку с заголовками
    document.querySelectorAll('tr:nth-child(n + 2)').forEach(tr => tr.addEventListener('click', (() => {
        editForm.style.display = "block";
        selectedRowToInput(tr);
    })));

    //обновление данных в отредактированной строке таблицы при клике на кнопку "Edit"
    editButton.addEventListener('click', () => {
        editHTMLTableSelectedRow();
    });

    //закрытие формы редактирования при клике на кнопку-крестик
    btnClose.addEventListener('click', () => {
        editForm.style.display = "none";
    });

    //сортировка массива, созданного на основании данных из таблицы,
    //вызываемая кликом по заголовкам соответствующих столбцов, а также
    //инверсия переменной order для чередования порядка сортировки
    document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
        const table = th.closest('table');
        Array.from(table.querySelectorAll('tr:nth-child(n + 2)'))
            .sort(comparer(Array.from(th.parentNode.children).indexOf(th), order = !order))
            .forEach(tr => table.appendChild(tr));
    })));
}

//первичная загрузка, вывод данных таблицы начиная с её первой страницы
//и отслеживание статуса чекбоксов для корректного отображения
//отмеченных столбцов при открытии и перелистывании
window.onload = () => {
    loadTableData(personData, 1);

    checkboxFirstName.addEventListener("change", (() => {
        hideShowColumn("checkbox_first-name", "column_first-name")
    }));
    checkboxLastName.addEventListener("change", (() => {
        hideShowColumn("checkbox_last-name", "column_last-name")
    }));
    checkboxAbout.addEventListener("change", (() => {
        hideShowColumn("checkbox_about", "column_about")
    }));
    checkboxEyeColor.addEventListener("change", (() => {
        hideShowColumn("checkbox_eye-color", "column_eye-color")
    }));
}