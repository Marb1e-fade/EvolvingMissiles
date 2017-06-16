function Rocket(dna) {
  this.pos = createVector(width / 2, height - 1);
  this.vel = createVector();
  this.acc = createVector();
  this.completed = false;
  this.crashedRect = false;
  this.crashedBorder = false;
  this.crashed = false;
  this.fitness = 0;

  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.calcFitness = function() {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);

    this.fitness = map(d, 0, width, width, 0);
    if (this.crashedRect) {
      // this.fitness /= random(5, 10);
      this.fitness = 0;
    }
  }

  this.update = function() {

    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d < 10) {
      this.completed = true;
      this.pos = target.copy();
    }

    if (this.pos.x > rx &&
      this.pos.x < rx + rw &&
      this.pos.y < ry + rh &&
      this.pos.y > ry) {
      this.crashed = true;
      this.crashedRect = true;
    }

    if (this.pos.x > width || this.pos.x < 0 || this.pos.y < 0) {
      this.crashed = true;
      this.crashedBorder = true;
    }

    if (this.pos.y > height) {
      this.crashed = true;
      this.crashedRect = true;
    }



    this.applyForce(this.dna.genes[count]);
    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }
  }

  this.show = function() {
    push();
    colorMode(RGB);
    this.rocketGenesShow();
    pop();
  }

  this.rocketGenesShow = function() {
    if (!this.crashedRect) {
      noStroke();
      fill(255, 255, 0, 150);
      translate(this.pos.x, this.pos.y);
      rotate(this.vel.heading());
      rectMode(CENTER);
      rect(0, 0, 25, 5);
    } else {
      noStroke();
      fill(255, 0, 0, 150);
      translate(this.pos.x, this.pos.y);
      rotate(this.vel.heading());
      rectMode(CENTER);
      rect(0, 0, 25, 5);
    }
  }

}
