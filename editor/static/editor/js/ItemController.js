class ItemController {
    static API_BASE_URL = 'http://localhost:8000/editor';
    static ITEMS_BASE_URL = ItemController.API_BASE_URL + "/items/";

    async getAllItems() {
        const response = await fetch(ItemController.ITEMS_BASE_URL);
        return await response.json();
    }

    async getLocks() {
        const response = await fetch(`${ItemController.ITEMS_BASE_URL}locks/`)
        return await response.json()
    }

    async getItemById(id) {
        const response = await fetch(`${ItemController.ITEMS_BASE_URL}${id}/`);
        return await response.json();
    }

    async createItem(item) {
        const response = await fetch(ItemController.ITEMS_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        return await response.json();
    }

    async updateItem(id, item) {
        const response = await fetch(`${ItemController.ITEMS_BASE_URL}${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        return await response.json();
    }

    async deleteItem(id) {
        const response = await fetch(`${ItemController.ITEMS_BASE_URL}${id}/`, {
            method: 'DELETE'
        });
        return await response.json();
    }
}

export default ItemController;
