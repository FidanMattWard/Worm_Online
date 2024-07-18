import Color from "./Color.js"
import Size from "../geom/Size.js"
import Vec2 from "../geom/Vec2.js"

// Constructor:

export default function Material(desc = {}) {
    this.color = desc.color ?? Color.black
    this.origin = desc.origin ?? Vec2.zero
    this.size = desc.size ?? Size.one 
}

// Abbreviations:

const c = Material
const p = c.prototype

// Clone:

p.clone = function() { return c.clone(this) }
c.clone = m => new c(Color.clone(m.color), Vec2.clone(m.origin), Size.clone(m.size))

// Draw:

p.draw = function(ctx, dt) {
    ctx.save()
    ctx.fillColor = this.color
    ctx.translate(this.origin)
    ctx.fillRect(Vec2.ZERO, this.size)
    ctx.restore()
}
