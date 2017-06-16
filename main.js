var population;
var lifespan = 600;
var lifeP;
var count = 0;
var target;
var maxforce = 0.2;
var total = 0;

var allDead;
var deadCount;
var allReached;
var reachedCount;

var rx = 100;
var ry = 150;
var rw = 200;
var rh = 10;

function setup() {
  createCanvas(400, 300);
  population = new Population(total);
  lifeP = createP();
  target = createVector(width / 2, 50);
  output();
}

function output() {
  population.maxFitOut.html("<br />Best fitness: ");
  population.triesOut.html("<br /><br />Tries: 1");
  population.badGenesOut.html("<br />");
  population.normalGenesOut.html("<br />");
  population.goodGenesOut.html("<br />");
  population.firstGoalOut.html("<br />");
  population.totalOut.html("<br />");
}

function check() {
  deadCount = 0;
  reachedCount = 0;
  allDead = false;

  for (var i = 0; i < population.popsize; i++) {
    if (population.rockets[i].crashed ||
        population.rockets[i].completed) {
      deadCount++;
      if (deadCount == population.popsize) {
        allDead = true;
      }
    } else if (population.rockets[i].completed) {
      reachedCount++;
      if (reachedCount == population.popsize) {
        allReached = true;
        alert("Congratulations!\n" +
          "All " + population.popsize + " rockets reached the goal!\n" +
          "It took " + population.tries + " tries!\n");
      }
    }
  }
}

function draw() {
  background(0);
  population.run();
  lifeP.html("Frames: " + count + "<br />");
  count++;
  total = population.totalGoal;

  check();
  population.genesInfo();

  if (count == lifespan || allDead) {
    population.evaluate(total);
    population.selection();
    //population = new Population();
    count = 0;
  }

  colorMode(RGB);
  fill(5, 255, 0, 180);
  rect(rx, ry, rw, rh);

  ellipse(target.x, target.y, 16, 16);
}
