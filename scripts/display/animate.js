class Animate extends Sprite {
    constructor(spriteSheet, xSize, ySize, xSprite, ySprite, xFrames, yFrames, xPos, yPos) {
        super(spriteSheet, xSize, ySize, xSprite, ySprite, xFrames, yFrames);
        this.xPos = xPos;
        this.yPos = yPos;
        this.currentFrame = 0;
        this.maxFrame = this.xFrames * this.yFrames;
    }

    show() {
        // matrix mapping for animation
        let x = this.currentFrame % this.yFrames * this.xSprite;
        let y = Math.floor(this.currentFrame / this.xFrames) * this.ySprite;

        image(
            this.spriteSheet,
            this.xPos, this.yPos,
            this.xSize, this.ySize,
            x, y,
            this.xSprite, this.ySprite
        );
        this.animate();
    }

    animate() {
        this.currentFrame >= this.maxFrame - 1 ?
            this.currentFrame = 0 :
            this.currentFrame++;
    }
}