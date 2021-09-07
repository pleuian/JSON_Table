let select = document.getElementById("input_eye-color");
let colors = ["black", "blue", "brown", "grey", "green", "orange", "pink", "purple", "red", "white", "yellow"];

//проход по массиву цветов и генерация опций для выпадающего списка
for (let i = 0; i < colors.length; i++) {
    let option = colors[i];
    let dropdownOption = document.createElement("option");
    dropdownOption.textContent = option;
    select.appendChild(dropdownOption);
}

//подбор и установка цвета из возможных вариантов
//в качестве фона ячеек, скрытие в них текста и
//лишение пользователя возможности его выделять
export function displayColor(eyeColorUnit) {
    let color = "";
    switch (eyeColorUnit.textContent) {
        case "black":
            color = "#4e4f53";
            break;
        case "blue":
            color = "#a7c7e7"
            break;
        case "brown":
            color = "#bd9f83";
            break;
        case "grey":
            color = "#b9b9b9";
            break;
        case "green":
            color = "#a9d099";
            break;
        case "orange":
            color = "#fac898";
            break;
        case "pink":
            color = "#ffd0da";
            break;
        case "purple":
            color = "#bea9df";
            break;
        case "red":
            color = "#faa0a0";
            break;
        case "white":
            color = "#ffffff";
            break;
        case "yellow":
            color = "#fae393";
            break;
    }
    eyeColorUnit.style.backgroundColor = color;
    eyeColorUnit.style.color = "rgba(0, 0, 0, 0)";
    eyeColorUnit.style.userSelect = "none";
}