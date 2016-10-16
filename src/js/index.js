'use strict';

var xirr = require('xirr');

var onDeviceReady = function() {
    document.getElementById('calculate').addEventListener('click', calculate);
    document.getElementById('add-rows').addEventListener('click', addRows);
};

var calculate = function(event) {
    event.stopPropagation();
    event.preventDefault();

    var form = document.forms['xirr-form'];
    var txns = [];
    var amount = form.elements.amount;
    var when = form.elements.when;
    for (var i = 0; i < Math.min(amount.length,when.length); i++) {
        if (amount[i].value !== '' && when[i].value !== '') {
            txns.push({
                amount: Number(amount[i].value),
                when: new Date(when[i].value)
            });
        }
    }
    try {
        var result = xirr(txns);

        document.getElementById('result').textContent = 'Annualized internal ' +
            'rate of return = ' + (Math.round(100000*result)/1000) + '%';
    } catch (error) {
        document.getElementById('result').textContent = error;
    }
};

var addRows = function(event) {
    event.stopPropagation();
    event.preventDefault();

    var inputs = document.getElementById('inputs');
    inputs.appendChild(makeRow());
    inputs.appendChild(makeRow());
    inputs.appendChild(makeRow());
};

var makeRow = function() {
    var div = document.createElement('div');
    var number = document.createElement('input');
    number.type = 'number';
    number.name = 'amount';
    div.appendChild(number);
    var date = document.createElement('input');
    date.type = 'date';
    date.name = 'when';
    div.appendChild(date);
    return div;
};

document.addEventListener('deviceready', onDeviceReady, false);
