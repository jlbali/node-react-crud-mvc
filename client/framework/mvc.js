import React, {Component} from 'react';

export class Publisher {

    constructor(){
        this.suscriptors = [];
    }

    suscribe(suscriber){
        this.suscriptors.push(suscriber);
    }

    unsuscribe(suscriber){
        const index = this.suscriptors.indexOf(suscriber);
        this.suscriptors.splice(index, 1);
    }

    notifyAll(){
        this.suscriptors.forEach(function(suscriptor){
            suscriptor.notify();
        });
    }

}


export class ListenerComponent extends Component {

    constructor(props){
        super(props);
        this.publishers = []
    }

    addPublisher(publisher){
        this.publishers.push(publisher);
    }

    notify(){

    }

    componentWillUnmount(){
        var me = this;
        this.publishers.forEach(function(publisher){
            publisher.unsuscribe(me);
        });
    }


}


