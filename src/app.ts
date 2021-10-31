// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjustedDescriptor;
}

// Project Input Class
class ProjectInput {
  // Template element to render in the DOM.
  templateElement: HTMLTemplateElement;
  // Host element where the form from template is rendered.
  hostElement: HTMLDivElement;
  // The form element, taken from the template.
  element: HTMLFormElement;

  // Inputs
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    // Selecting DOM elements.
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    // Grabbing the content of the template.
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // Assigning the imported node (form).
    this.element = importedNode.firstElementChild as HTMLFormElement;
    // Giving the form an id
    this.element.id = "user-input";
    // Insert form element in app div.

    // Get acces to inputs.
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    //   validation
    if (
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredPeople.trim().length === 0
    ) {
      alert("Invalid input, please try again!");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
      this.titleInputElement.value = '';
      this.descriptionInputElement.value = '';
      this.peopleInputElement.value = '';
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    // this points to the event target and not the class if we don't use bind or a decorator
    // console.log(this.titleInputElement.value);

    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        console.log(title, desc, people);
        this.clearInputs();
    }
  }

  private configure() {
    // we bind the meaning of this inside configure, which points to the class
    // this.element.addEventListener('submit', this.submitHandler.bind(this));
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
