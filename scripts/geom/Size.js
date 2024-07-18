import Vec2 from "./Vec2.js"
import { ce, ceg, cev } from "../exts/Object.js"

// Constructor:

Size.definePrototype(Vec2.prototype)

export default function Size(width, height) {
    Vec2.call(this, width, height)
}

// Abbreviations:

const c = Size
const p = c.prototype

// Width:

p.defineProperty("width", {
    ...ce,
    get: function() { return this.x },
    set: function(val) { this.x = val }
})

// Height:

p.defineProperty("height", {
    ...ce,
    get: function() { return this.y },
    set: function(val) { this.y = val }
})

// Clone:

p.clone = function() { return c.clone(this) }
c.clone = s => new c(s.width, s.height)

// Zero:

c.defineProperty("zero", ceg(() => new Size()))
c.defineProperty("ZERO", cev(c.zero.freeze()))

// One:

c.defineProperty("one", ceg(() => new c(1)))
c.defineProperty("ONE", cev(c.one.freeze()))
