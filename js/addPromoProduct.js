function promoValidate() {
    var startDay = document.getElementById('startDay').value;
    var startMonth = document.getElementById('startMonth').value;
    var startYear = document.getElementById('startYear').value;
    var endDay = document.getElementById('endDay').value;
    var endMonth = document.getElementById('endMonth').value;
    var endYear = document.getElementById('endYear').value;
    var discount = document.getElementById('discount').value;
    var discountWarning = document.getElementById('discountWarning');
    var startDayWarning = document.getElementById('startDayWarning');
    var endDayWarning = document.getElementById('endDayWarning');


    if (startDay !== 'Day' && startMonth !== 'Month' && startYear !== 'Year'){
        startDayWarning.innerText = '✔';
    }else {
        startDayWarning.innerText = '✘';
    }

    if (endDay !== 'Day' && endMonth !== 'Month' && endYear !== 'Year'){
        endDayWarning.innerText = '✔';
    }else {
        endDayWarning.innerText = '✘';
    }

    if (discount.length > 0 && discount.length < 45 && /\d/.test(discount)){
        discountWarning.innerText = '✔';
    }else {
        discountWarning.innerText = '✘';
    }
}