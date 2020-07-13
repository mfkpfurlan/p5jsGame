class Character extends Animate {
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
        this.invencible = false;
        this.evolving = false;
        this.evolution0 = true;
        this.evolution1 = false;
        this.evolution2 = false;
        this.gravity = 7;
        this.jumps = 0;
        this.jumpSpeed = 0;
        this.jumpHeight = -50;
        this.yFloor = height - this.xSize - 20;
    }

    jump() {
        if (this.jumps < 2) {
            this.jumpSpeed = this.jumpHeight;
            this.jumps++;
        }
    }

    applyGravity() {
        this.yPos += this.jumpSpeed;
        this.jumpSpeed += this.gravity;

        if (this.yPos > this.yFloor) {
            this.yPos = this.yFloor;
            this.jumps = 0;
        }
    }

    evolve0() {
        this.spriteSheet = mageImg;
        this.xSize = 85;
        this.ySize = 94;
        this.xSprite = 85;
        this.ySprite = 94;
        this.xFrames = 4;
        this.yFrames = 2;
        this.yPos = height - this.ySize;
        this.evolution0 = true;
        this.evolution1 = false;
        this.evolving = true;
        setTimeout(() => {
            this.evolving = false;
        }, 2000);
    }

    evolve1() {
        this.spriteSheet = mageImg2;
        this.xSize = 122;
        this.ySize = 110;
        this.xSprite = 122;
        this.ySprite = 110;
        this.xFrames = 4;
        this.yFrames = 2;
        this.yPos = height - this.ySize;
        this.evolution0 = false;
        this.evolution1 = true;
        this.isInvencible(800);
        this.evolving = true;
        setTimeout(() => {
            this.evolving = false;
        }, 2000);
    }

    evolve2() {
        this.spriteSheet = mageImg3;
        this.xSize = 87;
        this.ySize = 110;
        this.xSprite = 87;
        this.ySprite = 110;
        this.xFrames = 4;
        this.yFrames = 2;
        this.yPos = height - this.ySize;
        this.evolution2 = true;
        this.evolution1 = false;
    }

    isInvencible(time) {
        this.invencible = true;
        setTimeout(() => {
            this.invencible = false;
        }, time)
    }

    getsPower(powerup) {
        if (this.evolving) {
            return false;
        }
        const precision = 1;
        noFill();
        rect(
            this.xPos,
            this.yPos,
            this.xSize * precision,
            this.ySize * precision);
        rect(
            powerup.xPos,
            powerup.yPos,
            powerup.xSize * precision,
            powerup.ySize * precision);
        const collision = collideRectRect(
            this.xPos,
            this.yPos,
            this.xSize * precision,
            this.ySize * precision,
            powerup.xPos,
            powerup.yPos,
            powerup.xSize * precision,
            powerup.ySize * precision
        )
        return collision;
    }

    collides(enemy) {
        if (this.invencible) {
            return false;
        }
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
}