'use strict';

var xirr = require('xirr');

var onDeviceReady = function() {
    document.getElementById('calculate').addEventListener('click', calculate);
};

var calculate = function(event) {
    event.stopPropagation();
    event.preventDefault();

    var form = document.forms['xirr-form'];
    var txns = [];
    var amount = form.elements.amount;
    var when = form.elements.when;
    for (var i = 0; i < Math.min(amount.length,when.length); i++) {
        txns.push({ amount: Number(amount[i].value), when: new Date(when[i].value)});
    }
    var result = xirr(txns);
    console.log(result);

    document.getElementById('result').textContent = (100*result) + ' %';
};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
    },
    // deviceready Event Handler
    //
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    }
};

document.addEventListener('deviceready', onDeviceReady, false);
