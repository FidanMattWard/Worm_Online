import { cw, ceg, cev } from "../exts/Object.js"
import Size from "../geom/Size.js"

// Constructor:

export default function Tile(type) {
    this.type = type
    this.defineProperties({
        _map: cw,
        _pos: cw
    })
}

// Abbreviations:

const c = Tile
const p = c.prototype

// TileMap-Links:

p.defineProperties({
    map: ceg(function() { return this._map }),
    pos: ceg(function() { return this._pos })
})

// Draw:

p.draw = function(ctx, dt) { 
    ctx.save()
    ctx.scale(Tile.SIZE)
    ctx.translate(this.pos)
    this.type.material.draw(ctx, dt)
    ctx.restore()
}

// Size:

c.defineProperty("size", ceg(() => new Size(50)))
c.defineProperty("SIZE", cev(c.size.freeze()))
