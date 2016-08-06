## Install
docker-compose build
docker-compose up -d

#only first time
docker exec -it fitnesstime_postgres_1 psql -U postgres -c "create database fitness_time"
docker exec -it fitnesstime_web_1 ./manage.py createsuperuser
>Username: alfss
>Email address: alfss.obsd@gmail.com
>Password:
>Password (again):
>Superuser created successfully.


pip install -r requirements.txt
./manage.py migrate
brew install nodejs # only on os x
npm install -g bower

python -m smtpd -n -c DebuggingServer localhost:2525
