"use strict";
// Всі обрахунки в лендінгу проводяться по ануїтету
// Входные данные
var month_rate, // Месячная ставка
    commission, // Комимссия
    commission_rate, // Коммиссионная ставка
    advance, // Авансная сумма
    advance_rate, // Авансная ставка
    interest_rate, // Процентная ставка
    month_rate, // Кредитный период (в месяцах)
    year_rate, // Кредитный период (в годах)
    credit, // Кредитная сумма
    cost, // Стоимость товара
    error; // Ошибка о неправельных данных


$("form #car-payment").on("input", function() {
    setAdvance();
    setCredit();
    checkSum();
    checkAdvance();
    setInterrestRate();
    setMonthPay();
    setСommission();
});
$("form #prepaid-expense").on('input', function() {
    checkAdvancePositiv();
    checkSum();
    checkAdvance();
    setInterrestRate();
    setMonthPay();
    setСommission();
});

$("form #month-rate").on("input", function() {
    checkMonth();
    setInterrestRate();
    setMonthPay();
    setСommission();
});

$("form #credit-type").on('change', function() {
    setMonthPay();
})


// button heandler
$("form button").click(function() {
    setInterrestRate();
    setMonthPay();
    setСommission();
});

// Start execute
setMonthPay();
setСommission();



function setInterrestRate() {

    // Проверка на наличие ошибки
    error = $("form .error").text();

    if (error != "") {
        return false;
    }
    let interest_rate = getInterrestRate() * 100;

    interest_rate = roundPlus(interest_rate, 2);
    interest_rate = interest_rate + '%';

    $('.stavka span').html(interest_rate);
}

function setCredit() {
    advance = +$("#prepaid-expense")
        .val()
        .replace(/\s+/g, "");
    credit = +$("#car-payment")
        .val()
        .replace(/\s+/g, "") - advance;
    credit = Math.round(credit);

    var format = String(credit).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
    $("#credit-sum").val(format);

    // $("#credit-sum").val(credit);
    // return 0
}

function checkAdvance() {

    advance = +$("#prepaid-expense")
        .val()
        .replace(/\s+/g, "");
    credit = +$("#car-payment")
        .val()
        .replace(/\s+/g, "") - advance;

    credit = (credit / 100) * 30;
    if (advance < credit) {
        $("form .error").text("Мінімальна сума авансу становить 30% від суми кредиту");
    }
}

function setAdvance() {
    advance = +$("#prepaid-expense")
        .val()
        .replace(/\s+/g, "");
    cost = +$("#car-payment")
        .val()
        .replace(/\s+/g, "");

    if (advance < cost) {
        return 0;
    } else {
        advance = (cost / 100) * 10;
        advance = Math.round(advance);
        $("#prepaid-expense").val(advance);
    }
}

function checkAdvancePositiv() {
    advance = +$("#prepaid-expense")
        .val()
        .replace(/\s+/g, "");
    cost = +$("#car-payment")
        .val()
        .replace(/\s+/g, "");

    if (advance >= cost) {
        $("form .error").text("Cума авансу повинна бути менша за вартість автівки");
    } else {
        $("form .error").text("");
    }

    setCredit();
}

function checkMonth() {
    var month = $("#month-rate").val();

    if (month > 84) {
        $("form .error").text("Максимальний кредитний термін становить 84 місяці");
    } else if (month <= 1) {
        $("form .error").text("Кредитний термін повинен бути більший за 1 місяць");
    } else {
        $("form .error").text("");
    }
}


function checkSum() {
    credit = +$("#credit-sum")
        .val()
        .replace(/\s+/g, "");
    cost = +$("#car-payment")
        .val()
        .replace(/\s+/g, "");
    advance = +$("#prepaid-expense")
        .val()
        .replace(/\s+/g, "");

    // Проверка на максимальную суму кредита
    if ($("form .error").text() != "") {
        return 0;
    } else if (credit > 1500000) {
        $("form .error").html("Сума кредиту більша за 1 500 000 грн,</br> погоджується в індивідуальному порядку!");
    } else if (cost <= 0) {
        $("form .error").html('Вартість автівки повинна бути більша за 0 грн')
    } else {
        $("form .error").text("");
    }

}


// function getClassicMonthPay() {
//   interest_rate = getInterrestRate();

//   // if (interest_rate == 0.0001) {
//   //   let month_pay = getClassicMonthPay();
//   //   return month_pay;
//   // }

//   cost = +$("#car-payment")
//     .val()
//     .replace(/\s+/g, "");
//   advance = +$("#prepaid-expense")
//     .val()
//     .replace(/\s+/g, "");
//   credit = +$("#car-payment")
//     .val()
//     .replace(/\s+/g, "") - advance;
//   month_rate = +$("#month-rate").val();

//   let max_pay = (credit * interest_rate) / 12 + (credit / month_rate);
//   let min_pay = ((credit / month_rate) * interest_rate) / 12 + (credit / month_rate);

//   let month_pay = (max_pay + min_pay) / 2;

//   max_pay = Math.round(max_pay) + 'грн.';
//   min_pay = Math.round(min_pay) + 'грн.';

//   $("#min-pay").html(min_pay);
//   $("#max-pay").html(max_pay);

//   return month_pay;
// }


function getAnnuityMonthPay() {
    interest_rate = getInterrestRate();
    advance = +$("#prepaid-expense")
        .val()
        .replace(/\s+/g, "");
    credit = +$("#car-payment")
        .val()
        .replace(/\s+/g, "") - advance;
    month_rate = +$("#month-rate").val();
    let base = 1 + (interest_rate / 12);
    let exp = month_rate;
    let pow = Math.pow(base, exp);

    let annuity_rate = ( (interest_rate/12) * pow ) / (pow - 1);

    let month_pay = annuity_rate * credit

    let pay = Math.round(month_pay) + ' грн';

    $("#min-pay").html(pay);
    $("#max-pay").html(pay);

    return month_pay;
}



// Подсчет платежа по Аннуитету
function setMonthPay() {
    let credit_type = $('#credit-type').val();

    // Проверка на наличие ошибки
    error = $("form .error").text();

    if (error != "") {
        return false;
    }

    // console.log("NEW");
    // Подсчет платежа

    // Проверка типа кредита
    // if (credit_type === 'Ануїтет') {
    //   var month_pay = getAnnuityMonthPay();
    // } else {
    //   var month_pay = getClassicMonthPay();
    // }

    var month_pay = getAnnuityMonthPay();

    let month_pay_percentage = month_pay / (150000 / 100) / 100;

    $(".circle-1").circleProgress({
        value: month_pay_percentage
    });

    $(".circle-1").on("circle-animation-progress", function(event, progress) {
        $(this)
            .find("span.number")
            .html(Math.round(month_pay * progress) + "</br><i>грн</i>");
    });
}

function setСommission() {
    error = $("form .error").text();

    if (error != "") {
        return false;
    }

    advance = +$("#prepaid-expense")
        .val()
        .replace(/\s+/g, "");
    credit = +$("#car-payment")
        .val()
        .replace(/\s+/g, "") - advance;

    // // Устанавливаем значение комиссии в зависимости от длительности кредита
    // if (month_rate > 1 && month_rate <= 12 && advance_rate < 40) {
    //
    //     commission_rate = 0.0049;
    // } else if (month_rate > 1 && month_rate <= 12 && advance_rate >= 40) {
    //
    //     commission_rate = 0.0299;
    // } else if (month_rate >= 13 && month_rate <= 24 && advance_rate < 40) {
    //
    //     commission_rate = 0.0049;
    // } else if (month_rate >= 13 && month_rate <= 24 && advance_rate >= 40 ) {
    //
    //     commission_rate = 0.0299;
    // }else if (month_rate >= 25 && month_rate <= 36 && advance_rate < 40 ) {
    //
    //     commission_rate = 0.0099;
    // }else if (month_rate >= 25 && month_rate <= 36 && advance_rate >= 40 ) {
    //
    //     commission_rate = 0.0169;
    // }else if (month_rate >= 37 && month_rate <= 84) {
    //
    //     commission_rate = 0;
    // } else {
    //     $("form .error").text("Термін кредитування становить від 1-го до 84 місяці! ");
    // }


    // Устанавливаем значение комиссии в зависимости от длительности кредита
    if (month_rate >= 1 && month_rate <= 12 && advance_rate <= 29) {

        commission_rate = 0.0219;
    }else if (month_rate > 1 && month_rate <= 12 && advance_rate >= 30 && advance_rate <= 39) {

        commission_rate = 0.0299;
    }else if(month_rate >= 1 && month_rate <= 12  && advance_rate >= 40 && advance_rate <= 49 ) {

        commission_rate = 0.0219;
    }else if(month_rate >= 1 && month_rate <= 12 && advance_rate >= 50 && advance_rate <= 59) {

        commission_rate = 0.0219;
    }else if (month_rate > 1 && month_rate <= 12 && advance_rate >= 60 ) {

        commission_rate = 0.0049;
    }else if (month_rate >= 13 && month_rate <= 24 && advance_rate >= 20 && advance_rate <= 29) {

        commission_rate = 0.0219;
    }else if (month_rate >= 13 && month_rate <= 24 && advance_rate >= 30 && advance_rate <= 39) {

        commission_rate = 0.0219;
    }else if (month_rate >= 13 && month_rate <= 24 && advance_rate >= 40 && advance_rate <= 49) {

        commission_rate = 0.0219;
    }else if (month_rate >= 13 && month_rate <= 24 && advance_rate >= 50 && advance_rate <= 59) {

        commission_rate = 0.0299;
    }else if (month_rate >= 13 && month_rate <= 24 && advance_rate >= 60 ) {

        commission_rate = 0.0049;
    } else if (month_rate >= 25 && month_rate <= 36 && advance_rate >= 20 && advance_rate <= 29 ) {

        commission_rate = 0.0099;
    }else if (month_rate >= 25 && month_rate <= 36 && advance_rate >= 30 && advance_rate <= 39 ) {

        commission_rate = 0.0099;
    }else if (month_rate >= 25 && month_rate <= 36 && advance_rate >= 40 && advance_rate <= 49 ) {

        commission_rate = 0.0099;
    }else if (month_rate >= 25 && month_rate <= 36 && advance_rate >= 50 && advance_rate <= 59 ) {

        commission_rate = 0.0099;
    }else if (month_rate >= 25 && month_rate <= 36 && advance_rate >= 60  ) {

        commission_rate = 0.0169;
    }else if (month_rate >= 37 && month_rate <= 84) {

        commission_rate = 0;
    } else {
        $("form .error").text("Термін кредитування становить від 1-го до 84 місяці! ");
    }





    // фиксированную сумма к комиссии всегда (ДРОРМ)
    var fixedSumma = Number("750");
    commission = (credit * commission_rate) + fixedSumma;
    let commission_percentage = commission / (45500 / 100) / 100;

    $(".circle-2").circleProgress({
        value: commission_percentage
    });


    $(".circle-2").on("circle-animation-progress", function(event, progress) {
        $(this)
            .find("span.number")
            .html(Math.round(commission * progress) + "</br><i>грн</i>");
    });
}


function getInterrestRate() {

    // Матрица подсчетов
    let matrix = {
        '1-12 месяцев': {
            // 'Аванс 10%': 0.0539,
            'Аванс 20%': 0.0259,
            'Аванс 30%': 0.0001,
            'Аванс 40%': 0.0010,
            'Аванс 50%': 0.0001,
            'Аванс 60%': 0.0001,
        },
        '13-24 месяцев': {
            // 'Аванс 10%': 0.0859,
            'Аванс 20%': 0.0499,
            'Аванс 30%': 0.0399,
            'Аванс 40%': 0.0279,
            'Аванс 50%': 0.0001,
            'Аванс 60%': 0.0001,
        },
        '25-36 месяцев': {
            // 'Аванс 10%': 0.0989,
            'Аванс 20%': 0.0699,
            'Аванс 30%': 0.0609,
            'Аванс 40%': 0.0489,
            'Аванс 50%': 0.0319,
            'Аванс 60%': 0.0001,
        },
        '37-48 месяцев': {
            // 'Аванс 10%': 0.1099,
            'Аванс 20%': 0.0809,
            'Аванс 30%': 0.0729,
            'Аванс 40%': 0.0609,
            'Аванс 50%': 0.0449,
            'Аванс 60%': 0.0209,
        },
        '49-60 месяцев': {
            // 'Аванс 10%': 0.1129,
            'Аванс 20%': 0.0849,
            'Аванс 30%': 0.0799,
            'Аванс 40%': 0.0679,
            'Аванс 50%': 0.0500,
            'Аванс 60%': 0.0299,

        },
        '61-72 месяцев': {
            // 'Аванс 10%': 0.1149,
            'Аванс 20%': 0.0899,
            'Аванс 30%': 0.0819,
            'Аванс 40%': 0.0699,
            'Аванс 50%': 0.0559,
            'Аванс 60%': 0.0349,
        },
        '73-84 месяцев': {
            // 'Аванс 10%': 0.1179,
            'Аванс 20%': 0.0949,
            'Аванс 30%': 0.0849,
            'Аванс 40%': 0.0749,
            'Аванс 50%': 0.0599,
            'Аванс 60%': 0.0399,
        },
    };

    // Получим нужные поля
    month_rate = +$("#month-rate").val();
    advance = +$("#prepaid-expense")
        .val()
        .replace(/\s+/g, "");
    cost = +$("#car-payment")
        .val()
        .replace(/\s+/g, "");
    advance_rate = advance / (cost / 100);


    let matrix_param_1;
    let matrix_param_2;


    // Установим первый параметр матрици
    if (month_rate > 1 && month_rate <= 12) {
        matrix_param_1 = '1-12 месяцев';
    } else if (month_rate >= 13 && month_rate <= 24) {
        matrix_param_1 = '13-24 месяцев';
    } else if (month_rate >= 25 && month_rate <= 36) {
        matrix_param_1 = '25-36 месяцев';
    } else if (month_rate >= 37 && month_rate <= 48) {
        matrix_param_1 = '37-48 месяцев';
    } else if (month_rate >= 49 && month_rate <= 60) {
        matrix_param_1 = '49-60 месяцев';
    } else if (month_rate >= 61 && month_rate <= 72) {
        matrix_param_1 = '61-72 месяцев';
    } else if (month_rate >= 73 && month_rate <= 84) {
        matrix_param_1 = '73-84 месяцев';
    }

    // Установим второй параметр матрици
    if (advance_rate >= 60) {
        matrix_param_2 = 'Аванс 60%';
    } else if (advance_rate >= 50) {
        matrix_param_2 = 'Аванс 50%';
    } else if (advance_rate >= 40) {
        matrix_param_2 = 'Аванс 40%';
    } else if (advance_rate >= 30) {
        matrix_param_2 = 'Аванс 30%';
    } else if (advance_rate >= 20) {
        matrix_param_2 = 'Аванс 20%';
    } else if (advance_rate >= 10) {
        matrix_param_2 = 'Аванс 10%';
    }


    // Получим процентную ставку
    interest_rate = matrix[matrix_param_1][matrix_param_2];

    return interest_rate;
}


// Проверка полей

function checkCurr(d) {
    if (window.event) {
        if (event.keyCode == 37 || event.keyCode == 39) return;
    }
    d.value = d.value.replace(/\D/g, '');
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function isNumberKey(evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}


// Функция для округления знаков после запятой

function roundPlus(x, n) { //x - число, n - количество знаков
    if (isNaN(x) || isNaN(n)) return false;
    var m = Math.pow(10, n);
    return Math.round(x * m) / m;
}

function triadVartist() {
    credit = +$("#car-payment").val().replace(/\s+/g, "") ;
    var format = String(credit).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');


    // console.log(format + ' format');
    $("#car-payment").val(format);
}

function triadAvans() {
    var credit2 = +$("#prepaid-expense").val().replace(/\s+/g, "") ;
    var format2 = String(credit2).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');

    $("#prepaid-expense").val(format2);
}



// Отправка формы
var contactFormEl = $(".contact-form");
var contactFormStatusEl = contactFormEl.find(".contacts-form__status-message");
var emailInputEl = contactFormEl.find("[name = email]");
var phoneInputEl = contactFormEl.find("[name = phone]");
var validatedFields = { email: true, phone: true };
var mandatoryFields = ["name", "phone"];

contactFormEl.submit(function (e) {
    e.preventDefault();
    var inputsFilled = mandatoryInputsFilled();
    if (inputsFilled && !contactFormHasError()) {
        $.post("mail.php", {
            name: contactFormEl.find("[name = name]").val(),
            email: contactFormEl.find("[name = email]").val(),
            tel: contactFormEl.find("[name = phone]").val(),
            message: contactFormEl.find("[name = comments]").val(),
        })
            .done(function () {
                contactFormStatusEl.text(
                    "Дякуємо за заявку. Ми зв'яжемося з Вами найближчим часом."
                );
                contactFormStatusEl.css("display", "block");
                contactFormStatusEl.css("color", "#7aba41");
            })
            .fail(function () {
                contactFormStatusEl.text("Виникла помилка, спробуйте пізніше");
                contactFormStatusEl.css("display", "block");
                contactFormStatusEl.css("color", "red");
            })
            .always(function () {
                contactFormEl.find("input").each(function () {
                    $(this).val("");
                });
            });
    } else if (!inputsFilled) {
        contactFormStatusEl.text("Обов'язкові поля мають бути заповнені");
        contactFormStatusEl.css("display", "block");
        contactFormStatusEl.css("color", "red");
    } else {
        contactFormStatusEl.css("display", "none");
    }
});

emailInputEl.on("input", function () {
    var inputIsValid = validateContactFormInput(
        emailInputEl.val(),
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    handleInputChange(emailInputEl, inputIsValid);
});

phoneInputEl.on("input", function () {
    var inputIsValid = validatePhone(phoneInputEl.val());
    handleInputChange(phoneInputEl, inputIsValid);
});

function handleInputChange(el, isValid) {
    var inputType = el.attr("name");
    if (isValid || el.val() === "") {
        validatedFields[inputType] = true;
        el.next().css("display", "none");
    } else {
        validatedFields[inputType] = false;
        el.next().css("display", "block");
    }
    if (mandatoryInputsFilled()) contactFormStatusEl.css("display", "none");
}

// Проверка полей

function contactFormHasError() {
    return Object.values(validatedFields).includes(false);
}

function validateContactFormInput(val, regex) {
    return regex.test(val);
}

function validatePhone(telNumber) {
    return (
        (telNumber.match("^\\+[\\(\\-]?(\\d[\\(\\)\\-]?){11}\\d$") ||
            telNumber.match("^\\(?(\\d[\\-\\(\\)]?){9}\\d$")) &&
        telNumber.match("[\\+]?\\d*(\\(\\d{3}\\))?\\d*\\-?\\d*\\-?\\d*\\d$")
    );
}

function checkContactFormInputs() {
    return (
        validateContactFormInput(
            emailInputEl.val(),
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) && validatePhone(phoneInputEl.val())
    );
}

function mandatoryInputsFilled() {
    var result = true;
    mandatoryFields.forEach((inputType) => {
        if (contactFormEl.find(`input[name=${inputType}]`).val() === "")
            result = false;
    });
    return result;
}
