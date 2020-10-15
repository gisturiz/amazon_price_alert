const cron =  require("node-cron");
let shell = require("shelljs");

cron.schedule("10 * * * * *", function(){
    console.log("Scheduler running...")
    if(shell.exec("node parser.js https://www.amazon.com/Samsung-970-EVO-1TB-MZ-V7E1T0BW/dp/B07BN217QG/ 160").code !== 0) {
        console.log("Something went wrong")
    };
});