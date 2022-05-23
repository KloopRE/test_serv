import express from 'express';
import path from 'path';

export const serv = express();
const PORT = 1007;

serv.use(express.static(path.resolve('..', 'client')));// выбираем статический ресурс по его абсолютному пути
serv.use(express.json());// анализатор тела с входящими json запросами
serv.use(express.urlencoded({extended: true}));// кодируем обьект в формате URL


serv.get('/', (request, response) => {response.sendFile(path.resolve('..', 'client', 'index.html')) //Отправляем ответ серверу в виде html файла
})

serv.listen(PORT, () => {
    console.log("Сервер начал напоботу, порт:" + PORT);
})

serv.get('/', (request, response) => {response.sendFile(path.resolve('..', 'client', 'login.html')) //Отправляем ответ серверу в виде html файла
})
serv.post('/form', (request, response) => {
    const {login, password} = request.body
    response.status(200).json(`${login} ${password}`)
})