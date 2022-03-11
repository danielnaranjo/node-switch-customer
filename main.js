#!/usr/bin/env node

const { exec } = require("child_process");
const { Command } = require('commander');
const program = new Command();
const customersDatabases = require('./customers.json');
const redColor = '\x1b[31m';
const greenColor = '\x1b[32m';
const blackColor = '\x1b[0m';

program
    .name('switch')
    .description('Easy way to manage environment variables')
    .version('1.0.0')
;

program
    .command('customer')
;

program.parse();

const current = program.args[0] !== 'customer' ? program.args[0] : program.args[1];
const customer = customersDatabases.filter(c => { return c.includes(current)});

if (customer.length > 0) {
    exec("echo $UVOD_DB_CONNECTION", (error, stdout, stderr) => {
        if (error) {
            console.error(`[error] ${error.message}`);
            return;
        }
        if (stderr) return;
        console.log(`${greenColor}${stdout}`);
    });
} else {
    console.log(`[error] customer ${redColor}"${current}"${blackColor} code not found`);
}
