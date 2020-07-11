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
        this.evolution0 = true;
        this.evolution1 = false;
        this.evolution2 = false;
        this.gravity = 7;
        this.jumps = 0;
        this.jumpSpeed = 0;
        this.jumpHeight = -50;
        this.yFloor = height - this.ySize - 10;
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
        this.spriteSheet = loadImage('assets/characters/mage-1-85x94.png');
        this.xSize = 85;
        this.ySize = 94;
        this.xSprite = 85;
        this.ySprite = 94;
        this.xFrames = 3;
        this.yFrames = 2;
        this.yPos = height - this.ySize;
        this.evolution0 = true;
        this.evolution1 = false;
    }

    evolve1() {
        this.spriteSheet = loadImage('assets/characters/mage-2-122x110.png');
        this.xSize = 122;
        this.ySize = 110;
        this.xSprite = 122;
        this.ySprite = 110;
        this.xFrames = 4;
        this.yFrames = 2;
        this.yPos = height - this.ySize;
        this.evolution0 = false;
        this.evolution1 = true;
    }

    evolve2() {
        this.spriteSheet = loadImage('assets/characters/mage-3-87x110.png');
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

    isInvencible() {
        this.invencible = true;
        setTimeout(() => {
            this.invencible = false;
        }, 800)
    }

    getsPower(powerup) {
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