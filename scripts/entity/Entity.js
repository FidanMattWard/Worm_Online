import Vec2 from "../geom/Vec2.js"
import "../exts/Object.js"

// Constructor:

export default function Entity(desc = {}) {
    this.parent = desc.parent
    this.pos = desc.pos ?? Vec2.zero
    this.origin = desc.origin ?? Vec2.zero
}

// Abbreviations:

const c = Entity
const p = c.prototype

// Draw:

