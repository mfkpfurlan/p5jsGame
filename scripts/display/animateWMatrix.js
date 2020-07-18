class AnimateWMatrix extends SpriteWMatrix {
    constructor(spriteSheet, xSize, ySize, xSprite, ySprite, matrix, xPos, yPos) {
        super(spriteSheet, xSize, ySize, xSprite, ySprite, matrix);
        this.xPos = xPos;
        this.yPos = yPos;
        this.currentFrame = 0;
        this.maxFrame = this.matrix.length;
    }

    show() {
        let x = this.matrix[this.currentFrame][0];
        let y = this.matrix[this.currentFrame][1];

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