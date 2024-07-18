import Color from "../graph/Color.js"
import Size from "../geom/Size.js"
import { cwv, cg, cs } from "./Object.js"

// Abbreviations:

const c = HTMLCanvasElement
const p = c.prototype

// Fill Color:

p.defineProperty("fillColor", cs(function(val) { this.fillStyle = val.toCSSString() }))

// Stroke Color:

p.defineProperty("strokeColor", cs(function(val) { this.strokeStyle = val.toCSSString() }))

// Size:

p.defineProperty("size", cg(function() { return new Size(this.width, this.height) }))

// Auto-Resize:

p.resolutionFactor = 1

const observer = new ResizeObserver(entries => {
    for (const entry of entries) {
        const rect = entry.contentRect
        const target = entry.target

        target.width = rect.width * target.resolutionFactor
        target.height = rect.height * target.resolutionFactor
    }
})

p.defineProperties({
    autoResize: {
        configurable: true, 
        get: function() { return this._autoResize },
        set: function(val) {
            if (val)
                observer.observe(this)
            else
                observer.unobserve(this)

            this.defineProperty("_autoResize", cwv(val))
        }
    }
})
