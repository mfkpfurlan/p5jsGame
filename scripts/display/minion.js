class Minion extends Animate {
    constructor(
        spriteSheet,
        xSize, ySize,
        xSprite, ySprite,
        xFrames, yFrames,
        xPos, yPos,
        currentFrame, maxFrame
    ) {
        super(
            spriteSheet,
            xSize, ySize,
            xSprite, ySprite,
            xFrames, yFrames,
            xPos, yPos,
            currentFrame, maxFrame
        )
        this.speed = 15;
        this.xPos = width;
        this.dead = false;
        this.invencible = false;
    }

    isInvencible(time) {
        this.invencible = true;
        setTimeout(() => {
            this.invencible = false;
        }, time)
    }

    move() {
        this.xPos -= this.speed;
    }

    spawn() {
        setTimeout(() => {
            this.dead = false;
            this.xPos = width;
            this.invencible = false;
        }, 3000);
    }

    death() {
        this.dead = true;
        this.invencible = true;
        this.spawn();
    }
}