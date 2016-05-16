/*
 * Models an event with generic sender and arguments
 */
interface IEvent<TSender, TArgs> {
    subscribe(func: (sender: TSender, args: TArgs) => void): void;
    unsubscribe(func: (sender: TSender, args: TArgs) => void): void;
}

/*
 * Event dispatcher handles storing the subscriptions and handles the
 * functions of the event
 */
class EventDispatcher<TSender, TArgs> implements IEvent<TSender, TArgs>
{
    /* Stores the subscriptions */
    private _subscriptions: Array<(sender: TSender, args: TArgs) => void> =
            new Array<(sender: TSender, args: TArgs) => void>();

    /*
     * Listen to events from the subscriptions
     */
    subscribe(func: (sender: TSender, args: TArgs) => void): void{
        if(func){
            this._subscriptions.push(func);
        }
    }

    /*
     * Stop listening to events from the subscriptions
     */
    unsubscribe(func: (sender: TSender, args: TArgs) => void): void{
        if(func){
            let i: number = this._subscriptions.indexOf(func);
            if(i >= 0){
                this._subscriptions.splice(i, 1);
            }
        }
    }

    /*
     * Dispatch the event
     */
    dispatch(sender: TSender, args: TArgs): void{
        for(let handler of this._subscriptions){
            handler(sender, args);
        }
    }
}

/*
 * Storage class for multiple named events
 */
class EventList<TSender, TArgs>
{
    private _events: {
        [name: string]: EventDispatcher<TSender, TArgs>;
    } = {};

    get(name: string): EventDispatcher<TSender, TArgs>{
        let event: EventDispatcher<TSender, TArgs> = this._events[name];

        if(event){
            return event;
        }

        event = new EventDispatcher<TSender, TArgs>();
        this._events[name] = event;
        return event;
    }
}

