"use strict";


$(document).ready(function () {
    none(); //default choice
    //filterBy(awamerList);
    $("#filterList").on("change", filterChanged);
    $("#suraList").on("change", suraSelected);
    $("#query").on("change", queryChanged);
    initSuraList();
    $("#suraList").hide();
    $("#query").hide();

    $(".aya_text").mouseup(getSelectionText);

});

function filterChanged() {
    $("#suraList").hide();
    $("#query").hide();
    var val = $("#filterList").val();
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
        case "4":
            filterBy(awamerList);
            break;
        case "5":
            filterBy(hikamList);
            break;
        case "6":
            filterBy(asmaaList);
            break;
        default:
            none();
    }
}

function showSuraList() {
    $("#suraList").show();

}

function showQuery() {
    $("#query").val("");
    $("#query").show();
}


function initSuraList() {
    $("#suraList").empty();
    for (var i = 0; i < surat.length; i++) {//
        $("#suraList").append('<option value="' + i + '">' + surat[i] + '</option');
    }
}

function all() {
    $("#rowList").empty();
    for (var i = 0; i < data.length; i++) {//
        var evenodd = i % 2 == 0 ? "even" : "odd";
        var html = '' +
            '<div class="row ' + evenodd + '">' +
            '<div class="col-md-10 aya_text text-right" >' + data[i].text + '</div>' +
            '<div class="col-md-1 aya_number text-right" >' + data[i].aya + '</div>' +
            '<div class="col-md-1 sura_text text-right" suraId="'+data[i].sura +'">' + surat[data[i].sura]+ '</div>' +
            '</div>';
        $("#rowList").append(html);
    }
    $(".aya_text").mouseup(getSelectionText);
}

function none() {
    $("#rowList").empty();
}

function suraSelected() {
    var id = $("#suraList").val();
    var suraId = parseInt(id);
    $("#rowList").empty();
    for (var i = 0; i < data.length; i++) {//data.length
        if (data[i].sura === suraId) {
            var evenodd = i % 2 == 0 ? "even" : "odd";
            var html = '' +
                '<div class="row ' + evenodd + '">' +
                '<div class="col-md-10 aya_text text-right" >' + data[i].text + '</div>' +
                '<div class="col-md-1 aya_number text-right" >' + data[i].aya + '</div>' +
                '<div class="col-md-1 sura_text text-right" suraId="'+data[i].sura +'">' + surat[data[i].sura] + '</div>' +
                '</div>';
            $("#rowList").append(html);
        }
    }
    $(".aya_text").mouseup(getSelectionText);
}

function queryChanged() {
    var q = $("#query").val();
    if (q && q.length > 3) {
        $("#rowList").empty();
        for (var i = 0; i < data.length; i++) {
            if (data[i].text.indexOf(q)>-1) {
                var evenodd = i % 2 == 0 ? "even" : "odd";
                var html = '' +
                    '<div class="row ' + evenodd + '">' +
                    '<div class="col-md-10 aya_text text-right" >' + data[i].text + '</div>' +
                    '<div class="col-md-1 aya_number text-right" >' + data[i].aya + '</div>' +
                    '<div class="col-md-1 sura_text text-right" suraId="'+data[i].sura +'">' + surat[data[i].sura]+ '</div>' +
                    '</div>';
                $("#rowList").append(html);
            }
        }
    }else if(!q || q===''){
        $("#rowList").empty();
    }

    $(".aya_text").mouseup(getSelectionText);
}

function filterBy(filterList) {
    $("#rowList").empty();
    for (var i = 0; i < filterList.length; i++) {//data.length
        var x = filterList[i];
        var y = _.find(data, {sura: x.sura, aya: x.aya});
        if (y) {
            var evenodd = i % 2 == 0 ? "even" : "odd";
            var html = '' +
                '<div class="row ' + evenodd + '">' +
                '<div class="col-md-10 aya_text text-right" data-toggle="tooltip" title="' + y.text + '" >' + y.text.substr(x.from, x.to) + '</div>' +
                '<div class="col-md-1 aya_number text-right" >' + y.aya + '</div>' +
                '<div class="col-md-1 sura_text text-right" suraId="'+y.sura +'">' +  surat[y.sura] + '</div>' +
                '</div>';
            $("#rowList").append(html);
        }
    }
    $(".aya_text").mouseup(getSelectionText);
}

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }  
 var all = $( this ).text();
var nn = $( this ).next().next().attr("suraId");
var n = $( this ).next().text();
var i = all.indexOf(text);
console.log("{sura:"+nn+", aya:"+n+", from:"+i+",to:"+text.length+"},");
}



var surat = ["",
    "الفاتحة", "البقرة", "آل عمران", "النساء", "المآئدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس", "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طـه", "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم", "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر", "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق", "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة", "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج", "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس", "التكوير", "الإنفطار", "المطففين", "الإنشقاق", "البرج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد", "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البيِّنة", "الزلزلة", "العاديات", "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر", "المسد", "الإخلاص", "الفلق", "الناس"];

var firstAyat = [1, 1, 8, 294, 494, 670, 790, 955, 1161, 1236, 1365, 1474, 1597, 1708, 1751, 1803, 1902, 2030, 2141, 2251, 2349, 2484, 2596, 2674, 2792, 2856, 2933, 3160, 3253, 3341, 3410, 3470, 3504, 3534, 3607, 3661, 3706, 3789, 3971, 4059, 4134, 4219, 4273, 4326, 4415, 4474, 4511, 4546, 4584, 4613, 4631, 4676, 4736, 4785, 4847, 4902, 4980, 5076, 5105, 5127, 5151, 5164, 5178, 5189, 5200, 5218, 5230, 5242, 5272, 5324, 5376, 5420, 5448, 5476, 5496, 5552, 5592, 5623, 5673, 5713, 5759, 5801, 5830, 5849, 5885, 5910, 5932, 5949, 5968, 5994, 6024, 6044, 6059, 6080, 6091, 6099, 6107, 6126, 6131, 6139, 6147, 6158, 6169, 6177, 6180, 6189, 6194, 6198, 6205, 6208, 6214, 6217, 6222, 6226, 6231];
