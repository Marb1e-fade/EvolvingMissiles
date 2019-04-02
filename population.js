function Population(total_) {
  this.popsize = prompt("Enter population size, please.", 100)
  console.log(this.popsize);
  this.totalGoal = total_;
  this.rockets = [];
  this.matingpool = [];
  this.limit = 400;
  this.mfOut;
  this.tries = 1;
  this.bg;
  this.gg;
  this.gg_;
  this.fComplete = false;
  this.totalOut = createP();
  this.maxFitOut = createP();
  this.triesOut = createP();
  this.badGenesOut = createP();
  this.normalGenesOut = createP();
  this.goodGenesOut = createP();
  this.firstGoalOut = createP();

  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.genesInfo = function() {
    this.bg = 0;
    this.gg = 0;
    for (var i = 0; i < this.popsize; i++) {
      if (this.rockets[i].completed) {
        this.gg++;
      }
      if (this.rockets[i].crashedRect) {
        this.bg++;
      } else if (this.rockets[i].completed && !this.fComplete) {
        this.fComplete = true;
        this.firstGoalOut.html("<br /><br /><br /><br /><br /><br />" +
          "<br /><br />First goal at: " + this.tries);
      }
    }

    this.badGenesOut.html("<br /><br /><br /><br />Bad genes: " + this.bg);
    this.bg = this.popsize - (this.bg + this.gg);
    this.goodGenesOut.html("<br /><br /><br /><br /><br /><br />" +
                           "Good genes: " + this.gg);
    this.normalGenesOut.html("<br /><br /><br /><br /><br />Normal genes: " +
                              this.bg);
    if (this.gg_ < this.gg) {
      this.totalGoal = this.totalGoal + (this.gg - this.gg_);
    }
    this.totalOut.html("<br /><br /><br /><br /><br /><br /><br /><br /><br />" +
                       "Total goals: " + this.totalGoal)
    this.gg_ = this.gg;
  }

  this.evaluate = function() {
    this.tries++;
    var maxfit = 0;
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
        this.mfOut = floor(maxfit / this.limit * 100);
        this.maxFitOut.html("<br />Best fitness: " + this.mfOut + "%<br />");
      }
    }
    this.triesOut.html("<br /><br />Tries: " + this.tries);

    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
    }

    this.matingpool = [];
    for (var i = 0; i < this.popsize; i++) {
      var n = this.rockets[i].fitness * 100;
      for (var j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
  }

  this.selection = function() {
    var newRockets = [];
    for (var i = 0; i < this.rockets.length; i++) {
      var parentA = random(this.matingpool).dna;
      var parentB = random(this.matingpool).dna;
      var child = parentA.crossover(parentB);
      child.mutation();
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  }

  this.run = function() {
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
}
