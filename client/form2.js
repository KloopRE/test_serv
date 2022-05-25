

const form_handle = async (event) => {  //Создаем ассинхронный callback, чтобы при событии 'submit' страница не перезагружалась
		event.preventDefault() // Если событие не обрабатывается явно, то оно не должно вести себя обычно
		const request = await fetch('/form2', { // создаем fetch обьект, которыйы может отправлять сетевые запросы на сервер и подгружать инфу.
			// в него передаем URL формы
			method: 'POST', // Метод 'отправить'
			headers: { //Заголовки, чтобы сервер понимал тип обрабатываемой информации
				'Content-Type': 'application/json', //Информация контента json
				'Accept': 'application/json', //Принающая инфа. json
			},

			body: JSON.stringify(Object.fromEntries((new FormData(event.target)).entries()))
			// event.target - наша форма из обьекта fetch, c помощью конструктора new FormData мы считываем с нашей форма данные
			// т.е. происходит отправка формы. // преобразуем форму в обьект данных с помощью fromEntries и возвращаем массив
			// перечисляемых пар свойств c помощью entries. Преобразуем массив в json формат с помощью stringify
		});
		const response = await request.json(); // Ждем ответ от запроса
		if (!request.ok) {
			alert(response.errors); // если его нет, то ошибка
		} else {
			alert("Вы успешно вошли в свой зарегистрировались.");
			// alert("Вы успешно вошли в свой аккаунт.")
		}
	}


	document.querySelector('form').addEventListener('submit', form_handle); // В документе выбираем обьект "форма", добавляем слушателя событий, события
// 'submit' каллбек 'form_handle'


