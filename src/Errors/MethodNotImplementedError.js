import { MethodNotImplementedErrorText } from '../ErrorTexts';

/**
* Defines the class for the MethodNotImplementedError
* Should be thrown in every method that needs to be overriden
*/
export default class MethodNotImplementedError extends Error {
  constructor() {
    super(MethodNotImplementedErrorText);
  }
}
