// For Amazon deal prices

require('dotenv').config()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const nightmare = require('nightmare')()

const args = process.argv.slice(2)
const url = args[0]
const minPrice = args[1]

checkPrice()

async function checkPrice() {
  try {
    const priceString = await nightmare.goto(url)
                                       .wait("#priceblock_dealprice")
                                       .evaluate(() => document.getElementById("priceblock_dealprice").innerText)
                                       .end()
    const priceNumber = parseFloat(priceString.replace('$', ''))
    if (priceNumber < minPrice) {
      await sendEmail(
        'Price Is Low',
        `The price on ${url} has dropped below $${minPrice}`
      )
    }
  } catch (e) {
    await sendEmail('Amazon Price Checker Error', e.message)
    throw e
  }
}

function sendEmail(subject, body) {
  const email = {
    to: 'tinewe9255@justlibre.com',
    from: 'isturizgustavo@gmail.com',
    subject: subject,
    text: body,
    html: body
  }

  return sgMail
  .send(email)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}