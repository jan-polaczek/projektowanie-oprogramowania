

SECRET_KEY = 'django-insecure-^zwy9$nsafzxmxer+na#cllw#4_itq$7tas1*uvem68*v2vhic'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

ALLOWED_HOSTS = [ "127.0.0.1", "localhost" ]

# NOTE: Zmienić na port na którym będzie aplikacja front-endowa
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8081",
    "http://127.0.0.1:8081",
    "https://localhost:8081",
    "https://127.0.0.1:8081",
]

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'pop_dev_01',
        'USER': 'admin',
        'PASSWORD': 'password123!',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}