# Travel App

__Приложение помогает найти интересные места в городе  и составить план их посещения__

Оно решает проблему разрозненности информации об интересных городских местах. 
___
Теперь пользователь может : 
* найти интересующий его город 
* найти места с помощью удобных фильтров 
* ознакомиться с информацией о месте, отзывами 
* добавить место в свой личный кабинет и расположить в порядке посещения 
* отметить уже посещенные места 
* оставить свой отзыв 
* следить за прогрессом посещения всех желаемых мест 

## Запуск

Клиент и сервер:  
```
cd client
npm start 
```
Только сервера: 
```
cd client
npm run dev 
```
Тесты для клиента:
```
cd client
npm test
```
## Стек: 

__Клиент:__ React · Redux Toolkit · Redux Persist · React Router · React Hook Form · Firebase Auth · Framer Motion · Material UI · Axios · SASS 

__Сервер:__ Node JS · Express JS · MongoDB · Multer  

## В планах добавить:
* новые разделы на главную страницу и страницу города (с использованием табов)
* индикацию иконками категорий и подкатегорий 
* раздел "Мои отзывы в профиле пользователя"
