document.addEventListener('DOMContentLoaded', function () {
    // Set default values
    document.getElementById('investmentInput').value = 100000;
    document.getElementById('interestInput').value = 6.5;
    document.getElementById('timeInput').value = 1;
    // Trigger the calculation function to update the displayed values and the chart
    calculateFD();
});
document.addEventListener('DOMContentLoaded', function () {
    const selectAmount = document.getElementById('selectAmount');
    const useButton = document.getElementById('useButton');
    const amountList = document.getElementById('amountList');
    const investmentInput = document.getElementById('investmentInput');
    const investmentRange = document.getElementById('investmentRange');
    for (let amount = 5000; amount <= 1000000; amount += 1000) {
        const option = document.createElement('option');
        option.value = amount;
        option.textContent = amount.toLocaleString('en-IN');
        amountList.appendChild(option);
    }
    // Attach event listeners after DOM content is loaded
    useButton.addEventListener('click', function () {
        const selectedAmount = document.getElementById('selectAmount').value;
        investmentInput.value = selectedAmount;
        investmentRange.value = selectedAmount;
        calculateFD();
    });
    // This function sets the selected amount from the modal into the input field
    selectAmount.addEventListener('change', function () {
        const selectedAmount = this.value;
        investmentInput.value = selectedAmount;
        investmentRange.value = selectedAmount;
        calculateFD();
    });
    investmentRange.addEventListener('input', function () {
        console.log("Investment range changed");
        investmentInput.value = this.value;
        //   document.getElementById('amountInput').value = this.value;
        calculateFD();
    });
    interestRange.addEventListener('input', function () {
        document.getElementById('RATE_OF_INTEREST').value = this.value;
        document.getElementById('interestInput').value = this.value;
        calculateFD();
    });
    timePeriodRange.addEventListener('input', function () {
        document.getElementById('FD_TIME_IN_YEARS').value = this.value;
        document.getElementById('timeInput').value = this.value;
        calculateFD();
    })
});

document.addEventListener('DOMContentLoaded', function () {
    const selectInterest = document.getElementById('selectInterest');
    const useInterestButton = document.getElementById('useInterestButton');
    const interestRange = document.getElementById('interestRange');
    const interestInput = document.getElementById('interestInput');
    const interestList = document.getElementById('interestList');

    for (let interest = 0.1; interest <= 15; interest += 0.1) {
        const option = document.createElement('option');
        option.value = interest.toFixed(1);
        option.textContent = interest.toFixed(1) + '%';
        interestList.appendChild(option);
    }
    useInterestButton.addEventListener('click', function () {
        const selectedInterest = document.getElementById('selectInterest').value;
        interestInput.value = selectedInterest;
        interestRange.value = selectedInterest;
        calculateFD();
    });
    // This function sets the selected amount from the modal into the input field
    selectInterest.addEventListener('change', function () {
        const selectedInterest = this.value;
        interestInput.value = selectedInterest;
        interestRange.value = selectedInterest;
        calculateFD();
    })
    interestRange.addEventListener('input', function () {
        interestInput.value = this.value;
        calculateFD();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const selectTime = document.getElementById('selectTime');
    const useTimeButton = document.getElementById('useTimeButton');
    const timePeriodRange = document.getElementById('timePeriodRange');
    const timeInput = document.getElementById('timeInput');
    const timePeriodList = document.getElementById('timePeriodList');
    for (let time = 1; time <= 25; time++) {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time + ' years';
        timePeriodList.appendChild(option);
    }
    useTimeButton.addEventListener('click', function () {
        const selectedTime = document.getElementById('selectTime').value;
        timeInput.value = selectedTime;
        timePeriodRange.value = selectedTime;
        calculateFD();
    });
    // This function sets the selected amount from the modal into the input field
    selectTime.addEventListener('change', function () {
        const selectTime = this.value;
        timeInput.value = selectTime;
        timePeriodRange.value = selectTime;
        calculateFD();
    })
    timePeriodRange.addEventListener('input', function () {
        document.getElementById('timeInput').value = this.value;
        calculateFD();
    });
});

document.getElementById('investmentRange').addEventListener('input', function () {
    document.getElementById('investmentInput').value = this.value;

    calculateFD();
});
document.getElementById('interestRange').addEventListener('input', function () {
    document.getElementById('interestInput').value = this.value;
    calculateFD();
});
document.getElementById('timePeriodRange').addEventListener('input', function () {
    document.getElementById('timeInput').value = this.value;
    calculateFD();
});

document.addEventListener('DOMContentLoaded', function () {
    const timeInput = document.getElementById('timeInput');
    const cycleButton = document.getElementById('cycleButton');
    let currentUnit = 'years';
    function cycleUnits() {
        if (currentUnit === 'years') {
            currentUnit = 'months';
            cycleButton.textContent = 'Months';
        } else if (currentUnit === 'months') {
            currentUnit = 'days';
            cycleButton.textContent = 'Days';
        } else {
            currentUnit = 'years';
            cycleButton.textContent = 'Years';
        }
        timeInput.placeholder = `Enter Time Period (${currentUnit})`;
        calculateFD();
    }
    // Event listener for clicking the cycle button
    cycleButton.addEventListener('click', cycleUnits);
    // Event listener for input change
    timeInput.addEventListener('input', calculateFD)
});

function calculateFD() {
    const totalInvestment = document.getElementById('investmentInput').value;
    const rateOfInterest = document.getElementById('interestInput').value;
    const timePeriod = document.getElementById('timeInput').value;
    let investedAmount = Math.floor(totalInvestment / 1000) * 1000;
    let estimatedReturns = 0;
    let totalValue = 0;
    // Get the current unit from the button
    let currentUnit = document.getElementById('cycleButton').textContent.toLocaleLowerCase();
    // Perform calculations considering years, months, and days
    if (currentUnit === 'years') {
        estimatedReturns = (totalInvestment * rateOfInterest * timePeriod) / 100;
    } else if (currentUnit === 'months') {
        estimatedReturns = (totalInvestment * rateOfInterest * (timePeriod / 12) / 100);
    } else {
        estimatedReturns = (totalInvestment * rateOfInterest * (timePeriod / 365) / 100);
    }
    totalValue = Number(totalInvestment) + Number(estimatedReturns);
    console.log("totalInvestment:", totalInvestment);
    console.log("rateOfInterest:", rateOfInterest);
    console.log("timePeriod:", timePeriod);
    console.log("estimatedReturns:", estimatedReturns);
    const formattedInvested = investedAmount.toLocaleString('en-IN',{
        style:'currency',
        currency:'INR',
    });
    const formattedEstimatedReturns = estimatedReturns.toLocaleString('en-IN',{
        style:'currency',
        currency:'INR',
    });
    const formattedTotalValue = totalValue.toLocaleString('en-IN', {
        style:'currency',
        currency:'INR',
    })
    // totalValue = totalInvestment + estimatedReturns;
    document.getElementById('investedAmount').innerText = formattedInvested;
    document.getElementById('estimatedReturns').innerText = formattedEstimatedReturns;
    document.getElementById('totalValue').innerText = formattedTotalValue;
    updateChart(investedAmount, estimatedReturns);
}

let myChart;
document.addEventListener('DOMContentLoaded', function () {
    // Call the function to initialize the chart on page load
    initializeChart();
});
function initializeChart() {
    const investedAmount = 100000;
    const estimatedReturns = 6500;
    // updateChart(investedAmount, estimatedReturns);
    const ctx = document.getElementById('myChart').getContext('2d');
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Investment', 'Returns'],
            datasets: [{
                label: 'FD Details',
                data: [investedAmount, estimatedReturns],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(42, 210, 201, 1)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',

                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
function updateChart(investedAmount, estimatedReturns) {
    if (myChart) {
        myChart.data.datasets[0].data = [investedAmount, estimatedReturns];
        myChart.update();
    }

}