FROM python:3.9.11


RUN mkdir /scripts
WORKDIR /scripts
ADD requirements.txt /scripts/


RUN pip install --upgrade pip\
    && pip install --upgrade setuptools\
    && pip install -r requirements.txt\