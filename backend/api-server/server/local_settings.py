"""
Django settings for server project at developing environment.
"""

from pathlib import Path
import environ
import os

env = environ.Env()
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')

CORS_ORIGIN_WHITELIST = env.list('CORS_ORIGIN_WHITELIST')

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': env('ENGINE'),
        'NAME': BASE_DIR / env('NAME'),
    }
}

# mail
EMAIL_BACKEND = env('EMAIL_BACKEND')
EMAIL_HOST = env('EMAIL_HOST')
EMAIL_PORT = env('EMAIL_PORT')
EMAIL_HOST_USER = env('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD =env('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS = env('EMAIL_USE_TLS')