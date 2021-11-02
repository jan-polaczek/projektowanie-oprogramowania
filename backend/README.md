# Zanim zaczniesz

Pamiętaj uruchomić kontener z bazą danych. Skrypt `run.bat` możesz znaleźć w katalogu docker/pop_postgres_db.


# Setup projektu

Żeby przygotować projekt do uruchomienia należy:

1. Utworzyć venv pythonowy
`python -m venv venv`
(CMD) `call venv\Scripts\activate.bat`
(PowerShell) `.\venv\Scripts\Activate.ps1`

2. Zainstalować zależności
`pip install -r requirements.txt`

3. Wykonać migracje Django
`python manage.py migrate`

4. Stworzyć superusera pod kątem panelu administrator (Opcjonalnie)
`python manage.py createsuperuser`



# Uruchamianie projektu

Należy po prostu wywołać komendę:
`python manage.py runserver`



# URLe:
* Domyślny host: http://127.0.0.1:8000
* Panel administracyjny: /admin
* API Forestry: /api/v1/forestry/<forestry_id>   (GET|PATCH|DELETE)
* API Forestries: /api/v1/forestries/    (GET|POST)