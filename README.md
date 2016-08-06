#You need
* docker
* docker-compose

## Build
docker-compose build

docker-compose up -d

## only first time
docker exec -it fitnesstime_postgres_1 psql -U postgres -c "create database fitness_time"

docker exec -it fitnesstime_web_1 ./manage.py createsuperuser
>Username: alfss
>
>Email address: alfss.obsd@gmail.com
>
>Password:
>
>Password (again):
>
>Superuser created successfully.


## directory structure

```
#!python
  ├── FitnessTime
  │   ├── static     # в эту диреторию нужно положить результат сборки сырцов фронта
  │   │   ├── css
  │   │   ├── fonts
  │   │   ├── images
  │   │   └── js
  │   ├── static_dist  # директория с сырцами фронта
  │   │   ├── fonts
  │   │   ├── images
  │   │   ├── js
  │   │   └── less
  │   │       ├── base.less
  │   │       └── login.less
  │   ├── templates
  │   │   ├── app.html  # шаблон страници приложения  <- тут надо подрубать код
  │       └── main.html # шаблон для главной страници
  │   
  ├── templates
  │   ├── imagekit
  │   │   └── admin
      │       └── thumbnail.html  # это  шаблоны админки (тебя не интересует)
      ├── layouts
      │   ├── base.html   # это  базовые шаблоны, от них идет наследование
      │   └── head.html
      └── registration    # это шаблоны для регистрации и входа (изначально не надо трогать)
           ├── login.html
           └── register.html
  
```


# Urls
* http://X.X.X.X:8000/admin # урл чтоб авторизоваться , там можно данные создать
* X.X.X.X:8000/api/v1/workout/ # тут входная точка API
* X.X.X.X:8000/api/v1/workout/ # тут вспомогательная