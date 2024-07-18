import Material from "../graph/Material.js"
import { cwv } from "../exts/Object.js"

// Constructor:

export default function TileType(material) {
    this.material = material
}

// Abbreviations:

const c = TileType
const p = c.prototype

// Clone:

p.clone = function() { return c.clone(this) }
c.clone = t => new c(Material.clone(t.material))
