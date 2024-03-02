import { captureInput, keys, mousePos, setCursor } from "../global.js";
import { canvas } from "../context.js";
import { v2 } from "../engine/vector.js";
export default class Camera {
    game;
    worldPos;
    minLen;
    extraYMult = 0;
    static speed = 1.5;
    constructor(game, pos, minLen) {
        this.game = game;
        this.worldPos = pos.slice();
        this.minLen = minLen;
    }
    update(dt) {
        const moveVec = v2(0, 0).mut();
        if (keys["ArrowRight"])
            moveVec[0] += 1;
        if (keys["ArrowLeft"])
            moveVec[0] -= 1;
        if (keys["ArrowUp"])
            moveVec[1] -= 1;
        if (keys["ArrowDown"])
            moveVec[1] += 1;
        if (captureInput) {
            const mouseMoveVec = v2(0, 0).mut();
            if (mousePos[0] <= 3)
                mouseMoveVec[0] -= 1;
            if (mousePos[0] >= canvas.width - 3)
                mouseMoveVec[0] += 1;
            if (mousePos[1] <= 3)
                mouseMoveVec[1] -= 1;
            if (mousePos[1] >= canvas.height - 3)
                mouseMoveVec[1] += 1;
            moveVec.add(mouseMoveVec);
            this.updateCursor(mouseMoveVec);
        }
        this.moveToward(moveVec, dt);
        const actualSize = this.game.hud.worldPanel.getActualSize();
        const vMin = Math.min(actualSize[0], actualSize[1]);
        const scale = this.minLen / vMin;
        const tilemap = this.game.world.tilemap;
        this.worldPos[0] = Math.min(Math.max(0, this.worldPos[0]), tilemap.width - actualSize[0] * scale);
        this.worldPos[1] = Math.min(Math.max(0, this.worldPos[1]), tilemap.height - actualSize[1] * scale * (1 - this.extraYMult));
    }
    updateCursor(moveVec) {
        const orderedCursors = [
            null,
            "left",
            "right",
            "up",
            "upLeft",
            "upRight",
            "down",
            "downLeft",
            "downRight"
        ];
        const idx = 3 * (moveVec[1] > 0 ? 2 : moveVec[1] < 0 ? 1 : 0)
            + (moveVec[0] > 0 ? 2 : moveVec[0] < 0 ? 1 : 0);
        const cursor = orderedCursors[idx];
        if (cursor)
            setCursor(cursor);
    }
    canvasPosToWorld(pos) {
        const panel = this.game.hud.worldPanel;
        const panelPos = panel.getActualPos();
        const panelSize = panel.getActualSize();
        const vMin = panelSize.min();
        const tileLen = vMin / this.minLen;
        return pos.slice().sub(panelPos).mul(1 / tileLen).add(this.worldPos);
    }
    canvasSizeToWorldFactor() {
        return 1 / this.worldSizeToCanvasFactor();
    }
    worldPosToCanvas(pos) {
        const panel = this.game.hud.worldPanel;
        const panelPos = panel.getActualPos();
        const panelSize = panel.getActualSize();
        const vMin = panelSize.min();
        const tileLen = vMin / this.minLen;
        return pos.slice().sub(this.worldPos).mul(tileLen).add(panelPos);
    }
    worldSizeToCanvasFactor() {
        const panel = this.game.hud.worldPanel;
        const panelSize = panel.getActualSize();
        const vMin = panelSize.min();
        const tileLen = vMin / this.minLen;
        return tileLen;
    }
    moveToward(v, dt) {
        this.worldPos.mut().add(v.slice().mul(Camera.speed * this.minLen * dt));
    }
    classId() {
        return 2;
    }
}
