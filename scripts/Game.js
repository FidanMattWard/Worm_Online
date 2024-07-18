import { ceg, cwv } from "./exts/Object.js"

// Constructor:

export default function Game() {
    this.entities = [] 
}

// Abbreviations:

const c = Game
const p = c.prototype

// Mouse Pos:

p.defineProperty("mouseWorldPos", ceg(function() {
    const canvasPos = this.mousePos

    if (!canvasPos || !this.cam)
        return

    return canvasPos.sub(this.mainCanvas.size.div(2)).add(this.cam.pos).div(this.cam.scale)
}))

p.defineProperty("mousePos", ceg(function() { return this.mainCanvas?.mousePos }))

// Update:

p.update = function(dt) {

}

// Draw:

p.draw = function(ctx, dt) {

}
