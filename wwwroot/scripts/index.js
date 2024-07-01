var pricipalObj2;
var loantenureObj;
var interestrateObj1;
var principal;
var interest;
var tenure;
var pie;
var yearValue;
var monthValue;
var yearTenure = true;
var chart;
var treegrid;
var emi;
var princ;
var totalPrincipalYear = 0;
var totalInterestYear = 0;
var tent;
var inter;
var dataUnits = [];
var yearWiseData = [];
var dateObj = new Date();
var totalInterest = 0;
var totalAmount = 0;
var totalPrincipal = 0;
var endBalance;
var beginBalance;
var yearTotal = 0;
var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
var datepickerObj;
var intl = new ej.base.Internationalization();

function principalChange() {
    principal.setProperties({ value: pricipalObj2.value });
    setInitValues();
}
function principalChanged() {
    refreshUI();
}
function principalRenderedTicks(args) {
    var li = args.ticksWrapper.getElementsByClassName('e-large');
    for (var i = 0; i < li.length; ++i) {
        var ele = li[i].querySelectorAll('.e-tick-value')[0];
        var num = parseInt(ele.innerText.substring(1).replace(/,/g, ''), 10) / 1000;
        ele.innerText = num === 0 ? ('' + num) : (num + 'K');
    }
}
function refreshUI() {
     refreshUI1();
     calRangeValues();
     renderControls();
     chart.refresh();
     treegrid.refresh();
}
function loantenureChange() {
    tenure.setProperties({ value: loantenureObj.value });
    setInitValues();
}
function loantenureChanged() {
    refreshUI();
}
function interestrateChange() {
    interest.setProperties({ value: interestrateObj1.value });
    setInitValues();
}
function interestrateChanged() {
    refreshUI();
}
function radio1Change() {

    yearTenure = false;
    var currVal = (tenure.value * 12);
    tenure.setProperties({
        min: 12,
        max: 480,
        step: 12,
        value: currVal
    });
    loantenureObj.setProperties({
        min: 0,
        value: currVal,
        max: 480,
        step: 12,
        ticks: { placement: 'after', largeStep: 120, smallStep: 12, showSmallTicks: false }
    });
}
function radio2Change() {
    yearTenure = true;
    var currVal = (tenure.value / 12);
    loantenureObj.setProperties({
        min: 0,
        value: currVal,
        max: 40,
        step: 1,
        ticks: { largeStep: 10, smallStep: 1, showSmallTicks: false }
    });
    tenure.setProperties({
        min: 1,
        max: 40,
        step: 1,
        value: currVal
    });
}
function interest_txtChange(args) {
    if (args.isInteraction) {
        interestrateObj1.setProperties({ value: interest.value });
        refreshUI();
    }
}
function principal_txtChange(args) {
    if (args.isInteraction) {
        pricipalObj2.setProperties({ value: principal.value });
        refreshUI();
    }
}
function loan_txtChange() {
    if (tenure.value && loantenureObj.value != tenure.value) {
        loantenureObj.setProperties({ value: tenure.value });
    }
    refreshUI();
}
function payment_pieChartPointRender(args) {
    if (args.point.index) {
        args.border.width = 7;
        args.fill = 'url(#interest_svg)';
    }
    else {
        args.border.width = 7;
        args.border.color = '#162036';
        args.fill = 'url(#principal_svg)';
    }
}
function monthStarterChange(args) {
    if (ej.base.isNullOrUndefined(datepickerObj.value)) {
        datepickerObj.setProperties({ value: new Date() });
    }
    else {
        refreshUI();
    }
}
function paymentGraphChartMouseup(args) {
    if (args.target.indexOf('_chart_legend_') > -1 && (args.target.indexOf('shape') > -1 || args.target.indexOf('text') > -1)) {
        var id = [args.target];
        id = (args.target.indexOf('shape') > -1) ? id[0].split('chart_legend_shape_') : id[0].split('chart_legend_text_');
        var index = parseInt(id[1], 10);
        var series = chart.visibleSeries[index];
        var yName = series.yAxisName;
        var ySName = void 0;
        var visibility = false;
        if (series.visible) {
            for (var i = 0, len = chart.series.length; i < len; i++) {
                ySName = chart.series[i].yAxisName;
                if (len === 1 || (chart.series[i].visible &&
                    chart.series[i].index !== series.index && yName === ySName)) {
                    visibility = true;
                }
            }
            series.yAxis.visible = visibility;
        }
        else {
            series.yAxis.visible = true;
        }
    }
}

function paymentGraphAxisLabelRender() {
    if (window.innerWidth < 576) {
        if (args.axis.name === 'primaryYAxis' || args.axis.name === 'yAxis') {
            var value = Number(args.value) / 1000;
            args.text = value === 0 ? value.toString() : (value.toString() + 'K');
        }
    }
}
window.default = function () {
    pie = document.getElementById("payment_pieChart").ej2_instances[0];
    interest = document.getElementById("interest_txt").ej2_instances[0];
    tenure = document.getElementById("loan_txt").ej2_instances[0];
    principal = document.getElementById("principal_txt").ej2_instances[0];
    datepickerObj = document.getElementById("monthStarter").ej2_instances[0];
    treegrid = document.getElementById("treeGrid").ej2_instances[0];
    chart = document.getElementById("paymentGraph").ej2_instances[0];
    pricipalObj2 = document.getElementById("pricipal").ej2_instances[0];
    interestrateObj1 = document.getElementById("interestrate").ej2_instances[0];
    loantenureObj = document.getElementById("loantenure").ej2_instances[0];
    datepickerObj.showClearButton = false;
    datepickerObj.refresh();
    emi = calculateEMI();
    princ = principal.value;
    tent = yearTenure ? (tenure.value * 12) : tenure.value;
    renderVisalComponents();
    dataUnits = [];
    yearWiseData = [];
    dateObj = new Date();
    totalInterest = 0;
    totalAmount = 0;
    totalPrincipal = 0;
    refreshUI();
    window.destroy = function () {
        destroyComponents();
        window.destroy = null;
    };
}

function calculateEMI() {
    var interestValue = getInterest();
    var tent = yearTenure ? (tenure.value * 12) : tenure.value;
    if (interestValue) {
        return principal.value * interestValue *
            (Math.pow((1 + interestValue), tent)) / ((Math.pow((1 + interestValue), tent)) - 1);
    }
    return principal.value / tent;
}
function getCurrencyVal(value) {
    return intl.formatNumber(value, { format: 'C0' });
}
function getInterest() {
    return interest.value ? parseFloat('' + interest.value / 12 / 100) : 0;
}

function renderVisalComponents() {
    pie.series[0].dataSource = [{ "x": 'Principal Amount', "y": princ },
        { "x": 'Interest Amount', "y": ((emi * tent) - princ) }];
    pie.refresh();
}

function refreshUI1() {
    setInitValues();
    var interestPercent = parseFloat((Math.round((emi * tent) - princ) / Math.round((emi * tent)) * 100).toFixed(2));
    pie.series[0].dataSource = [
        { "x": 'Principal Amount', "y": princ, text: parseFloat(((princ) / Math.round((emi * tent)) * 100).toFixed(2)) + '%' },
        { "x": 'Interest Amount', y: (tent ? Math.round((emi * tent) - princ) : 0), text: interestPercent ? interestPercent + '%' : ' ' }];
    pie.refresh();
}

function setInitValues() {
    emi = calculateEMI();
    princ = principal.value;
    tent = yearTenure ? (tenure.value * 12) : tenure.value;
    dataUnits = [];
    yearWiseData = [];
    dateObj = new Date(datepickerObj.value.getTime());
    totalInterest = 0;
    totalAmount = 0;
    totalPrincipal = 0;
    totalPrincipalYear = 0;
    totalInterestYear = 0;
    document.getElementById('loan_emi').innerHTML = getCurrencyVal(tent ? Math.round(emi) : 0);
    document.getElementById('loan_interest').innerHTML = getCurrencyVal(tent ? Math.round((emi * tent) - princ) : 0);
    document.getElementById('loan_total_payment').innerHTML = getCurrencyVal(tent ? Math.round((emi * tent)) : 0);
    document.getElementById('loan_principal').innerHTML = getCurrencyVal(princ);
}

function calRangeValues() {
    for (var i = 0; i < tent; i++) {
        inter = getInterest ? (princ * getInterest()) : princ;
        totalInterest += inter;
        totalAmount += emi;
        totalPrincipal += parseFloat((emi - inter).toFixed(2));
        endBalance = princ - (emi - inter);
        yearTotal += emi;
        totalPrincipalYear += parseFloat((emi - inter).toFixed(2));
        totalInterestYear += inter;
        dataUnits.push({
            id: (i + 1),
            month: monthNames[dateObj.getMonth()],
            index: (i + 1),
            totalInterest: Math.round(totalInterest),
            totalAmount: totalAmount,
            emi: Math.round(emi),
            year: monthNames[dateObj.getMonth()],
            beginningBalance: Math.round(princ),
            interest: Math.round(inter),
            pricipalPaid: Math.round((emi - inter)),
            endingBalance: Math.round(endBalance),
            parentId: dateObj.getFullYear(),
            yearTotal: Math.round(yearTotal),
            yearPrincipal: totalPrincipalYear,
            yearInterest: totalInterestYear
        });
        if (i === 0 || dateObj.getMonth() === 0) {
            beginBalance = princ;
        }
        if (dateObj.getMonth() === 11 || (i === tent - 1)) {
            yearWiseData.push({
                id: dateObj.getFullYear(),
                beginningBalance: Math.round(beginBalance),
                totalInterest: Math.round(totalInterest),
                totalPrincipal: Math.round(totalPrincipal),
                totalAmount: Math.round(totalAmount),
                yearTotal: Math.round(yearTotal),
                endingBalance: Math.round(endBalance),
                yearN: new Date(dateObj.getFullYear(), 0, 1),
                year: dateObj.getFullYear(),
                yearPrincipal: totalPrincipalYear,
                yearInterest: totalInterestYear,
                childRecord: dataUnits,
                parentId: null,
            });
            yearTotal = 0;
            totalPrincipalYear = 0;
            totalInterestYear = 0;
            dataUnits = [];
        }
        princ = endBalance;
        if (i < tent - 1) {
            dateObj.setMonth(dateObj.getMonth() + 1);
        }
    }
}

function renderControls() {
    treegrid.setProperties({
        dataSource: yearWiseData
    });
    chart.series[0].dataSource = yearWiseData;
    chart.series[1].dataSource = yearWiseData;
    chart.series[2].dataSource = yearWiseData;
}


function destroyComponents() {
    pricipalObj2.destroy();
    loantenureObj.destroy();
    interestrateObj1.destroy();
    principal.destroy();
    interest.destroy();
    tenure.destroy();
    pie.destroy();
    chart.destroy();
    treegrid.destroy();
    yearValue.destroy();
    monthValue.destroy();
    datepickerObj.destroy();
}
