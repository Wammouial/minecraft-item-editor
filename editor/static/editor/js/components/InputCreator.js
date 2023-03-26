const SELECTS = {
    "materials": [
        "red", "green", "blue"
    ]
}

function createInput(key, value, keystree, pushitem) {
    let input;

    const inputID = `input-${keystree}--${key}`;

    const container = document.createElement("li");
    container.className = "";
    const label = createLabelForInput(key, inputID);

    container.appendChild(label);

    switch (typeof value) {
        case "number":
            let inp = createInputRange(key, value, pushitem);
            container.appendChild(inp.firstElementChild);
            container.appendChild(inp.lastElementChild);
            return container;
        case "string":
            container.appendChild(createInputText(key, value, pushitem));
            return container;
        case "boolean":
            container.appendChild(createInputCheckbox(key, value, pushitem));
            return container;
        case "object":
            if (Array.isArray(value)) {  // If array
                input = document.createElement("select");
                value.forEach((option) => {
                    const opt = document.createElement("option");
                    opt.value = option;
                    opt.text = option;
                    input.add(opt);
                });
                return input;

            } else {  // If object
                container.appendChild(createInputsObject(key, value, keystree + "-" + key, pushitem));
                return container;
            }
        default:
            input = document.createElement("input");
            input.type = "text";
            input.value = value;
    }
    container.appendChild(input);
    return container;
}

function createLabelForInput(key, inputID) {
    const label = document.createElement('label');
    label.textContent = key;
    label.setAttribute('for', inputID);

    return label;
}

function createInputText(key, value, pushItem) {
    let input = document.createElement("input");

    input.type = "text";
    input.name = key;
    input.value = value;

    input.onchange = (e) => {pushItem(e)};

    return input;
}

function createInputCheckbox(key, value, pushItem) {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = key;
    input.checked = value;

    input.onchange = (e) => {pushItem(e)};

    return input;
}

function createInputRange(key, value, pushItem) {
    const container = document.createElement("div");

    let range = document.createElement("input");

    range.type = "range";
    range.name = key;
    range.min = 0.0;
    range.max = value * 10.0;
    range.step = (value * 10.0) / 1000.0;
    range.value = value;

    let input = document.createElement("input");

    input.type = "number";
    input.name = key;
    input.min = 0.0;
    input.max = value * 10.0;
    input.step = (value * 10.0) / 1000.0;
    input.value = value;

    range.onchange = (e) => {pushItem(e); input.value = range.value;};
    input.onchange = (e) => {pushItem(e); range.value = input.value;};

    container.appendChild(range);
    container.appendChild(input);

    return container;
}

function createInputSelect(key, value) {
    if (key in SELECTS) {
        const select = document.createElement("select");
        select.name = key;

        SELECTS[key].forEach((option) => {
            const opt = document.createElement("option");
            opt.value = option;
            opt.text = option;

            if (option === value) {
                opt.selected = true;
            }

            select.add(opt);
        });

        return select;
    } else {
        return createInputText(key, value);
    }
}

function createInputContainer(key) {
    let divGroup = document.createElement('ul');
    divGroup.className = "form-group";
    divGroup.setAttribute("obj", key);

    return divGroup;
}

export function createInputsObject(k, obj, keystree, pushitem) {
    let container = createInputContainer(k);

    for (const key in obj) {
        container.appendChild(createInput(key, obj[key], keystree, pushitem))
    }

    return container;
}