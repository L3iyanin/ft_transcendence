
// javascript fat arrow functions
class DelayLogger {
    constructor() {
        this.message = 'Hello World';
    }
    log() {
        setTimeout(() => { // replace with function keyword returns undefined
            console.log(this);
        }, 1000);
    }
}

const logger = new DelayLogger();
logger.log();

// const arr = [5, 8, 2];

// const newArray = arr.reduce(() => {

// })