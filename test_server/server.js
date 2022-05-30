import express from 'express';
import path from 'path';
import fs from 'fs';




export const serv = express();
const PORT = 1007;

serv.use(express.static(path.resolve('.', 'client')));// выбираем статический ресурс по его абсолютному пути
serv.use(express.json());// анализатор тела с входящими json запросами
serv.use(express.urlencoded({extended: true}));// кодируем обьект в формате URL


serv.get('/', (request, response) => {response.sendFile(path.resolve('.', 'client', 'index.html')) //Отправляем ответ серверу в виде html файла
})

serv.listen(PORT, () => {
    console.log("Сервер начал на порту, порт:" + PORT);
})





serv.get('/', (request, response) => {response.sendFile(path.resolve('.', 'client', 'login.html')) //Отправляем ответ серверу в виде html файла
})

serv.post('/form3', (request, response) => {
    const {adr, zag, text} = request.body;
    response.status(200).json(`${adr} ${zag} ${text}`)
    let filename = "./database/messager.json";
    fs.readFile(filename, 'utf8', (err,data) => {
        if (err){console.error(err);
            return;}
        let jsonData = JSON.parse(data);

        let nextId = jsonData.message[jsonData.message.length -1].id+1

        jsonData.message.push({"userid": 1,"adr": adr, "zag": zag, "text": text});
        console.log(jsonData);
        fs.writeFile(filename, JSON.stringify(jsonData), (err) =>{
            if (err) {console.error(err)}
        });
    })
})

serv.post('/form2', (request, response) => {
    const {login, password} = request.body
    response.status(200).json(`${login} ${password}`)
    let filename = "./database/users.json";
    fs.readFile(filename, 'utf8', (err,data) => {
        if (err){console.error(err);
            return;}
        let jsonData = JSON.parse(data);

        let nextId = jsonData.user[jsonData.user.length -1].id+1

        jsonData.user.push({"id": nextId,"username": login, "password": password});
        console.log(jsonData);
        fs.writeFile(filename, JSON.stringify(jsonData), (err) =>{
            if (err) {console.error(err)}
        });
    })
})

serv.post('/form', (request, response) => {
    const {login, password} = request.body
    response.status(200).json(`${login} ${password}`)

    let filename = "./database/users.json";
    const data = JSON.parse(fs.readFileSync(filename,"utf-8"));

    for(let i = 0; i < data.user.length; i++)
    {
        if(login === data.user[i].username && password === data.user[i].password)
        {
            console.log("Пользователь вошел в аккаунт");
        }
        else {console.log("Пользователь не вошел в аккаунт"); return;}
    }



})

