const submit = document.querySelector("input[type='submit']");
const buttonNext = document.querySelector("button[data-next]");
const buttonPrev = document.querySelector("button[data-prev]");
const buttonParent = document.querySelector("button[data-up]");
const buttonChild = document.querySelector("button[data-down]");
const buttonNextSibl = document.querySelector("button[data-right]");
const buttonPrevSibl = document.querySelector("button[data-left]");

const state = { currentNode: undefined, elements: [] };

function removeAttrDis(el) {
  el.removeAttribute("disabled");
}

function setAttrDis(el) {
  el.setAttribute("disabled", "");
}

function checkRelatives() {
  if (state.elements.length > 0) {
    if (state.currentNode.parentElement !== null) {
      removeAttrDis(buttonParent);
    } else {
      setAttrDis(buttonParent);
    }

    if (state.currentNode.firstElementChild !== null) {
      removeAttrDis(buttonChild);
    } else {
      setAttrDis(buttonChild);
    }

    if (state.currentNode.nextElementSibling !== null) {
      removeAttrDis(buttonNextSibl);
    } else {
      setAttrDis(buttonNextSibl);
    }

    if (state.currentNode.previousElementSibling !== null) {
      removeAttrDis(buttonPrevSibl);
    } else {
      setAttrDis(buttonPrevSibl);
    }
  }
}

function changeView(element) {
  element.classList.add("highlight");
  if (state.elements.length > 1) {
    removeAttrDis(buttonNext);
  }

  if (state.elements.indexOf(state.currentNode) > 0) {
    removeAttrDis(buttonPrev);
  }
}

function removeClass(element) {
  element.classList.remove("highlight");
}

submit.addEventListener("click", event => {
  event.preventDefault();

  if (state.currentNode) {
    removeClass(state.currentNode);
  }

  setAttrDis(buttonNext);
  setAttrDis(buttonPrev);
  setAttrDis(buttonParent);
  setAttrDis(buttonChild);
  setAttrDis(buttonNextSibl);
  setAttrDis(buttonPrevSibl);
  state.currentNode = undefined;
  state.elements = [];
  // checkRelatives();

  const selector = document.querySelector("input[name='selector']");

  const tag = selector.value;
  const el = document.querySelectorAll(tag);

  if (el.length > 0) {
    const elements = Array.from(el);

    const [cur] = elements;

    state.currentNode = cur;

    state.elements = elements;

    checkRelatives();

    changeView(state.currentNode);
  }
});

function handler(button, topLimitValue, Node, bottomLimitValue, index) {
  if (!button.hasAttribute("disabled")) {
    if (Node !== topLimitValue) {
      removeClass(state.currentNode);
      state.currentNode = state.elements[Node + index];
      changeView(state.currentNode);
    }
    checkRelatives();

    if (Node === bottomLimitValue) {
      setAttrDis(button);
    }
  }
}

buttonNext.addEventListener("click", () => {
  handler(
    buttonNext,
    state.elements.length - 1,
    state.elements.indexOf(state.currentNode),
    state.elements.length - 2,
    1
  );
});

buttonPrev.addEventListener("click", () => {
  handler(buttonPrev, 0, state.elements.indexOf(state.currentNode), 1, -1);
});

function goTorelative(element, relatieve) {
  removeClass(element);
  changeView(element[relatieve]);
  setAttrDis(buttonNext);
  setAttrDis(buttonPrev);
  state.currentNode = element[relatieve];
  checkRelatives();
}

buttonParent.addEventListener("click", () => {
  goTorelative(state.currentNode, "parentElement");
});

buttonChild.addEventListener("click", () => {
  goTorelative(state.currentNode, "firstElementChild");
});

buttonNextSibl.addEventListener("click", () => {
  goTorelative(state.currentNode, "nextElementSibling");
});

buttonPrevSibl.addEventListener("click", () => {
  goTorelative(state.currentNode, "previousElementSibling");
});
