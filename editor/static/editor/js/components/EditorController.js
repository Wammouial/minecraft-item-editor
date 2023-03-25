class EditorController {
  constructor() {
    this.form = document.querySelector('#item-form');
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.deleteButton = document.querySelector('#delete-button');
    this.deleteButton.addEventListener('click', () => this.handleDelete());
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

