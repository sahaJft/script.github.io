const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // ID dan Password (Bisa dikosongkan)
  let user = "";
  let sandi = "";

  // Tanggal lahir (Bisa dikosongkan)
  let Tahun = "";
  let Bulan = "";
  let Tanggal = "";

  // Jenis kelamin (isi laki-laki atau perempuan / kosongkan)
  let Gender = "";

  // No HP untuk pembayaran
  let noHP = "081721321451";
  let autobayar = "yes"; //yes or no

  // Login
  await page.goto('https://j6.prometric-jp.com/Reserve/Login');
  await page.fill('input[name="id_number"]', user);
  await page.fill('input[name="password"]', sandi);
  await page.click('input[name="captchaCode"]');
  await page.keyboard.press('Shift+ArrowUp'); // Make the captcha uppercase

  // Attention Page
  await page.goto('https://j6.prometric-jp.com/Reserve/Attention');
  await page.click('input[onclick="agree(\'ExamSelect\')"]');

  // Policy Page
  await page.goto('https://j6.prometric-jp.com/Reserve/Policy');
  await page.check('input[name="chkPL"][value="1"]');
  await page.click('input[name="yes"]');

  // ExamSelect Page
  await page.goto('https://j6.prometric-jp.com/Reserve/ExamSelect');
  await page.selectOption('select[value="F10-E10J"]');
  await page.click('input[name="test"]');

  // Status Page
  await page.goto('https://j6.prometric-jp.com/Reserve/Status');
  await page.selectOption('select[name="selBYear"]', Tahun);
  await page.selectOption('select[name="selBMonth"]', Bulan);
  await page.selectOption('select[name="selBDay"]', Tanggal);

  if (Gender === "perempuan") {
    await page.check('input[name="rdoGender"][value="1"]');
  } else if (Gender === "laki-laki") {
    await page.check('input[name="rdoGender"][value="2"]');
  }

  await page.check('input[name="rdoNation"]');
  await page.selectOption('select[value="Indonesia"]');
  await page.check('input[name="rdoLang"]');
  await page.selectOption('select[value="Indonesian"]');
  await page.check('input[name="chkOccupation"][value="O"]');
  await page.selectOption('select[value="No, I have not been to Japan before"]');
  await page.selectOption('select[value="300 hours (Approx. 20 hours per week for 4 months"]');
  await page.check('input[name="chkCBT"][value="A"]');
  await page.check('input[name="chkTextbook"][value="D"]');
  await page.check('input[name="chkWebSite"][value="A"]');
  await page.selectOption('select[value="A"]');

  // Confirm Page
  await page.goto('https://j6.prometric-jp.com/Reserve/Confirm');
  await page.fill('input[name="tel_1"]', noHP);
  if (autobayar === "yes") {
    await page.click('input[name="next"]');
  }

  // Discount Page
  await page.goto('https://j6.prometric-jp.com/Reserve/Discount');
  await page.check('input[value="zotapay"]');
  await page.click('input[name="Next"]');

  // SelectPlace Page
  await page.goto('https://j6.prometric-jp.com/Reserve/SelectPlace');
  await page.fill('input[name="exam_day_y"]', "2024");
  await page.fill('input[name="exam_day_m"]', "08");

  // Auto search (tambah "," untuk memisahkan tgl contoh 12,19,20)
  let Tahun1 = "2024";
  let Bulan1 = "08";
  let Tanggal1 = [27];
  let autosearch = "no"; //yes or no
  let wakturefresh = "1e3"; // 1  =  1 detik

  