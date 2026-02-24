const rail = document.getElementById("rail");
const addButtons = document.querySelectorAll(".add-btn");

let draggedItem = null;
let placeholder = document.createElement("div");
placeholder.className = "placeholder";

addButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const label = btn.dataset.label;
    const item = createItem(label);
    rail.appendChild(item);
  });
});

function createItem(label) {
  const item = document.createElement("div");
  item.className = "rail-item";
  item.textContent = `Device: ${label}`;
  item.draggable = true;

  item.addEventListener("dragstart", (e) => {
    draggedItem = item;
    item.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
    draggedItem = null;
    placeholder.remove();
  });

  return item;
}

rail.addEventListener("dragover", (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(rail, e.clientX);
  if (!placeholder.parentNode) {
    rail.appendChild(placeholder);
  }
  if (afterElement == null) {
    rail.appendChild(placeholder);
  } else {
    rail.insertBefore(placeholder, afterElement);
  }
});

rail.addEventListener("drop", (e) => {
  e.preventDefault();
  if (!draggedItem) return;

  if (placeholder.parentNode) {
    rail.insertBefore(draggedItem, placeholder);
    placeholder.remove();
  } else {
    rail.appendChild(draggedItem);
  }
});

function getDragAfterElement(container, x) {
  const draggableElements = [
    ...container.querySelectorAll(".rail-item:not(.dragging)")
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = x - box.left - box.width / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY, element: null }
  ).element;
}