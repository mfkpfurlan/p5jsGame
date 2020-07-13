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
        this.speed = 5;
        this.xPos = width;
        this.dead = false;
    }

    move() {
        this.xPos -= this.speed;
    }

    spawn() {
        setTimeout(() => {
            this.dead = false;
            this.xPos = width;
        }, 3000);
    }

    death() {
        this.dead = true;
        this.spawn();
    }
}