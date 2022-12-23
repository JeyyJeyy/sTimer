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
let countdownn = 25200;
let mod = 0; //Temps déja écoulé (à déduire dans countdown)
let i = true;

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
    console.log(gradient('#CCFFFF', '#0AADFF')(data) + col.cyan('\n      Simplifier le décompte des heures de travail\n\t        Un outil de @JeyyJeyy\n\n'));
});
await delay(100);
myTimer.start();
let num = (((myTimer.time()/1000) + mod) * 100) / (countdownn + mod);
let txt = 'Temps écoulé: ' + convertHMS((myTimer.time()/1000) + mod) + '  Temps restant: ' + convertHMS(countdownn - (myTimer.time()/1000)) + '    [' + Math.round(num * 100) / 100 + '%]   \n';
printProgress(txt);
redemarrer();
looop();

function redemarrer() {
    inp.question('\x1b[36msCMD >> \x1b[37m', name => {
        let args = name.toLowerCase().split(' ');
        switch (args[0]) {
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

function help() {
    console.log('Commandes disponibles:\n-`help`: Affiche toute les commandes\n-`pause`: Pause/Dépause le minuteur\n-`end`: Arrête le minuteur\n\n')
    redemarrer();
}

function pause() {
    console.log('Temps avant pause: ' + convertHMS((myTimer.time()/1000) + mod));
    myTimer.toggle();
    redemarrer();
    if(i == true){
        i = false;
    }else{
        i = true;
    }
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
	    readline.moveCursor(process.stdout, -12, 0);
            console.log(col.redBright('Temps de travail écoulé pour aujourd\'hui, bonne soirée !'))
            delay(300);
            end();
            delay(300);
            process.exit();
        }else if(i == true){
	    num = (((myTimer.time()/1000) + mod) * 100) / (countdownn + mod);
	    txt = 'Temps écoulé: ' + convertHMS((myTimer.time()/1000) + mod) + '  Temps restant: ' + convertHMS(countdownn - (myTimer.time()/1000)) + '    [' + Math.round(num * 100) / 100
 + '%]   \n';
	    printProgress(txt);
	    redemarrer();
	}
        looop()
    }, 5000);
};

function printProgress(progress){
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    readline.moveCursor(process.stdout, 0, -1);
    process.stdout.write(progress);
}
