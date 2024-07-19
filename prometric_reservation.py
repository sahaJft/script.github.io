import asyncio
import csv
from playwright.async_api import async_playwright

class PrometricReservation:
    def __init__(self, id_number, password, year, month, city):
        self.id_number = id_number
        self.password = password
        self.year = year
        self.month = month
        self.city = city
        self.dates = []
        self.birth_info = {
            "year": "2004",
            "month": "01",
            "day": "24",
            "gender_index": 1
        }

    def set_dates(self, dates):
        self.dates = dates

    def set_birth_info(self, year, month, day, gender_index):
        self.birth_info = {
            "year": year,
            "month": month,
            "day": day,
            "gender_index": gender_index
        }

    async def login(self, page):
        await page.goto("https://j6.prometric-jp.com/Reserve/Login?CN=JL&LC=EN")
        await page.locator('input[name="id_number"]').fill(self.id_number)
        await page.locator('input[name="password"][type="password"]').fill(self.password)
        await asyncio.sleep(0.3)
        await page.wait_for_selector('input[type="button"][name="button"][id="button"]')

    async def agree_terms(self, page):
        await asyncio.sleep(0.3)
        await page.locator('input[type="checkbox"][name="chkPL"][id="chkPL"]').check()
        await page.locator('input[type="button"][name="yes"]').click()
        await asyncio.sleep(0.3)
        await page.locator('input[type="button"][name="Continue"]').click()
        await asyncio.sleep(0.3)
        await page.locator('input[type="button"][name="Next"]').click()

    async def fill_personal_info(self, page):
        await asyncio.sleep(0.3)
        await page.locator('select[id="select1"][name="exam_no_1"]').select_option("F10-E10J")
        await page.locator('input[type="button"][name="test"][id="test"]').click()
        await self.fill_birth_info(page)
        await page.locator('select[name="selNation"]').select_option("Indonesia")
        await page.locator('select[name="selLang"]').select_option("Indonesian")
        await page.locator('input[type="checkbox"][name="chkOccupation"][value="M"]').check()
        await page.locator('select[name="selTraveling"]').select_option("Other")
        await page.locator('select[name="selStudy"]').select_option("80 hours (Approx. 20 hours per week for 1 months")
        await page.locator('input[type="checkbox"][name="chkCBT"][value="F"]').check()
        await page.locator('input[type="text"][name="txtEduInput"]').fill("")
        await page.locator('input[type="checkbox"][name="chkTextbook"][value="F"]').check()
        await page.locator('input[type="checkbox"][name="chkWebSite"][value="A"]').check()
        await page.locator('select[name="selStatus"]').select_option("I")
        await page.locator('input[type="button"][name="Next"][id="Next"]').click()
        await asyncio.sleep(0.3)
        await page.locator('input[type="button"][name="Next"][id="Next"][value="Next"]').click()

    async def fill_birth_info(self, page):
        await asyncio.sleep(0.3)
        await page.locator('select[name="selBYear"]').select_option(self.birth_info["year"])
        await page.locator('select[name="selBMonth"]').select_option(self.birth_info["month"])
        await page.locator('select[name="selBDay"]').select_option(self.birth_info["day"])
        await page.locator('input[type="radio"][name="rdoGender"]').nth(self.birth_info["gender_index"]).check()

    async def search_date(self, page):
        await asyncio.sleep(0.3)
        await page.locator('input[type="text"][name="exam_day_y"][id="exam_day_y"]').fill(self.year)
        await page.locator('input[type="text"][name="exam_day_m"][id="exam_day_m"]').fill(self.month)
        await page.locator("input[type=text][name=placeName]").fill(self.city)

        while True:
            for tgl in self.dates:
                try:
                    await page.fill('input[type="text"][name="exam_day_d"][id="exam_day_d"]', str(tgl))
                    await asyncio.sleep(0.6)
                    await page.locator('input[type="button"][name="search"]').click()
                    await page.wait_for_load_state('load')
                    await asyncio.sleep(0.5)
                    links = await page.locator('a:has-text(":")').element_handles()
                    if links:
                        await links[0].click()
                        await page.wait_for_load_state('load')
                        await page.locator('input[type="radio"][name="payment"]').first.click()
                        await page.locator('input[type="button"][name="Next"][id="Next"]').click()
                        await page.wait_for_load_state('load')
                        await page.locator('input[name="tel_1"]').fill("08985152024")
                        await page.locator('input[type="button"][name="next"][value="Next"]').click()
                        await page.wait_for_load_state('load')
                        await page.locator('img[alt="OVO"]').click()
                        await page.wait_for_load_state('load')
                        await page.locator('button:has-text("Bayar dengan OVO")').click()
                        await asyncio.sleep(36000000)
                except Exception as e:
                    print(f"Terjadi kesalahan di search_in_tab: {e}")

    async def make_reservation(self):
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=False)
            context = await browser.new_context(viewport={'width': 500, 'height': 700})
            context.set_default_timeout(3600000)
            page = await context.new_page()
            await self.login(page)
            await self.agree_terms(page)
            await self.fill_personal_info(page)
            await self.search_date(page)

    def read_csv(self, file_path):
        with open(file_path, mode='r') as file:
            csv_reader = csv.DictReader(file)
            for row in csv_reader:
                self.id_number = row["id_number"]
                self.password = row["password"]
                self.year = row["year"]
                self.month = row["month"]
                self.city = row["city"]
                self.set_dates(row["dates"].split(','))
                birth_info = row["birth_info"].split(',')
                self.set_birth_info(birth_info[0], birth_info[1], birth_info[2], int(birth_info[3]))

