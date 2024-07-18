import Size from "./Size.js"
import Vec2 from "./Vec2.js"
import { ce } from "../exts/Object.js"

// Constructor:

export default function Rect(pos = Vec2.zero, size = new Size(1)) {
    this.pos = pos
    this.size = size
}

// Abbreviations:

const c = Rect
const p = c.prototype

// Left:

p.defineProperty("left", {
    ...ce,
    get: function() { return c.getLeft(this) },
    set: function(val) { c.setLeft(this, val) }
})

c.getLeft = r => r.pos.x
c.setLeft = (r, val) => {
    const diff = r.pos.x - val
    r.size.width += diff
    r.pos.x = val
    return r
}

// Right:

p.defineProperty("right", {
    ...ce,
    get: function() { return c.getRight(this) },
    set: function(val) { c.setRight(this, val) }
})

c.getRight = r => r.pos.x + r.size.width
c.setRight = (r, val) => {
    r.size.width += val - c.getRight(r)
    return this
}

// Top:

p.defineProperty("top", {
    ...ce,
    get: function() { return c.getTop(this) },
    set: function(val) { c.setTop(this, val) }
})

c.getTop = r => r.pos.y
c.setTop = (r, val) => {
    const diff = r.pos.y - val
    r.size.height += diff
    r.pos.y = val
    return this
}

// Bottom:

p.defineProperty("bottom", {
    ...ce,
    get: function() { return c.getBottom(this) },
    set: function(val) { c.setBottom(this, val) }
})

c.getBottom = r => r.pos.y + r.size.height
c.setBottom = (r, val) => {
    r.size.height += val - c.getBottom(r)
    return r
}

// Clone:

p.clone = function() { return c.clone(this) }
c.clone = r => new c(Vec2.clone(r.pos), Size.clone(r.size))

// String:

p.toString = function() { return c.toString(this) }
c.toString = r => `(${r.pos.x}, ${r.pos.y}, ${r.size.width}, ${r.size.height})`
