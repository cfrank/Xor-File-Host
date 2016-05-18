/*
 * Holds an EventEmitter
 */
interface EventEmitter{
    func: Function;
    context: Object;
    once: boolean;
}

/*
 * Holds a collection of EventEmitters
 * by a named index
 */
interface EventEmitters{
    [index: string]: Array<EventEmitter>;
}

export default class EventEmit{
    /*
     * Minimal event emitter based on
     * eventemitter3 and written in Typescript
     */
    constructor(){};

    /*
     * Holds the asigned EventEmitters by name
     */
    private _events: EventEmitters = undefined;

    /*
     * Return a list of assigned event listeners
     * If the exists param is sent as well return
     * wheither a listeners exists for that event
     *
     * @Returns {Array} = Array of listeners
     * @Returns {Boolean} = If there are listeners
     */
    listeners(event: string, exists?: boolean): boolean | Array<Function>{
        let available: Array<EventEmitter> | boolean;

        available = this._events && this._events[event];

        if(!exists == null){
            return !!available;
        }

        if(!available){
            // If there are no e. listeners return empty array
            return [];
        }

        if(this._events[event].length === 1 && available[0].func !== null){
            return [available[0].func] as Array<Function>;
        }

        for (let i: number = 0, l: number = this._events[event].length; i < l; ++i){

        }
    }
}