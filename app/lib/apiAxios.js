import { Subscriber } from 'rxjs';
import axios from 'axios';
import axiosCancel from 'axios-cancel';
// adds cancel prototype method
axiosCancel(axios, { debug: true });

export default class AxiosSubscriber extends Subscriber {
    constructor( observer ) {
        super( observer );
        // create sample request id
        this.requestId = Math.random() + '-xhr-id';
        // XHR complete pointer
        this.completed = false;
        // make axios request on subscription
        axios.get( 'https://jsonplaceholder.typicode.com/users', {
            requestId: this.requestId
        } )
        .then( ( response ) => {
            observer.next( response.data );
            this.completed = true;
            observer.complete();
        } )
        .catch( ( error ) => {
            this.completed = true;
            observer.error( error );
        } );
    }

    unsubscribe() {
        super.unsubscribe();
        
        // cancel XHR
        if( this.completed === false ) {
            axios.cancel( this.requestId );
            this.completed = true;
        }
    }
}
