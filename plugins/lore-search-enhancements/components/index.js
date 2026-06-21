export function LoreSearchEnhancements() {
  const Component = () => null

  Component.afterDOMLoaded = `
function enhanceLoreSearch() {
  const isMac = navigator.platform.toUpperCase().includes("MAC")
  const shortcut = isMac ? " (⌘ K)" : " (Ctrl K)"

  for (const label of document.querySelectorAll(".search-title, .search-button > p")) {
    if (label.dataset.shortcutLabel === "true") continue
    label.innerText += shortcut
    label.dataset.shortcutLabel = "true"
  }

  for (const input of document.querySelectorAll(".search-bar")) {
    input.placeholder = "Start typing to search..."
    input.setAttribute("aria-label", "Start typing to search...")
  }
}

document.addEventListener("nav", enhanceLoreSearch)
enhanceLoreSearch()
`

  return Component
}
