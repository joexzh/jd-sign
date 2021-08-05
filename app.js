const request = require('request')
const fs = require('fs')
const exec = require('child_process').execSync;

const TOKEN = process.env.TOKEN
const CHAT_ID = process.env.CHAT_ID

function send(message) {
    request.post({
        url: `https://api.telegram.org/bot${TOKEN}/sendMessage`,
        json: true,
        body: {
            chat_id: CHAT_ID,
            text: message,
            disable_web_page_preview: true
        }
    }, function (err, resp, body) {
        if (err) {
            console.error(err)
        }
        console.log(body)
    })
}

async function run() {
    await exec("node JD_DailyBonus.js > logs")
    const path = "./logs";
    if (fs.existsSync(path)) {
        const logs = fs.readFileSync(path, 'utf8')
        console.log(logs)
        send(logs)
    }

}

run()