import Color from "../graph/Color.js"
import Tile from "./Tile.js"
import Vec2 from "../geom/Vec2.js"
import { cwv, ce, ceg } from "../exts/Object.js"
import "../exts/CanvasRenderingContext2D.js"

// Constructor:

export default function TileMap(game, origin = Vec2.zero) {
    this.origin = origin
    this.defineProperties({
        _tiles: cwv({}),
        _game: cwv(game) 
    })
}

// Abbreviations:

const c = TileMap
const p = c.prototype

// Game:

p.defineProperty("game", {
    ...ce,
    get: function() { return this._game },
    set: function(val) {

    }
})

// Tile:

p.getTile = function(at) { return this._tiles[at.x]?.[at.y] }
p.setTile = function(at, tile) {
    let column = this._tiles[at.x] ?? (this._tiles[at.x] = {})
    let oldTile = column[at.y]
    
    if (oldTile) {
        oldTile._pos = undefined
        oldTile._map = undefined
    }

    if (!tile) {
        delete column[at.y]
        return
    } 

    column[at.y] = tile
    tile._pos = Object.freeze(at.clone())

    const oldMap = tile._map

    if (oldMap)
        oldMap.setTile(at, undefined)

    tile._map = this
}

// Mouse Pos:

p.defineProperty("mouseTileWorldPos", ceg(function() { return this.mouseTilePos?.mul(Tile.SIZE) }))
p.defineProperty("mouseTilePos", ceg(function() { return this.mousePos?.div(Tile.SIZE).floor() }))
p.defineProperty("mousePos", ceg(function() { return this.game?.mouseWorldPos?.sub(this.origin) }))

// Draw:

p.showGrid = false
p.showSelection = false

p.draw = function(ctx, dt) {
    this.drawTiles(ctx, dt)

    if (this.showGrid)
        this.drawGrid(ctx, dt)

    if (this.showSelection)
        this.drawSelection(ctx, dt)
}

p.drawTiles = function(ctx, dt) {
    ctx.save()
    ctx.translate(this.origin)

    for (const [x, column] of Object.entries(this._tiles))
        for (const [y, tile] of Object.entries(column))
            tile.draw(ctx, dt)

    ctx.restore()
}

p.drawGrid = function(ctx, dt) {
    const cam = this.game?.cam

    if (!cam)
        return

    ctx.save()
    ctx.beginPath()

    const upLeft = cam.pos.diff(ctx.canvas.size.div(2))

    const begin = upLeft.quot(cam.scale)
    const end = upLeft.sum(ctx.canvas.size).div(cam.scale)

    const step = Tile.SIZE
    
    let offset = this.origin.diff(upLeft).mod(step).add(upLeft)
    offset.sub(cam.pos.diff(begin).div(step).trunc().mul(step))

    for (let i = offset.x; i < end.x; i += step.x) {
        ctx.moveTo(i, begin.y)
        ctx.lineTo(i, end.y)
    }
    
    for (let i = offset.y; i < end.y; i += step.y) {
        ctx.moveTo(begin.x, i)
        ctx.lineTo(end.x, i)
    }

    ctx.strokeColor = Color.BLACK
    ctx.stroke()
    ctx.restore()
}

p.drawSelection = function(ctx, dt) {
    const pos = this.mouseTileWorldPos

    if (!pos)
        return

    ctx.save()
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
    ctx.fillRect(pos, Tile.SIZE)
    ctx.restore()
}
