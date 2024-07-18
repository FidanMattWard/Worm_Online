import Vec2 from "../geom/Vec2.js"
import { ce, cwv, cewv, lazy } from "./Object.js"

// Abbreviations:

const c = CanvasRenderingContext2D
const p = c.prototype

// FPS:

p.defineLazyProperty("showFPS", false)
p.defineProperty("drawFPS", cwv(function(dt) {
    this.save()
    this.textBaseline = "top"
    this.font = "32px sans-serif"
    this.fillStyle = "rgb(255, 0, 0)"
    this.fillText(Math.trunc(1000 / dt), 0, 0)
    this.restore()
}))

// General Drawing:

p.defineProperties({
    clear: cwv(function(dt) { this.clearRect(0, 0, this.canvas.width, this.canvas.height) }),
    
    draw: cwv(function(dt) {
        this.clear(dt)

        if (this.drawCalls)
            for (const drawCall of this.drawCalls) 
                drawCall.call(this, dt)

        if (this.showFPS)
            this.drawFPS(dt)
    }),

    callSaving: cwv(function(thisArg, funct, ...args) {
        this.save()
        func.apply(thisArg, args)
        this.restore()
    }),

    drawCalls: lazy("drawCalls", [])
})

// Redraw Mode:

p.defineProperties({
    redrawMode: {
        ...ce,
        get: function() { return this._redrawMode ?? "default" },
        set: function(val) {
            switch (val) {
                case "default":    
                    break

                case "auto":
                    const step = timeStamp => {
                        const dt = timeStamp - this._lastTimeStamp
                        this.defineProperty("_lastTimeStamp", cwv(timeStamp))

                        this.draw(dt)

                        if (this.redrawMode == "auto")
                            window.requestAnimationFrame(step)
                    }

                    window.requestAnimationFrame(step)
                    break

                default:
                    throw new Error(`illegal redraw mode(${val})`)
            }

            this.defineProperty("_redrawMode", cwv(val))
        }
    },

    _lastTimeStamp: cwv(0)
})

// Vec2 Expand:

Vec2.addExpandForMethods(p, [// Rects:
                             "clearRect", "fillRect", "strokeRect",

                              // Text:
                              "fillText", "strokeText",

                              // Gradients:
                              "createConicGradient", "createLinearGradient", "createRadialGradient",

                              // Paths:
                              "moveTo", "lineTo", "bezierCurveTo", "quadraticCurveTo", "arc", "arcTo", "ellipse", "rect",
                             
                              // Transforms:
                              "scale", "translate", "transform", "setTransform",

                              // Images:
                              "drawImage",
                    
                              // Pixel Manipulations:
                              "createImageData", "putImageData"])
