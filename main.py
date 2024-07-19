import asyncio
from prometric_reservation import PrometricReservation

def main():
    reservation = PrometricReservation(id_number="", password="", year="", month="", city="")
    reservation.read_csv("01.csv")
    asyncio.run(reservation.make_reservation())

if __name__ == "__main__":
    main()