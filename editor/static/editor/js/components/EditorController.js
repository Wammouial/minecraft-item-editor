import Editor from "../editor.js";

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
        }
        document.getElementById("input-manager").replaceChild(form, document.getElementById("item-form"));
    }

    static setItem(item) {
        EditorController.instance.currentItem = item;
        EditorController.instance.createInputs();
    }

    pushItem(e) {
        this.currentItem[e.target.name] = e.target.value;

        // if id
        Editor.updateItem(this.currentItem.id, this.currentItem).then(() => console.log("Updated"));
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
