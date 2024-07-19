// ==UserScript==
// @name         Script JFT
// @namespace    https://lewatkan.yn.lt/
// @version      1.0
// @description  Script untuk membantu daftar JFT
// @author       Faizin 
// @run-at       document-start
// @match        https://j6.prometric-jp.com/Reserve/*
// @grant        none
// ==/UserScript==

(window.onload = function() {
    "use strict";
  
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
  
    if (document.location.href.indexOf("https://j6.prometric-jp.com/Reserve/Login") > -1) {
      document.querySelector('input[name="id_number"]').value = user;
      document.querySelector('input[name="password"]').value = sandi;
      document.querySelector('input[name="captchaCode"]').style.textTransform = "uppercase";
    } else if (document.location.href.indexOf("https://j6.prometric-jp.com/Reserve/Attention") > -1) {
      document.querySelector('input[onclick="agree(\'ExamSelect\')"]').click();
    } else if (document.location.href.indexOf("https://j6.prometric-jp.com/Reserve/Policy") > -1) {
      document.querySelector('input[name="chkPL"][value="1"]').checked = true;
      document.querySelector('input[name="yes"]').click();
    } else if (document.location.href.indexOf("https://j6.prometric-jp.com/Reserve/ExamSelect") > -1) {
      document.querySelector('option[value="F10-E10J"]').selected = true;
      document.querySelector('input[name="test"]').click();
    } else if (document.location.href.indexOf("https://j6.prometric-jp.com/Reserve/Status") > -1) {
      document.querySelectorAll('select[name="selBYear"] option[value="' + Tahun + '"]').forEach(e => e.selected = true);
      document.querySelectorAll('select[name="selBMonth"] option[value="' + Bulan + '"]').forEach(e => e.selected = true);
      document.querySelectorAll('select[name="selBDay"] option[value="' + Tanggal + '"]').forEach(e => e.selected = true);
  
      if (Gender === "perempuan") {
        document.querySelector('input[name="rdoGender"][value="1"]').checked = true;
      } else if (Gender === "laki-laki") {
        document.querySelector('input[name="rdoGender"][value="2"]').checked = true;
      }
  
      document.querySelector('input[name="rdoNation"]').checked = true;
      document.querySelector('option[value="Indonesia"]').selected = true;
      document.querySelector('input[name="rdoLang"]').checked = true;
      document.querySelector('option[value="Indonesian"]').selected = true;
      document.querySelector('input[name="chkOccupation"][value="O"]').checked = true;
      document.querySelector('option[value="No, I have not been to Japan before"]').selected = true;
      document.querySelector('option[value="300 hours (Approx. 20 hours per week for 4 months"]').selected = true;
      document.querySelector('input[name="chkCBT"][value="A"]').checked = true;
      document.querySelector('input[name="chkTextbook"][value="D"]').checked = true;
      document.querySelector('input[name="chkWebSite"][value="A"]').checked = true;
      document.querySelector('option[value="A"]').selected = true;
    } else if (document.location.href.indexOf("https://j6.prometric-jp.com/Reserve/Confirm") > -1) {
      document.querySelector('input[name="tel_1"]').value = noHP;
      if (autobayar === "yes") {
        document.querySelector('input[name="next"]').click();
      }
    }
  })();
  
  window.addEventListener("DOMContentLoaded", (e) => {
    "use strict";
  
    // Auto search (tambah "," untuk memisahkan tgl contoh 12,19,20)
    var Tahun1 = "2024";
    var Bulan1 = "08";
    var Tanggal1 = [27];
    var autosearch = "no"; //yes or no
    var wakturefresh = "1e3"; // 1  =  1 detik
  
    if (document.location.href.indexOf("https://j6.prometric-jp.com/Reserve/Discount") > -1) {
      document.querySelector('input[value="zotapay"]').checked = true;
      document.querySelector('input[name="Next"]').click();
    } else if (document.location.href.indexOf("https://j6.prometric-jp.com/Reserve/SelectPlace") > -1) {
      const e = Tanggal1;
      e.sort(() => Math.random() - 0.5);
      document.querySelector('input[name="exam_day_y"]').value = Tahun1;
      document.querySelector('input[name="exam_day_m"]').value = Bulan1;
      e.forEach((e) => {
        document.querySelector('input[name="exam_day_d"]').value = e;
        document.querySelector('option[value="IDN"]').selected = true;
      });
    } else if (document.location.href.indexOf("https://j6.prometric-jp.com/Reserve/SelectPlace#result") > -1) {
      const e = Tanggal1;
      e.sort(() => Math.random() - 0.5);
      document.querySelector('input[name="exam_day_y"]').value = Tahun1;
      document.querySelector('input[name="exam_day_m"]').value = Bulan1;
      e.forEach((e) => {
        document.querySelector('input[name="exam_day_d"]').value = e;
      });
      document.querySelector('option[value="IDN"]').selected = true;
    }
  
    if (autosearch === "yes") {
      setTimeout(() => {
        document.querySelector('input[name="search"]').click();
      }, parseInt(wakturefresh));
    }
  });