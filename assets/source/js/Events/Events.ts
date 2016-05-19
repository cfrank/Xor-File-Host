/*
 * Holds an EventEmitter
 */
interface EventEmitter {
    func: Function;
    context: Object;
    once: boolean;
}

/*
 * Holds a collection of EventEmitters
 * by a named index
 */
interface EventEmitters {
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
     * @Param event = The event
     * @Param exists = Return whether there are listeners
     *
     * @Returns {Array} = Array of listeners
     * @Returns {Boolean} = If there are listeners
     */
    public listeners(event: string, exists: boolean): boolean | Array<Function>{
        let available: Array<EventEmitter> | boolean;

        available = this._events && this._events[event];

        if(exists === true){
            return !!available;
        }

        if(!available){
            /* If there are no e. listeners return empty array */
            return [];
        }

        if(this._events[event].length === 1 && available[0].func !== null){
            return [available[0].func] as Array<Function>;
        }

        let event_length: number = this._events[event].length;
        let temp_ee: Array<Function> = new Array(event_length);

        for (let i: number = 0; i < event_length; ++i){
            temp_ee[i] = available[i].func;
        }

        return temp_ee;
    }

    /*
     * Emit an event to all registered event listeners.
     *
     * @Param event = The event being emitted
     * @Param args = An array of arguments to be supplied to the func
     *
     * @Return {Boolean} = If the event was fired
     */
    public emit(event: string, args: Array<any>): boolean{
        if(!this._events || !this._events[event]){
            // There is nothing to call
            return false;
        }

        let listeners: Array<EventEmitter> = this._events[event],
            length: number = args.length,
            itr: number;

        if(this._events[event].length === 1 && listeners[0].func !== null){
            /* If there is only one event to call */

            if(listeners[0].once === true){
                this.removeListener(event,
                                    listeners[0].func,
                                    listeners[0].context,
                                    true);
            }

            if(listeners[0].context){
                listeners[0].func.apply(listeners[0].context, args);
                return true;
            }
            else{
                listeners[0].func.apply(args);
                return true;
            }
        }
        else{
            /* If there are multiple events to call */
            let event_length: number = listeners.length;

            for (let i: number = 0; i < event_length; ++i){
                if(listeners[i].once === true){
                    this.removeListener(event,
                                        listeners[i].func,
                                        listeners[i].context,
                                        true);
                }

                if(listeners[i].context){
                    listeners[i].func.apply(listeners[i].context, args);
                }
                else{
                    listeners[i].func.apply(args);
                }
            }
        }
        return true;
    }

    /*
     * Add an EventListener for the given event
     * With the options once argument the event will only be fired once
     * before being removed
     *
     * @Param event = The event being added
     * @Param func = The that will be fired
     * @Param context = The context of the function
     * @Param once = (Optional) If the event should only be fired once
     */
    public on(event: string, func: Function, context: any, once?: boolean): void{
        let listener: EventEmitter = Object.create(null);
        listener.func = func;
        listener.context = context || this;
        listener.once = (once != null && once != false) ? true : false;

        if(this._events == null){
            /* If event container is undefined create an empty object 
               to hold events */
            this._events = Object.create(null);
        }

        if(this._events[event] == null){
            /* If this is the first listener on the event */
            this._events[event] = [];
            this._events[event][0] = listener;
        }
        else{
            this._events[event].push(listener);
        }
    }

    /*
     * Remove a event listener from an event
     *
     * @Param event = The event which will be removed
     * @Param func = The function which needs to found
     * @Param context = Only remove listeners matching this context
     * @Param once = Only remove event listeners where once = true
     */
    public removeListener(event: string, func: Function, context: any, once: boolean): void{
        if(this._events == null || this._events[event] == null){
            return;
        }

        let listeners: Array<EventEmitter> = this._events[event],
            temp_events: Array<EventEmitter> = [];

        if(func){
            if(listeners[0].func){
                if(listeners[0].func !== func || 
                    (once != null && listeners[0].once === false) ||
                    (context != null && listeners[0].context !== context)){
                    temp_events.push(listeners[0]);
                }else{
                    for (let i: number = 0, length: number; i < length; ++i){
                        if(listeners[i].func !== func ||
                            (once != null && listeners[i].once === false) ||
                            (context != null && listeners[0].context !== context)){
                            temp_events.push(listeners[i]);
                        }
                    }
                }
            }
        }

        /* If there are no listeners reset it or remove it */
        if(temp_events.length > 0){
            this._events[event] = temp_events;
        }
        else{
            delete this._events[event];
        }
    }

    /*
     * Remove all event listeners from a given event
     * Or if no event is provided remove every event
     *
     * @Param event = The event for which the listeners will be removed
     */
    public removeAllListeners(event?: string): void{
        if(this._events == null){
            return;
        }

        if(event != null){
            delete this._events[event];
        }
        else{
            this._events = Object.create(null);
        }
    }
}