/*
Команды:
SHOW   										- Сортировка по имени. Контакты без номеров не отображаются
dataSHOW									- Сортировка по дате рождения
ADD	Dima 342-56-15,326-68-58				- Создаст контакт если такого нет (Создаст без даты рождения) / Обновит контакт если такой есть  (Без изменения даты рождения)
ADD	Dima 342-56-15,326-68-58 23-12-1892		- Создаст контакт если такого нет (Создаст с даты рождения) / Обновит контакт если такой есть  (С изменением даты рождения)
REMOVE_PHONE 342-56-15						- Удалит номер телефон и выведет уведомление об успехи или провале
*/





let book = [{Name:'Oleg', Number: '343-23-29,345-15-65,345-25-75', Date: '23-12-1971'},
			{Name:'Alex',Number: '345-19-56', Date: '27-10-2001'},
			{Name:'Andrey',Number: '325-13-23', Date: '27-08-2017'},
			{Name:'Petr',Number: '', Date: '26-08-2017'}]

function phoneBook (command) {
	let mass = command.split (' ')
	if (mass[0] === 'ADD') {
		let chet = 0																			// Счетчик, который фиксирует действия
		for (i = 0; i < book.length; i ++){
			if (book[i].Name == mass[1]) {
				book[i].Number = book[i].Number + ','+ mass[2]
				if (mass[3] != undefined ) {									// Можем обновлять как номер + дата, так и только номер
					book[i].Date = mass[3]
					}	
					console.log('Контакт обновлен')	
					chet = chet +1																// Как его можно заменить? Дабы при переборе значений имени контактов и отсутствия совпадений	
			} 																					// программа выполняла обычное действие по добавлению а не обновлению контакта
		}
		if (chet == 0){																			// (приравняли к 0, прогнали имена через цикл, если есть совпдаения = 1, если нет так и осталось 0)
				book.push({'Name':mass[1], 'Number': mass[2], 'Date': mass[3]})					// Почему если брать if (chet =0 ), а не if (chet < 1), он отказывается выполнять это условие? (добавление контактов)
				console.log ('Контакт добавлен')
			}
	} else if (mass[0] === 'SHOW') {											
		for (c = 0; c < book.length; c ++) {
			if (book[c].Number == '') {
				delete book[c]
			}
			if (book[c].Number == undefined) {
				delete book[c]
			}
		}
		book.sort(sort)											// Сортировка по имени
		function sort(a,b) {
			if (a.Name > b.Name) {
				return 1 }
				else if (a.Name < b.Name) {
					return -1 } else {
						return 0 }
		}

		console.log(book);
	} 
	else if (mass[0] === 'dataSHOW') {							// dataSHOW - если нужна сортировка по дате рождения
		for (i = 0; i < book.length; i++) {						// Перевод текста в формат даты воспринимаемой JS
			if (book[i].Date == undefined){
				book[i].Date = false
			}
			if (book[i].Date) {
				let rDate = book[i].Date.split('-')
				rDate.reverse()
				book[i].Date = rDate.join('-')
				let newDate = Date.parse(book[i].Date)
			}
		}
		book.sort(sort)											// Сортировка именно по ФОРМАТ ДАТы
				function sort(a,b) {
					if (a.Date > b.Date) {
						return 1 }
						else if (a.Date < b.Date) {
							return -1 } else {
								return 0 }
				}
		for (i = 0; i < book.length; i++) {						// Если нам важен прежний формат дата, то этот for нужен, если нет, можно убрать
			if (book[i].Date) {
				let rDate = book[i].Date.split('-')
				rDate.reverse()
				book[i].Date = rDate.join('-')
			}
		}
		console.log(book);
	} else if (mass[0] === 'REMOVE_PHONE') {
		let chet = 0
		for (z = 0; z < book.length; z ++) {
			let str = book[z].Number.split(',')
			for (x = 0; x < str.length; x ++){
				if (str[x] == mass[1]) {
					delete str[x]
					delete book[z].Number	
					
					str.sort(sort)
					function sort(a,b) {
						if (a > b) {
							return 1 }
							else if (a < b) {
								return -1 } else {
									return 0 }
					}
					str.pop()
					let text = str.join(',')
					book[z].Number = text
					console.log('Номер успешно удален')
					chet = chet +1
					return
				} 

			}

		}
			if (chet < 1){
				console.log('Номер не существует')
			}	

	} else {
		console.log('Команда введена неверно')
	}
}

console.log('Телефонная книга до изменений:')
console.log('')
console.log(book)
console.log('')
console.log('')
phoneBook ('ADD Pet2r 343-42-82')
phoneBook ('ADD Marta')
console.log('')
console.log('')

console.log('Результат с применением изменений:')
console.log('')
phoneBook ('SHOW')




// 'ewerwer','','21314124'