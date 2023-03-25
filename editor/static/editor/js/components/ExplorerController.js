class ExplorerController {
    constructor(editor) {
        this.editor = editor;
        this.items = [];

        this.itemList = document.querySelector('#item-list');
        this.searchBox = document.querySelector('#search-box');
        this.sortBy = document.querySelector('#sort-by');
        this.searchBox.addEventListener('input', (e) => this.handleSearch(e));
        this.sortBy.addEventListener('change', (e) => this.handleSort(e));

        this.getItemList().then(() => {console.log("Data loaded")});
    }

    insertItems(containerId) {
        const container = document.getElementById(containerId);
        const list = document.createElement('ul');
        list.className = 'list-group';
        list.id = 'item-list';

        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = item.name;
            list.appendChild(listItem);
        }

        container.appendChild(list);
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

