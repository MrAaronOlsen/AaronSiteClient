export function anchorRefTo(elementRef, anchorRef) {
  const element = elementRef.current;
  const anchor = anchorRef.current;

  if (!element || !anchor) {
    return;
  }

  hide(element);

  const anchorPos = pos(anchor)
  element.style.left = px(anchorPos.right)
  element.style.top = px(anchorPos.bottom)

  const windowHeight = window.innerHeight;
  const elementHeight = element.offsetHeight;

  if (elementHeight + 20 > windowHeight) {
    element.style.height = px(windowHeight - 20);
    element.style.top = "10px";

    show(element)
    return
  }

  if (pos(element).bottom > windowHeight) {
    element.style.removeProperty("top");
    element.style.bottom = "10px";
  }

  show(element)
}

function hide(element) {
  element.style.opacity = 0;
}

function show(element) {
  element.style.opacity = 1;
}

function pos(element) {
  return element.getBoundingClientRect()
}

function px(dims) {
  return dims + "px";
}