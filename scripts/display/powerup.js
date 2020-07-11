class PowerUp extends Animate {
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
        this.speed = 30;
        this.xPos = width;
    }

    move() {
        this.xPos -= this.speed;
        if (this.xPos < 0) {
            this.spawn();
        }
    }

    spawn() {
        this.xPos = width;
    }
}