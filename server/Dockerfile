FROM python:3.9.11

ENV PYTHONUNBUFFERED 1

RUN mkdir /server
WORKDIR /server
ADD requirements.txt /server/


RUN pip install --upgrade pip\
    && pip install --upgrade setuptools\
    && pip install -r requirements.txt