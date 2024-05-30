const increase = document.querySelector('.increase-rate').addEventListener('click', () => adjustRate(1)) //increase numbers by 1
const decrease = document.querySelector('.decrease-rate').addEventListener('click', () => adjustRate(-1))// adding -1 to decrease numbers 

document.querySelector('.calcForm').addEventListener('submit', handleSubmit)// adding -1 to decrease numbers 

document.querySelector('.reset').addEventListener('click', reset)

function adjustRate(amount) {
    let rateEle = document.querySelector('.intRate')
    // rateEle is string default
    // changing string to a number
    let rate = parseInt(rateEle.textContent)
    // console.log(rateEle.textContent)

    rate += amount
    // preventing negative numbers
    if (rate < 1) {
        rate = 1
    }
    rateEle.textContent = rate.toString()
}

function reset() {
    document.querySelector(".initial").value = ''
    document.querySelector(".monthly").value = ''
    document.querySelector(".years").value = ''
    document.querySelector('.intRate').textContent = '1'
    document.querySelector('.result').innerText = ''
}

function handleSubmit(e) {
    e.preventDefault()
    // console.log('submitted...')

    principal = document.querySelector(".initial")
    principal = principal.value
    principal = parseFloat(principal)

    let monthlyContribution = document.querySelector(".monthly")
    monthlyContribution = monthlyContribution.value
    monthlyContribution = parseFloat(monthlyContribution)

    let years = document.querySelector(".years")
    years = years.value
    years = parseFloat(years)

    let rate = document.querySelector('.intRate')
    rate = rate.textContent
    rate = parseFloat(rate)

    let futureValue = calculate(principal, monthlyContribution, years, rate)
    // rounding to the second decimal
    futureValue = formatCurrency(futureValue)

    let result = `Future Invesment $${futureValue}`

    document.querySelector('.result').innerText = result

    console.log(futureValue)
}


function calculate(principal, monthlyContribution, years, rate) {
    let annualRate = rate / 100
    let futureValue = principal

    for (let i = 0; i < years; i++) {
        futureValue = futureValue * (1 + annualRate) + (monthlyContribution * 12)
    }

    return futureValue
}

function formatCurrency(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}