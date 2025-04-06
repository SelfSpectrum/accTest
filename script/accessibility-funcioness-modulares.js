
// Aumentar y Disminuir texto
export function setupFontResizer(increaseId = "increase-font", decreaseId = "decrease-font") {
    let fontSize = 1;
    const increaseBtn = document.getElementById(increaseId);
    const decreaseBtn = document.getElementById(decreaseId);
  
    if (increaseBtn) {
      increaseBtn.addEventListener("click", () => {
        fontSize += 0.1;
        document.body.style.fontSize = fontSize + "em";
      });
    }
  
    if (decreaseBtn) {
      decreaseBtn.addEventListener("click", () => {
        fontSize = Math.max(0.5, fontSize - 0.1);
        document.body.style.fontSize = fontSize + "em";
      });
    }
  }
  
  // Resaltar texto general
  export function setupTextHighlighter(buttonId = "highlighted-text") {
    const highlightBtn = document.getElementById(buttonId);
    let active = false;
  
    if (highlightBtn) {
      highlightBtn.addEventListener("click", () => {
        const elements = document.querySelectorAll("p, li, h1, h2, h3, h4, h5, h6");
        active = !active;
        elements.forEach(el => {
          el.style.backgroundColor = active ? "#ffff99" : "";
        });
      });
    }
  }
  
  // Resaltar párrafos
  export function setupParagraphHighlighter(buttonId = "paragraph-highlight-toggle") {
    const paragraphBtn = document.getElementById(buttonId);
    let enabled = false;
  
    if (paragraphBtn) {
      paragraphBtn.addEventListener("click", () => {
        const paragraphs = document.querySelectorAll("p");
        enabled = !enabled;
        paragraphs.forEach(p => {
          p.style.border = enabled ? "2px solid orange" : "";
          p.style.padding = enabled ? "4px" : "";
          p.style.borderRadius = enabled ? "6px" : "";
          p.style.backgroundColor = enabled ? "#fff5e6" : "";
        });
      });
    }
  }
  