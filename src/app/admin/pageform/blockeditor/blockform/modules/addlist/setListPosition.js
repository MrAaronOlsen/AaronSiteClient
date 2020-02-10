export default function setPosition(ref) {
  const element = ref.current;

  if (!element) {
    return;
  }

  const topPos = element.getBoundingClientRect().top;
  const botPos = element.getBoundingClientRect().bottom;
  const height = window.innerHeight;

  if (topPos + 300 > height || botPos + 300 > height) {
    ref.current.style.removeProperty("top")
    ref.current.style.bottom = "20px"
  } else {
    ref.current.style.removeProperty("bottom")
    ref.current.style.top = "20px"
  }
}