import Editor from "../editor.js";
import EditorController from "./EditorController.js";

class ExplorerController {
    constructor() {
        if (!ExplorerController.instance) {
            this.editor = Editor;
            this.editorComponent = EditorController;

            this.items = [];

            this.searchBox = document.querySelector('#search-box');
            this.sortBy = document.querySelector('#sort-by');
            this.searchBox.addEventListener('input', (e) => this.handleSearch(e));
            this.sortBy.addEventListener('change', (e) => this.handleSort(e));

            this.getItemList().then(() => {console.log("Data loaded")});

            ExplorerController.instance = this;
        }
        return ExplorerController.instance;
    }

    async clickItem(itemID) {
        this.editorComponent.setItem(await this.editor.getItemById(itemID));
    }

    insertItems(containerId) {
        const container = document.getElementById(containerId);
        container.className = 'flex-wrap justify-content-center';
        container.id = 'item-container';

        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            const listItem = document.createElement('div');
            listItem.className = 'card m-3';

            const bodyItem = document.createElement("div");
            bodyItem.className = "card-body";

            const h5Item = document.createElement("h5");
            h5Item.innerHTML = item.name;

            bodyItem.appendChild(h5Item);
            listItem.appendChild(bodyItem);

            listItem.onclick = (e) => {this.clickItem(item.id)};

            container.appendChild(listItem);
        }

    }

    async getItemList() {
        this.items = await this.editor.getAllItems();
        this.insertItems("item-container");
    }

    handleSearch(e) {
        // logique pour filtrer la liste en fonction de la recherche de l'utilisateur
        console.log(e);
    }

    handleSort(e) {
        // logique pour trier la liste en fonction du choix de l'utilisateur
        console.log(e);
    }

    updateItemList(items) {
        // logique pour mettre à jour la liste d'éléments affichée
    }
}

export default ExplorerController;
