import { cwv, cg } from "./Object.js"
import Vec2 from "../geom/Vec2.js"

// Abbreviations:

const c = HTMLElement
const p = c.prototype

// Update Mouse Pos:

p.defineProperty("updateMousePos", {
    configurable: true,
    get: function() { return this._updateMousePos ?? false },
    set: function(val) {
        this.defineProperty("_updateMousePos", cwv(val))

        const func = e => {
            this._mousePos.x = e.x
            this._mousePos.y = e.y
        }

        if (val) {
            this.defineProperty("mousePos", cg(function() { return this._mousePos.clone() }))
            this.defineProperty("_mousePos", cwv(Vec2.zero))
            this.addEventListener("mousemove", func)
        } else {
            this.removeEventListener("mousemove", func)
            delete this._mousePos
            delete this.mousePos
        }
    }
})
