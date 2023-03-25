import ItemController from './ItemController.js';

class Editor {

    constructor() {
        if (!Editor.instance) {
            this.items = [];
            this.itemController = new ItemController();

            Editor.instance = this;
        }

        return Editor.instance;
    }

    async getAllItems() {
        this.items = await this.itemController.getAllItems();
        return this.items;
    }

    async getItemById(id) {
        const item = this.items.find(item => item.id === id);
        if (!item) {
            return await this.itemController.getItemById(id);
        }
        return item;
    }

    async createItem(item) {
        const newItem = await this.itemController.createItem(item);
        this.items.push(newItem);
        return newItem;
    }

    async updateItem(id, item) {
        const updatedItem = await this.itemController.updateItem(id, item);
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items[index] = updatedItem;
        }
        return updatedItem;
    }

    async deleteItem(id) {
        await this.itemController.deleteItem(id);
        this.items = this.items.filter(item => item.id !== id);
    }
}

const EditorInstance = new Editor();
//Object.freeze(EditorInstance);

export default EditorInstance;