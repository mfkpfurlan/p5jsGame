class Projectile extends Animate {
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
        this.speed = 10;
        this.shooting = false;
    }

    shoot() {
        if (this.shooting === true) {
            this.show();
            this.xPos += this.speed;
            if (this.xPos > width) {
                this.shooting = false;
                this.xPos = 0;
            }
        }
    }

    collides(enemy) {
        if (this.shooting) {
            const precision = 1;
            noFill();
            rect(
                this.xPos,
                this.yPos,
                this.xSize * precision,
                this.ySize * precision);
            rect(
                enemy.xPos,
                enemy.yPos,
                enemy.xSize * precision,
                enemy.ySize * precision);
            const collision = collideRectRect(
                this.xPos,
                this.yPos,
                this.xSize * precision,
                this.ySize * precision,
                enemy.xPos,
                enemy.yPos,
                enemy.xSize * precision,
                enemy.ySize * precision
            )
            return collision;
        }
        return false;
    }
}