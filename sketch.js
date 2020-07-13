let mage;
let scenarioFar;
let scenarioBack;
let scenarioFront;

let mageBullet;
let mageFlame;

let blueMinion;

let powerup;

let hit;

let evolve;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15);

  scenarioFar = new Scenario(scenarioFarImg, 1);
  scenarioBack = new Scenario(scenarioBackImg, 3);
  scenarioFront = new Scenario(scenarioFrontImg, 6);

  mage = new Character(
    mageImg,
    85, 94,
    85, 94,
    3, 2,
    0, height - 100
  );

  mageBullet = new Projectile(
    mageBulletImg,
    26, 26,
    13, 13,
    5, 1,
    50, height - 80
  );

  mageFlame = new Projectile(
    mageFlameImg,
    64, 64,
    32, 32,
    4, 1,
    50, height - 80
  );

  blueMinion = new Minion(
    blueMinionImg,
    90, 132,
    45, 66,
    3, 2,
    50, height - 132
  )

  powerup = new PowerUp(
    powerUp1Img,
    64, 62,
    128, 126,
    4, 4,
    50, height - 40
  )

  hit = new Effect(
    minionHitImg,
    128, 128,
    128, 128,
    8, 8,
    50, height - 80
  )

  evolve = new Effect(
    evolutionImg,
    140, 134,
    14, 67,
    8, 3,
    50, height - 80
  )
}

function keyPressed() {
  //JUMP
  if (key === 'ArrowUp') {
    mage.jump();
  }

  //ATTACK
  if (key === 'ArrowDown') {
    if (mage.evolution1) {
      if (!mageFlame.shooting) {
        mageFlame.yPos = mage.yPos;
        mageFlame.shooting = true;
        return 0;
      }
    }
    if (!mageBullet.shooting) {
      mageBullet.yPos = mage.yPos;
      mageBullet.shooting = true;
      return 0;
    }
  }
}

function draw() {

  scenarioFar.show();
  scenarioFar.move();
  scenarioBack.show();
  scenarioBack.move();
  scenarioFront.show();
  scenarioFront.move();

  //CHARACTER
  mage.show();
  mage.applyGravity();

  //MINION SPAW
  if (!blueMinion.dead) {
    blueMinion.show();
    blueMinion.move();
  } else {
    blueMinion.spawn();
  }

  if (mage.evolution1 === false) {
    powerup.show();
    powerup.move();
  } else {
    powerup.spawn();
  }


  //PROJECTILES
  if (mageBullet.shooting) {
    mageBullet.shoot();
  }

  if (mageFlame.shooting) {
    mageFlame.shoot();
  }

  //MAGE POWERUP COLLISION
  if (mage.getsPower(powerup)) {
    mage.evolve1();
  }

  //MAGE MINION COLLISION
  if (mage.collides(blueMinion)) {
    if (mage.evolution1) {
      mage.evolve0();
      blueMinion.death();
      mage.isInvencible(800);
      return 0;
    }
    //mage dies
    blueMinion.death();
    mage.isInvencible(800);
  }

  //PROJECTILE MINION COLLISION
  if (mageFlame.collides(blueMinion)) {
    blueMinion.death();
    mageFlame.lifeCycle++;
    if (mageFlame.lifeCycle >= 2) {
      mageFlame.shooting = false;
      mageFlame.xPos = 0;
      mageFlame.lifeCycle = 0;
    }
  }

  if (mageBullet.collides(blueMinion)) {
    blueMinion.death();
    mageBullet.shooting = false;
    mageBullet.xPos = 0;
  }

  //COLLISION EFFECTS
  if (blueMinion.dead) {
    hit.show(blueMinion.xPos - 20, blueMinion.yPos);
  }

  if (mage.evolving) {
    evolve.show(mage.xPos, mage.yPos);
  }
}

