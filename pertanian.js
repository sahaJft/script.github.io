// ==UserScript==
// @name         Script Pertanian
// @namespace    https://lewatkan.yn.lt/
// @version      1.0
// @description  Script untuk membantu daftar SSW Pertanian
// @author       Faizin 
// @run-at       document-start
// @match        https://j6.prometric-jp.com/Reserve/*
// @grant        none
// ==/UserScript==

(window.onload=function(){"use strict";
    // ID dan Password (Bisa dikosongkan)
    var user = "";
    var sandi = "";
  
    // Tanggal lahir (Bisa dikosongkan)
    var Tahun = "";
    var Bulan = "";
    var Tanggal = "";
  
    // Jenis kelamin (isi laki-laki atau perempuan / kosongkan)
    var Gender = "";
  
    // No HP untuk pembayaran
    var noHP = "081721321451";
    var autobayar = "yes"; //yes or no
  
  document.location.href.indexOf("https://j6.prometric-jp.com/Reserve/Login")>-1?(document.querySelector('input[name="id_number"]').value=user,document.querySelector('input[name="password"]').value=sandi,document.querySelector('input[name="captchaCode"]').style.textTransform="uppercase"):document.location.href.indexOf("https://j6.prometric-jp.com/Reserve/Attention")>-1?document.querySelector('input[onclick="agree(\'ExamSelect\')"]').click():document.location.href.indexOf("https://j6.prometric-jp.com/Reserve/Policy")>-1?(document.querySelector('input[name="chkPL"][value="1"]').checked=!0,document.querySelector('input[name="yes"]').click()):document.location.href.indexOf("https://j6.prometric-jp.com/Reserve/ExamSelect")>-1?(document.querySelector('option[value="NC0-I11J"]').selected=!0,document.querySelector('input[name="test"]').click()):document.location.href.indexOf("https://j6.prometric-jp.com/Reserve/Status")>-1?(document.querySelectorAll('select[name="selBYear"] option[value="'+Tahun+'"]').forEach((e=>e.selected=!0)),document.querySelectorAll('select[name="selBMonth"] option[value="'+Bulan+'"]').forEach((e=>e.selected=!0)),document.querySelectorAll('select[name="selBDay"] option[value="'+Tanggal+'"]').forEach((e=>e.selected=!0)),"perempuan"===Gender?document.querySelector('input[name="rdoGender"][value="1"]').checked=!0:"laki-laki"===Gender&&(document.querySelector('input[name="rdoGender"][value="2"]').checked=!0),document.querySelector('input[name="rdoNation"][value="0"]').checked=!0,document.querySelector('option[value="Indonesia"]').selected=!0,document.querySelector('option[value="No"]').selected=!0,document.querySelector('option[value="80 hours (approx. 4 hours a week for 5 months)"]').selected=!0,document.querySelector('option[value="Less than 1 year"]').selected=!0,document.querySelector('option[value="Agree"]').selected=!0,document.querySelector('option[value="I will not take the test in Japan."]').selected=!0):document.location.href.indexOf("https://j6.prometric-jp.com/Reserve/Confirm")>-1&&(document.querySelector('input[name="tel_1"]').value=noHP,"yes"===autobayar&&document.querySelector('input[name="next"]').click());})();window.addEventListener("DOMContentLoaded", (e => {"use strict";
  
    // Auto search (tambah "," untuk memisahkan tgl contoh 12,19,20)
    var Tahun1 = "2024";
    var Bulan1 = "08";
    var Tanggal1 = [27];
    var autosearch = "no"; //yes or no
    var wakturefresh = "1e3"; // 1  =  1 detik
  
  if(document.location.href.indexOf("https://j6.prometric-jp.com/Reserve/Discount")>-1){document.querySelector('input[value="zotapay"]').checked=!0,document.querySelector('input[name="Next"]').click()} else if(document.location.href.indexOf("https://j6.prometric-jp.com/Reserve/SelectPlace")>-1){const e=Tanggal1;e.sort((()=>Math.random()-.5)),document.querySelector('input[name="exam_day_y"]').value=Tahun1,document.querySelector('input[name="exam_day_m"]').value=Bulan1,e.forEach((e=>{document.querySelector('input[name="exam_day_d"]').value=e,document.querySelector('option[value="IDN"]').selected=!0}))}else if(document.location.href.indexOf("https://j6.prometric-jp.com/Reserve/SelectPlace#result")>-1){const e=Tanggal1;e.sort((()=>Math.random()-.5)),document.querySelector('input[name="exam_day_y"]').value=Tahun1,document.querySelector('input[name="exam_day_m"]').value=Bulan1,e.forEach((e=>{document.querySelector('input[name="exam_day_d"]').value=e})),document.querySelector('option[value="IDN"]').selected=!0}"yes"===autosearch&&setTimeout((()=>{document.querySelector('input[name="search"]').click()}),parseInt(wakturefresh));}));