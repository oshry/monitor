'use strict';
import io from 'socket.io-client';
import 'script-loader!jquery';

class Main{
    constructor() {
        this.main();
    }
    main() {
        let UserId = 0;
        let first = {};
        if(localStorage.getItem('monitorUser') === null){
            console.log('new user. say hay');
            UserId = Math.floor(Math.random() * 6000000);
            localStorage.setItem('monitorUser', UserId);
        }else{
            console.log('existed user. load history');
            UserId = localStorage.getItem('monitorUser');
        }
        //get query params
        var query = JSON.stringify(this.getQueryParams(document.location.search));
        //socketIO location
        var socket = io('ws://localhost:3333');
        socket.emit('first',
            {action: 'first', monitorUserId: UserId, page: window.location.pathname, query: query}
        );
        $(document).on('click',  (e) => {
            console.log('click');
            socket.emit('click',
                {action: 'click', monitorUserId: UserId, page: window.location.pathname, query: query}
            );
        });
        $(document).on('mousemove',  (e) => {
            console.log('mousemove');
            socket.emit('mousemove',
                {action: 'mousemove', monitorUserId: UserId, page: window.location.pathname, query: query}
            );
        });
        $(document).on('input',  (e) => {
            console.log('input');
            socket.emit('input',
                {action: 'input', monitorUserId: UserId, page: window.location.pathname, query: query}
            );
        });
    }
    getQueryParams(qs) {
        qs = qs.split('+').join(' ');
        var params = {},
            tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;

        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
    }
}
export default Main;

(()=> {
    new Main();
})();