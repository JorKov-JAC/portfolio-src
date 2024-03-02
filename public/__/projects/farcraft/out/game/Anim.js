import { clamp, mod } from "../engine/util.js";
import { images } from "../global.js";
export default class Anim {
    groupName;
    animationName;
    frameTime;
    constructor(groupName, animationName, frameTime = 0) {
        this.groupName = groupName;
        this.animationName = animationName;
        this.frameTime = frameTime;
    }
    advance(dFrameTime) {
        this.frameTime += dFrameTime;
        this.frameTime = mod(this.frameTime, this.getDuration());
    }
    setNorm(fraction) {
        this.frameTime = clamp(fraction, 0, 1 - Number.EPSILON * .5) * this.getDuration();
    }
    getAnim() {
        return images.getAnim(this.groupName, this.animationName);
    }
    getDuration() {
        const anim = this.getAnim();
        if ("duration" in anim) {
            return anim.duration;
        }
        return 1;
    }
    getSprite() {
        const anim = this.getAnim();
        const idx = Math.min(Math.floor(this.frameTime / this.getDuration() * anim.frames.length), anim.frames.length - 1);
        return anim.frames[idx];
    }
    classId() {
        return 5;
    }
}
