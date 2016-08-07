FROM python:3.5.1

RUN apt-get update && apt-get install -y libpq-dev
RUN pip install --upgrade pip


RUN mkdir -p /srv/app
WORKDIR  /srv/app

COPY requirements.txt /srv/app/requirements.txt
RUN pip install -r requirements.txt
COPY . /srv/app

CMD /srv/app/manage.py migrate && /srv/app/manage.py runserver 0.0.0.0:8000