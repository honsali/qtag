"use strict";

let $filterList, $suraList, $query, $rowList;
let dataBySura = {};

$(document).ready(function () {
    $filterList = $("#filterList");
    $suraList = $("#suraList");
    $query = $("#query");
    $rowList = $("#rowList");

    $filterList.on("change", filterChanged);
    $suraList.on("change", suraSelected);
    $query.on("input", queryChanged);

    initSuraList();
    dataBySura = _.groupBy(data, "sura");
    $suraList.hide();
    $query.hide();
});

function count() {
    var allChar = 0;
    var selectedChar = 0;

    for (var i = 0; i < allFilters.length; i++) {
        for (var j = 0; j < allFilters[i].data.length; j++) {
            selectedChar = selectedChar + allFilters[i].data[j].to;
        }
    }
    for (var i = 0; i < data.length; i++) {
        allChar = allChar + data[i].text.length;
    }

    console.log(selectedChar * 100 / allChar);
}
function filterChanged() {
    $suraList.hide();
    $query.hide();
    var val = $filterList.val();
    switch (val) {
        case "1":
            showSuraList();
            break;
        case "2":
            all();
            break;
        case "3":
            showQuery();
            break;
        default:
            filterBy(allFilters[val - 4].data);
    }
}

function showSuraList() {
    $suraList.show();
}

function showQuery() {
    $query.val("");
    $query.show();
}


function initSuraList() {
    var options = '';
    for (var i = 0; i < surat.length; i++) {
        options += '<option value="' + i + '">' + surat[i] + '</option>';
    }
    $suraList.html(options);
}

function all() {
    var rows = [];
    for (var i = 0; i < data.length; i++) {
        var evenodd = i % 2 == 0 ? "even" : "odd";
        rows.push(rowHtml(data[i].text, data[i].aya, data[i].sura, evenodd));
    }
    $rowList.html(rows.join(""));
}

function none() {
    $rowList.empty();
}

function rowHtml(text, aya, sura, evenodd, tooltip) {
    var title = tooltip ? ' data-toggle="tooltip" title="' + tooltip + '"' : '';
    return '<div class="row ' + evenodd + '">' +
        '<div class="col-md-10 aya_text text-right"' + title + '>' + text + '</div>' +
        '<div class="col-md-1 aya_number text-right" >' + aya + '</div>' +
        '<div class="col-md-1 sura_text text-right" suraId="' + sura + '">' + surat[sura] + '</div>' +
        '</div>';
}

function suraSelected() {
    var suraId = parseInt($suraList.val(), 10);
    var suraData = dataBySura[suraId] || [];
    var rows = [];
    for (var i = 0; i < suraData.length; i++) {
        var evenodd = i % 2 == 0 ? "even" : "odd";
        var d = suraData[i];
        rows.push(rowHtml(d.text, d.aya, d.sura, evenodd));
    }
    $rowList.html(rows.join(""));
}

function queryChanged() {
    var q = $query.val();
    if (q && q.length > 2) {
        var rows = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].text.indexOf(q) > -1) {
                var evenodd = i % 2 == 0 ? "even" : "odd";
                rows.push(rowHtml(data[i].text, data[i].aya, data[i].sura, evenodd));
            }
        }
        $rowList.html(rows.join(""));
    } else if (!q || q === '') {
        $rowList.empty();
    }
}

function filterBy(filterList) {
    var rows = [];
    for (var i = 0; i < filterList.length; i++) {
        var x = filterList[i];
        var suraData = dataBySura[x.sura] || [];
        var y;
        for (var j = 0; j < suraData.length; j++) {
            if (suraData[j].aya === x.aya) { y = suraData[j]; break; }
        }
        if (y) {
            var evenodd = i % 2 == 0 ? "even" : "odd";
            rows.push(rowHtml(y.text.substr(x.from, x.to), y.aya, y.sura, evenodd, y.text));
        }
    }
    $rowList.html(rows.join(""));
}



var surat = ["",
    "الفاتحة", "البقرة", "آل عمران", "النساء", "المآئدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس", "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طـه", "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم", "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر", "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق", "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة", "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج", "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس", "التكوير", "الإنفطار", "المطففين", "الإنشقاق", "البرج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد", "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البيِّنة", "الزلزلة", "العاديات", "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر", "المسد", "الإخلاص", "الفلق", "الناس"];

var firstAyat = [1, 1, 8, 294, 494, 670, 790, 955, 1161, 1236, 1365, 1474, 1597, 1708, 1751, 1803, 1902, 2030, 2141, 2251, 2349, 2484, 2596, 2674, 2792, 2856, 2933, 3160, 3253, 3341, 3410, 3470, 3504, 3534, 3607, 3661, 3706, 3789, 3971, 4059, 4134, 4219, 4273, 4326, 4415, 4474, 4511, 4546, 4584, 4613, 4631, 4676, 4736, 4785, 4847, 4902, 4980, 5076, 5105, 5127, 5151, 5164, 5178, 5189, 5200, 5218, 5230, 5242, 5272, 5324, 5376, 5420, 5448, 5476, 5496, 5552, 5592, 5623, 5673, 5713, 5759, 5801, 5830, 5849, 5885, 5910, 5932, 5949, 5968, 5994, 6024, 6044, 6059, 6080, 6091, 6099, 6107, 6126, 6131, 6139, 6147, 6158, 6169, 6177, 6180, 6189, 6194, 6198, 6205, 6208, 6214, 6217, 6222, 6226, 6231];
