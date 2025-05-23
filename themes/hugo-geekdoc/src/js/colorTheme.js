import Storage from "store2"
import { TOGGLE_COLOR_THEMES, THEME, COLOR_THEME_AUTO } from "./config.js"
;(() => {
  applyTheme()
})()

document.addEventListener("DOMContentLoaded", () => {
  const colorThemeToggle = document.getElementById("gdoc-color-theme")

  function toggleColorTheme() {
    let lstore = Storage.namespace(THEME)
    let currentColorTheme = lstore.get("color-theme") || COLOR_THEME_AUTO
    let nextColorTheme = toggle(TOGGLE_COLOR_THEMES, currentColorTheme)

    lstore.set("color-theme", TOGGLE_COLOR_THEMES[nextColorTheme])
    applyTheme(false)
  }

  colorThemeToggle.onclick = function () {
    toggleColorTheme()
  }

  colorThemeToggle.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      toggleColorTheme()
      event.preventDefault()
    }
  })
})

function applyTheme(init = true) {
  if (Storage.isFake()) return

  let lstore = Storage.namespace(THEME)
  let html = document.documentElement
  let currentColorTheme = TOGGLE_COLOR_THEMES.includes(lstore.get("color-theme"))
    ? lstore.get("color-theme")
    : COLOR_THEME_AUTO

  html.setAttribute("class", "color-toggle-" + currentColorTheme)

  if (currentColorTheme === COLOR_THEME_AUTO) {
    html.removeAttribute("color-theme")
  } else {
    html.setAttribute("color-theme", currentColorTheme)
  }

  if (!init) {
    // Reload required to re-initialise e.g. Mermaid with the new theme
    // and re-parse the Mermaid code blocks.
    location.reload()
  }
}

function toggle(list = [], value) {
  let current = list.indexOf(value)
  let max = list.length - 1
  let next = 0

  if (current < max) {
    next = current + 1
  }

  return next
}
