export let checkboxFirstName = document.getElementById("checkbox_first-name");
checkboxFirstName.checked = true;
export let checkboxLastName = document.getElementById("checkbox_last-name");
checkboxLastName.checked = true;
export let checkboxAbout = document.getElementById("checkbox_about");
checkboxAbout.checked = true;
export let checkboxEyeColor = document.getElementById("checkbox_eye-color");
checkboxEyeColor.checked = true;

//показ и скрытие колонок таблицы при клике по чекбоксам
export function hideShowColumn(checkBoxId, columnName) {
    let checkboxValue = document.getElementById(checkBoxId).value;
    let columns = document.getElementsByClassName(columnName);
    if (checkboxValue === "hide") {
        for (let i = 0; i < columns.length; i++) {
            columns[i].style.display = "none";
        }
        document.getElementById(checkBoxId).value = "show";
    } else {
        for (let i = 0; i < columns.length; i++) {
            columns[i].style.display = "table-cell";
        }
        document.getElementById(checkBoxId).value = "hide";
    }
}