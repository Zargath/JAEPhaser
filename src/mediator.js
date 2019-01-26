import EventEmitter from 'event-emitter-es6';

class Mediator {
  constructor(){
    if(this.instance){
      return this.instance;
    }

    this.eventEmitter = new EventEmitter();
    this.instance = this;
  }
}

const instance = new Mediator();
export default instance