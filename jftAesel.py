import asyncio
from playwright.async_api import async_playwright
try:
    async def main():
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=False)
            context = await browser.new_context(viewport={'width': 500, 'height': 700})
            context.set_default_timeout(3600000)
            page = await context.new_page()

            # ID dan Password (Bisa dikosongkan)
            user = "JP0929948"
            sandi = "872C00"

            # Tanggal lahir (Bisa dikosongkan)
            Tahun = "2002"
            Bulan = "03"
            Tanggal = "26"

            # Jenis kelamin (isi laki-laki atau perempuan / kosongkan)
            Gender = "perempuan"

            # No HP untuk pembayaran
            noHP = "08985152070"
            autobayar = "yes"  # yes or no

            # Auto search (tambah "," untuk memisahkan tgl contoh 12,19,20)
            Tahun1 = "2024"
            Bulan1 = "08"
            Tanggal1 = [1,2,5,6,7,8]
            autosearch = "yes"  # yes or no
            wakturefresh = 1  # 1 detik

            # Navigasi ke halaman login
            await page.goto("https://j6.prometric-jp.com/Reserve/Login?CN=JL&LC=EN")
            await page.fill('input[name="id_number"]', user)
            await page.fill('input[name="password"][type="password"]', sandi)
            await page.evaluate("document.querySelector('input[name=\"captchaCode\"]').style.textTransform = 'uppercase'")
            await page.wait_for_selector('input[type="button"][name="button"][id="button"]')
            # await page.click('input[type="button"][name="button"][id="button"]')

            # Cek setiap langkah dan lakukan tindakan yang sesuai
            urls = [
                "https://j6.prometric-jp.com/Reserve/Attention",
                "https://j6.prometric-jp.com/Reserve/Policy",
                "https://j6.prometric-jp.com/Reserve/ExamSelect",
                "https://j6.prometric-jp.com/Reserve/Status",
                "https://j6.prometric-jp.com/Reserve/Confirm",
                "https://j6.prometric-jp.com/Reserve/Discount",
                "https://j6.prometric-jp.com/Reserve/SelectPlace",
                "https://j6.prometric-jp.com/Reserve/SelectPlace#result"
            ]

            for url in urls:
                current_url = page.url
                if current_url == url:
                    if url == urls[0]:
                        await page.click('input[onclick="agree(\'ExamSelect\')"]')
                    elif url == urls[1]:
                        await asyncio.sleep(0.3)
                        await page.locator('input[type="checkbox"][name="chkPL"][id="chkPL"]').check()
                        await page.locator('input[type="button"][name="yes"]').click()
                        await asyncio.sleep(0.3)
                        await page.locator('input[type="button"][name="Continue"]').click()
                        await asyncio.sleep(0.3)
                        await page.locator('input[type="button"][name="Next"]').click()
                    elif url == urls[2]:
                        await asyncio.sleep(0.3)
                        await page.locator('select[id="select1"][name="exam_no_1"]').select_option("F10-E10J")
                        await page.locator('input[type="button"][name="test"][id="test"]').click()
                    elif url == urls[3]:
                        await page.select_option('select[name="selBYear"]', Tahun)
                        await page.select_option('select[name="selBMonth"]', Bulan)
                        await page.select_option('select[name="selBDay"]', Tanggal)
                        if Gender == "perempuan":
                            await page.check('input[name="rdoGender"][value="1"]')
                        elif Gender == "laki-laki":
                            await page.check('input[name="rdoGender"][value="2"]')
                        await page.check('input[name="rdoNation"]')
                        await page.select_option('select[name="rdoNation"]', 'Indonesia')
                        await page.check('input[name="rdoLang"]')
                        await page.select_option('select[name="rdoLang"]', 'Indonesian')
                        await page.check('input[name="chkOccupation"][value="O"]')
                        await page.select_option('select[name="visitJapan"]', 'No, I have not been to Japan before')
                        await page.select_option('select[name="studyHours"]', '300 hours (Approx. 20 hours per week for 4 months')
                        await page.check('input[name="chkCBT"][value="A"]')
                        await page.check('input[name="chkTextbook"][value="D"]')
                        await page.check('input[name="chkWebSite"][value="A"]')
                        await page.select_option('select[name="prefStudyLang"]', 'A')
                    elif url == urls[4]:
                        await page.fill('input[name="tel_1"]', noHP)
                        if autobayar == "yes":
                            await page.click('input[name="next"]')
                    elif url == urls[5]:
                        await page.check('input[value="zotapay"]')
                        await page.click('input[name="Next"]')
                    elif url == urls[6]:
                        await page.fill('input[name="exam_day_y"]', Tahun1)
                        await page.fill('input[name="exam_day_m"]', Bulan1)
                        for tgl in Tanggal1:
                            await page.fill('input[name="exam_day_d"]', str(tgl))
                            await page.select_option('select[name="country"]', 'IDN')
                    elif url == urls[7]:
                        await page.fill('input[name="exam_day_y"]', Tahun1)
                        await page.fill('input[name="exam_day_m"]', Bulan1)
                        for tgl in Tanggal1:
                            await page.fill('input[name="exam_day_d"]', str(tgl))
                        await page.select_option('select[name="country"]', 'IDN')
                        if autosearch == "yes":
                            await asyncio.sleep(wakturefresh)
                            await page.click('input[name="search"]')
                    await asyncio.sleep(2)  # Beri jeda untuk setiap tindakan
                else:
                    break
except Exception as e:
    print(f"Terjadi kesalahan di search_in_tab: {e}")

        # browser.close()

if __name__ == "__main__":
    asyncio.run(main())