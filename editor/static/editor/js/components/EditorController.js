import Editor from "../editor.js";
import {createInputsObject} from "./InputCreator.js";

const InputTypes = {
  'string': 'text',
  'number': 'number',
  'boolean': 'checkbox',
  'array': 'text',
  'object': 'text'
};


class EditorController {
    constructor() {
        if (!EditorController.instance) {
            this.editor = Editor;

            this.currentItem = {};

            this.form = document.querySelector('#item-form');
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.deleteButton = document.querySelector('#delete-button');
            this.deleteButton.addEventListener('click', () => this.handleDelete());

            EditorController.instance = this;
        }
        return EditorController.instance;
    }

    createInputs() {
        const form = document.createElement('form');
        form.id = "item-form";

        const container = createInputsObject("", this.currentItem, "data", this.pushItem);

        /*
        for (const key in this.currentItem) {
            const value = this.currentItem[key];

            const divGroup = document.createElement('div');
            divGroup.className = "form-group";

            if (value && typeof value === "object" && Object.keys(value).length > 0) {
                for (const key2 in value) {
                    const inputID = `input-${key2}`;

                    const label = document.createElement('label');
                    label.textContent = key2;
                    label.setAttribute('for', inputID);

                    const input = document.createElement('input');
                    input.id = inputID;
                    input.name = key2;
                    input.type = InputTypes[typeof value[key2]];
                    input.value = value[key2];
                    input.onchange = (e) => {this.pushItem(e)};

                    divGroup.appendChild(label);
                    divGroup.appendChild(input);
                }
            } else {
                const inputID = `input-${key}`;

                const label = document.createElement('label');
                label.textContent = key;
                label.setAttribute('for', inputID);

                const input = document.createElement('input');
                input.id = inputID;
                input.name = key;
                input.type = InputTypes[typeof this.currentItem[key]];
                input.value = this.currentItem[key];
                input.onchange = (e) => {this.pushItem(e)};

                divGroup.appendChild(label);
                divGroup.appendChild(input);
            }

            form.appendChild(divGroup);
        }*/
        form.appendChild(container);

        document.getElementById("input-manager").replaceChild(form, document.getElementById("item-form"));
    }

    static setItem(item) {
        EditorController.instance.currentItem = item;
        EditorController.instance.createInputs();
    }

    pushItem(e) {
        //console.dir(e)
        let subObject = [];
        let target = e.target;

        let value = EditorController.instance.currentItem;

        let newObj = null;

        while (newObj === null || newObj !== "") {
            if (target.parentElement.parentElement.hasAttribute("obj")) {
                newObj = target.parentElement.parentElement.getAttribute("obj");
                if (newObj !== "") {
                    subObject.push(newObj);
                } else {
                    break;
                }
            } else {
                break;
            }
            target = target.parentElement.parentElement;
        }
        console.log(subObject)
         subObject.reverse().forEach((k) => {
            console.log(k)
            value = value[k];
        });

        console.log(e);

        if (e.target.type === "checkbox") {
            value[e.target.name] = e.target.checked;
        } else if (e.target.type === "range") {
            value[e.target.name] = parseFloat(e.target.value);
        } else {
            value[e.target.name] = e.target.value;
        }

        console.log(value[e.target.name], EditorController.instance.currentItem);


        // if id
        Editor.updateItem(EditorController.instance.currentItem.id, EditorController.instance.currentItem).then(() => console.log("Updated"));
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(this.form);
        // logique pour mettre à jour les données de l'API avec les informations du formulaire
    }

    handleDelete() {
        // logique pour supprimer l'élément sélectionné de l'API
    }

    updateForm(item) {
        // logique pour mettre à jour le formulaire avec les informations de l'élément sélectionné
    }

}

export default EditorController;
