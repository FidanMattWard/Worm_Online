import Entity from "./Entity.js"
import Vec2 from "../geom/Vec2.js"
import "../exts/Object.js"

// Constructor:

Cam.definePrototype(Entity.prototype)

export default function Cam(desc = {}) {
    Entity.call(this, desc)
    this.scale = desc.scale ?? Vec2.one 
}

// Abbreviations:

const c = Cam
const p = c.prototype


