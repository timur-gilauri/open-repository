class Intervals {
  constructor(workingTime, pauseTime, numbersOfIntervals) {
    this.start = 1;
    this.pause = pauseTime;
    this.workingTime = workingTime;
    this.numbersOfIntervals = numbersOfIntervals;
  }
  
  runWork() {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        console.log('work');
        resolve();
      }, this.workingTime * 1000)
    });
  }
  
  runPause() {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        console.log('pause');
        resolve();
      }, this.pause * 1000)
    });
  }
  
  runInterval() {
    return new Promise((resolve, reject) => {
      this.runWork()
        .then(() => {
          this.runPause()
            .then(() => {
              console.log('interval');
              resolve();
            });
        });
    });
  }
  
  runSequence() {
    if (this.start <= this.numbersOfIntervals) {
      this.runInterval()
        .then(() => {
          this.runSequence(this.start++)
        });
    } else {
      console.log('sequence ended');
      this.reset();
    }
  }
  
  reset() {
    this.start = 1;
  }
}