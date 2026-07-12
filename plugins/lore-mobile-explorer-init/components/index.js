export function LoreMobileExplorerInit() {
  const Component = () => null

  Component.afterDOMLoaded = `
const explorerScrollKey = "explorerScrollTop"
const explorerObservers = new WeakMap()

function keepActiveExplorerItemInView(explorer) {
  const list = explorer.querySelector(".explorer-ul")
  if (!list) return

  explorerObservers.get(list)?.disconnect()

  const observer = new MutationObserver(() => {
    const active = list.querySelector(".active")
    if (!active) return

    const listRect = list.getBoundingClientRect()
    const activeRect = active.getBoundingClientRect()

    if (activeRect.top < listRect.top) {
      list.scrollTop -= listRect.top - activeRect.top
    } else if (activeRect.bottom > listRect.bottom) {
      list.scrollTop += activeRect.bottom - listRect.bottom
    }

    observer.disconnect()
    explorerObservers.delete(list)
  })

  observer.observe(list, { childList: true, subtree: true })
  explorerObservers.set(list, observer)

  if (typeof window.addCleanup === "function") {
    window.addCleanup(() => observer.disconnect())
  }
}

function prepareExplorerBeforeInitialization() {
  if (sessionStorage.getItem(explorerScrollKey) === null) {
    sessionStorage.setItem(explorerScrollKey, "0")
  }

  for (const explorer of document.querySelectorAll(".explorer")) {
    keepActiveExplorerItemInView(explorer)

    if (window.matchMedia("(max-width: 800px)").matches) {
      explorer.classList.add("collapsed")
      explorer.setAttribute("aria-expanded", "false")
    }
  }

  document.documentElement.classList.remove("mobile-no-scroll")
}

document.addEventListener("nav", prepareExplorerBeforeInitialization, true)
document.addEventListener("render", prepareExplorerBeforeInitialization, true)
`

  return Component
}
