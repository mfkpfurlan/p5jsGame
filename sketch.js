function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15);

  scenarioFar = new Scenario(scenarioFarImg, 1);
  scenarioBack = new Scenario(scenarioBackImg, 3);
  scenarioFront = new Scenario(scenarioFrontImg, 6);

  // mage = new Character(
  //   mageImg,
  //   85, 94,
  //   85, 94,
  //   3, 2,
  //   0, height - 100
  // );

  mage = new CharacterWMatrix(
    mageImg,
    85, 94,
    85, 94,
    mageMatrix,
    50, height - 100
  )

  behe = new MinionWMatrix(
    beheImg,
    80, 80,
    80, 80,
    beheMatrix,
    50, height - 80
  )

  blueMinion = new MinionWMatrix(
    blueMinionImg,
    90, 132,
    45, 66,
    blueMinionMatrix,
    50, height - 132
  )

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

  // blueMinion = new Minion(
  //   blueMinionImg,
  //   90, 132,
  //   45, 66,
  //   3, 2,
  //   50, height - 132
  // )

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

  // behe = new Minion(
  //   beheImg,
  //   80, 80,
  //   80, 80,
  //   4, 4,
  //   50, height - 80
  // )

  // metal = new Minion(
  //   metalImg,
  //   64, 64,
  //   64, 64,
  //   3, 4,
  //   50, height - 80
  // )

  // tree = new Minion(
  //   treeImg,
  //   96, 96,
  //   96, 96,
  //   4, 4,
  //   50, height - 80
  // )

  inimigos.push(blueMinion);
  inimigos.push(behe);
}

function keyPressed() {
  //JUMP
  if (key === 'ArrowUp') {
    mage.jump();
  }

  //ATTACK
  if (key === 'c') {
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

  //POWER UP
  if (mage.evolution1 === false) {
    powerup.show();
    powerup.move();
  } else {
    powerup.spawn();
  }

  //MINION SPAW

  //Math.floor(Math.random() * (max - min + 1) ) + min

  // const inimigo = inimigos[index];

  // if (!inimigos[index].dead) {
  //   inimigos[index].show();
  //   inimigos[index].move();
  // } else {
  //   setTimeout(() => {
  //     index = 1;
  //     inimigos[index].spawn();
  //     console.log(index);
  //   }, 1000);
  //   index = 0;
  // }

  if (!blueMinion.dead) {
    blueMinion.show();
    blueMinion.move();
    if (blueMinion.xPos < 0) {
      blueMinion.spawn();
    }
  } else {
    blueMinion.spawn();
  }

  if (!behe.dead) {
    behe.show();
    behe.move();
    if (behe.xPos < 0) {
      behe.spawn();
    }
  } else {
    setTimeout(() => {
      behe.spawn();
    }, 1500);
  }

  // if (!metal.dead) {
  //   metal.show();
  //   metal.move();
  //   if (metal.xPos < 0) {
  //     metal.spawn();
  //   }
  // } else {
  //   setTimeout(() => {
  //     metal.spawn();
  //   }, 2000);
  // }

  // if (!tree.dead) {
  //   tree.show();
  //   tree.move();
  //   if (tree.xPos < 0) {
  //     tree.spawn();
  //   }
  // } else {
  //   setTimeout(() => {
  //     tree.spawn();
  //   }, 2500);
  // }

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

  // if (mage.collides(behe)) {
  //   if (mage.evolution1) {
  //     mage.evolve0();
  //     behe.death();
  //     mage.isInvencible(800);
  //     return 0;
  //   }
  //   //mage dies
  //   blueMinion.death();
  //   mage.isInvencible(800);
  // }

  // if (mage.collides(metal)) {
  //   if (mage.evolution1) {
  //     mage.evolve0();
  //     metal.death();
  //     mage.isInvencible(800);
  //     return 0;
  //   }
  //   //mage dies
  //   blueMinion.death();
  //   mage.isInvencible(800);
  // }

  // if (mage.collides(tree)) {
  //   if (mage.evolution1) {
  //     mage.evolve0();
  //     tree.death();
  //     mage.isInvencible(800);
  //     return 0;
  //   }
  //   //mage dies
  //   blueMinion.death();
  //   mage.isInvencible(800);
  // }

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

  //OTHER ENEMIES
  // if (mageFlame.collides(behe)) {
  //   behe.death();
  //   mageFlame.lifeCycle++;
  //   if (mageFlame.lifeCycle >= 2) {
  //     mageFlame.shooting = false;
  //     mageFlame.xPos = 0;
  //     mageFlame.lifeCycle = 0;
  //   }
  // }

  // if (mageBullet.collides(behe)) {
  //   blueMinion.death();
  //   mageBullet.shooting = false;
  //   mageBullet.xPos = 0;
  // }

  // if (mageFlame.collides(metal)) {
  //   metal.death();
  //   mageFlame.lifeCycle++;
  //   if (mageFlame.lifeCycle >= 2) {
  //     mageFlame.shooting = false;
  //     mageFlame.xPos = 0;
  //     mageFlame.lifeCycle = 0;
  //   }
  // }

  // if (mageBullet.collides(metal)) {
  //   metal.death();
  //   mageBullet.shooting = false;
  //   mageBullet.xPos = 0;
  // }

  // if (mageFlame.collides(tree)) {
  //   tree.death();
  //   mageFlame.lifeCycle++;
  //   if (mageFlame.lifeCycle >= 2) {
  //     mageFlame.shooting = false;
  //     mageFlame.xPos = 0;
  //     mageFlame.lifeCycle = 0;
  //   }
  // }

  // if (mageBullet.collides(tree)) {
  //   tree.death();
  //   mageBullet.shooting = false;
  //   mageBullet.xPos = 0;
  // }

  // //ENEMY ARRAY TRIAL
  // if (mageFlame.collides(inimigos[index])) {
  //   inimigos[index].death();
  //   mageFlame.lifeCycle++;
  //   if (mageFlame.lifeCycle >= 2) {
  //     mageFlame.shooting = false;
  //     mageFlame.xPos = 0;
  //     mageFlame.lifeCycle = 0;
  //   }
  // }

  // if (mageBullet.collides(inimigos[index])) {
  //   inimigos[index].death();
  //   mageBullet.shooting = false;
  //   mageBullet.xPos = 0;
  // }

  //COLLISION EFFECTS
  if (blueMinion.dead) {
    hit.show(blueMinion.xPos - 20, blueMinion.yPos);
  }

  if (mage.evolving) {
    evolve.show(mage.xPos, mage.yPos);
  }
}

