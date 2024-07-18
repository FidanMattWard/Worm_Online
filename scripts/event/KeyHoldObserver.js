import { cv, ceg } from "../exts/Object.js"

// Constructor:

export default function KeyHoldObserver(target) {
    this.defineProperty("_target", cv(target))
    this.pressed = {}

    target.addEventListener("keydown", e => {
        if (e.repeat)
            return

        this.pressed[e.code] = true
    })

    target.addEventListener("keyup", e => this.pressed[e.code] = false) 

    target.addEventListener("focusout", () => {
        for (const key in this.pressed)
            this.pressed[key] = false
    })
}

// Abbreviations:

const c = KeyHoldObserver
const p = c.prototype

// Target:

p.defineProperty("target", ceg(function() { return this._target }))

// Is Key Pressed:

p.isKeyWithCodePressed = function(code) { return this.pressed[code] ?? false }
