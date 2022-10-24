import col from 'cli-color';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const gradient = require('gradient-string');
const figlet = require('figlet');
import readline from 'readline';
const inp = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var Timer = require('timer-machine')
var myTimer = new Timer()
let countdownn = 25200000;

console.clear();
figlet.text('sWorkTimer', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: undefined,
    whitespaceBreak: true
}, function (err, data) {
    if (err) {
        console.log(col.red('Erreur au lancement...'));
        return;
    }
    console.log(gradient('white', 'cyan')(data) + col.blue('\n      Simplifier le décompte des heures de travail\n\t        Un outil de @JeyyJeyy'));
});
await delay(500);
myTimer.start()
redemarrer();
looop();

function redemarrer() {
    inp.question('Commande >> ', name => {
        let args = name.toLowerCase().split(' ');
        switch (args[0]) {
            case 'time':
                timee();
                break;
            case 'help':
                help();
                break;
            case 'pause':
                pause();
                break;
            case 'end':
                end();
                break;
        }
    });
}

function timee() {
    console.log('Temps écoulé: ' + convertHMS(myTimer.time() / 1000) + ' Temps restant: ' + convertHMS(countdownn - myTimer.time()));
    redemarrer();
}

function help() {
    console.log('Commandes disponibles:\n-`help`: Affiche toute les commandes\n-`pause`: Pause/Dépause le minuteur\n-`end`: Arrête le minuteur\n')
    redemarrer();
}

function pause() {
    console.log('Temps avant pause: ' + convertHMS(myTimer.time() / 1000));
    myTimer.toggle();
    redemarrer();
}

function end() {
    myTimer.stop();
    console.log('Temps écoulé: 07:00:00 Temps restant: 00:00:00');
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
}

function looop() {
    setTimeout(function () {
        let timed = myTimer.time() / 1000;
        if (countdownn - timed <= 1) {
            console.log(col.redBright('Temps de travail écoulé pour aujourd\'hui, bonne soirée !'))
            delay(300);
            end();
            delay(300);
            process.exit();
        }
        looop()
    }, 10000);
};