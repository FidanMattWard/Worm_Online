import Game from "./Game.js"
import Cam from "./entity/Cam.js"
import TileMap from "./tile/TileMap.js"
import Color from "./graph/Color.js"
import Material from "./graph/Material.js"
import TileType from "./tile/TileType.js"
import Vec2 from "./geom/Vec2.js"
import Tile from "./tile/Tile.js"
import KeyHoldObserver from "./event/KeyHoldObserver.js"

import "./exts/HTMLElement.js"
import "./exts/HTMLCanvasElement.js"
import "./exts/CanvasRenderingContext2D.js"

const canvas = document.getElementById("game-main-canvas")
canvas.updateMousePos = true
canvas.autoResize = true
canvas.focus()

if (canvas.getContext) {
    const game = new Game()
    game.mainCanvas = canvas
    game.cam = new Cam()

    const map = new TileMap(game)
    map.showGrid = true
    map.showSelection = true 

    const material = new Material({ color: Color.BLACK })
    const tileType = new TileType(material)
    
    canvas.addEventListener("contextmenu", e => {
        map.setTile(map.mouseTilePos, undefined)
        e.stopPropagation()
        e.preventDefault()
        e.stopImmediatePropagation()
    })

    canvas.addEventListener("click", () => map.setTile(map.mouseTilePos, new Tile(tileType)))

    canvas.addEventListener("keydown", e => {
        if (e.code == "F3") {
            ctx.showFPS = !ctx.showFPS
            map.showGrid = !map.showGrid
            map.showSelection = !map.showSelection
            e.preventDefault()
        }
    })

    canvas.addEventListener("wheel", e => {
        const scaleFactor = 0.01
        game.cam.scale.x -= e.deltaX * scaleFactor
        game.cam.scale.y -= e.deltaY * scaleFactor
        e.preventDefault()
    }, { passive: false })

    const ctx = canvas.getContext('2d')
    ctx.redrawMode = "auto"
    ctx.showFPS = true

    const keyObserver = new KeyHoldObserver(canvas)

    ctx.drawCalls.push(function(dt) {
        let move = Vec2.zero
       
        if (keyObserver.isKeyWithCodePressed("KeyW"))
            move.y -= 1

        if (keyObserver.isKeyWithCodePressed("KeyA"))
            move.x -= 1

        if (keyObserver.isKeyWithCodePressed("KeyS"))
            move.y += 1

        if (keyObserver.isKeyWithCodePressed("KeyD"))
            move.x += 1

        move.length = keyObserver.isKeyWithCodePressed("ShiftLeft") ? 10 : 5
        game.cam.pos.add(move)

        this.save()
        this.translate(game.cam.pos.neged.add(canvas.size.div(2)))
        this.scale(game.cam.scale)

        map.draw(this, dt)

        this.restore()
    })
}
