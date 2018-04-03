let users = [{firstName: 'Petr', LastName: 'Grach', createdAt: '1422383849000', tasks: ['task1','task2','task3']}] 
let task = []

/* 
Регистрация нового пользователя
Добавление даты регистрации
*/

function addUser(firstName, LastName){                      
    let flag = false;
    users.forEach((find) => {
       if (find.firstName === firstName && find.LastName === LastName) {
           flag = true
            console.log(`Пользователь с именем ${firstName} ${LastName} уже существует`)
            return
       } 
   })
   if (!flag){
       let time = Date.parse(new Date)
       users.push({
           firstName,
           LastName,
           createdAt: time,
           tasks: []
       })
       console.log(`Пользователь ${firstName} ${LastName} зарегистрирован`)
   }
}

/* 
Добавление задачи
Проверяте наличие создающего пользователя в системе
Указывается ответственный за задачу:
    - поиск ответственного в системе (новый или автор задачи)
    - пользователю присваивается имя задачи в прафиле
Вывод подтверждения или указание, где совершена ошибка
*/

function addTask (from, title, description, deadline, responsible){     
    let flagFrom = 0, flagResp = 0, name = from.split(' ')
    users.forEach((find) => {
        if (find.firstName === name[0] && find.LastName === name[1]) {  
            flagFrom = 1
            let time = Date.parse(new Date) 
            let title20 = title.substring(0, 20)
            let description200 = description.substring(0, 200)
            if (responsible == undefined || responsible == false){
                responsible = from
            }
            let resp = responsible.split(' ')
            users.forEach((workMan) => {
                if (workMan.firstName === resp[0] && workMan.LastName === resp[1]) {
                    if (workMan.tasks == false){
                        workMan.tasks = [title]
                    } else {
                        workMan.tasks = workMan.tasks.concat(title)
                    }
                    task.push({
                        author: from,
                        title: title20,
                        description: description200,
                        deadline: undefined,
                        responsible,
                        createdAt: time,
                        status: 'Wait'
                    })
                    flagResp = 1
                    console.log(`Задача: "${title20}" добавлена`)
                }
            })
            if (flagFrom == 1 && flagResp == 0){
                console.log(`Исполнитель ${resp[0]} ${resp[1]} НЕ зарегистрирован`)
            }
        } 
    })
    if (flagFrom == 0 && flagResp == 0){
        console.log(`Автор ${name[0]} ${name[1]} НЕ зарегистрирован`)
    }
}

/*
Изменение ответственного за задачу.
Ищет такого человека
Ищет такую задачу
Удаляет запись о задаче у прежнего ответственного
    -поиск старого ответственного
    -поиск такой задачи и ее удаление
Вывод сообщений об ошибке
*/

function setResponsible(title, responsible) {                      
    let flag1 = false, flag2 = false, name = responsible.split(' ')
    users.forEach((findName) => {           
        if (findName.firstName === name[0] && findName.LastName === name[1]) {  
            flag1 = true
            task.forEach((findTask) => {
                if (findTask.title === title) {
                    flag2 = true
                    let oldMan = findTask.responsible.split(' ')
                    users.forEach((oldResp) => {
                        if (oldResp.firstName === oldMan[0] && oldResp.LastName === oldMan[1]){
                            for (i = 0; i < oldResp.tasks.length; i ++){
                                if (oldResp.tasks[i] === title) {
                                    delete oldResp.tasks[i]
                                    oldResp.tasks.sort()
                                    oldResp.tasks.pop()
                                }
                            }
                        }
                    })
                    findTask.responsible = responsible
                    if (findName.tasks == false){
                        findName.tasks = [title]
                    } else {
                        findName.tasks = findName.tasks.concat(title)
                    }
                    console.log(`Отвественный за задачу: "${title}" изменен на: ${responsible}`)
                } 
            })
            if (flag1 && !flag2){
                console.log(`Задача: "${title}" отсутствует`)
            }
        }
    })
    if (!flag1){
        console.log(`Пользователь ${responsible} не зарегистрирован в системе`)
    }
}

/*
Изменение дедлайна задачи
Проверка наличия такой задачи
*/

function setDeadline(title, deadline){                 
    let flag = false
    task.forEach((find) => {
        if (find.title === title) {
            find.deadline = deadline
            flag = true
            console.log(`Дедлайн задачи: "${title}" изменен на ${deadline}`)
        } 
    })
    if (!flag) {
        console.log(`Задача: "${title}" не найдена`)
    }
}

/*
Изменение статуса задачи
Проверка наличия такой задачи
*/

function setStatus(title, status){                 
    let flag = false
    task.forEach((find) => {
        if (find.title === title) {
            find.status = status
            flag = true
            console.log(`Статус задачи: "${title}" изменен на ${status}`)
        } 
    })
    if (!flag) {
        console.log(`Задача: "${title}" не найдена`)
    }
}

/*
Демонстрация всех пользователей по определенным параметрам
*/

function showUsers(){
    let newUser = users.map((parametr) => {
        let nData = new Date()
        nData.setTime(parametr.createdAt)
        let rDate = `${nData.getDate()}-${nData.getMonth()}-${nData.getFullYear()}`
        let qTasks = parametr.tasks.length
        // return `${parametr.firstName} ${parametr.LastName}; registration: ${rDate}; task: ${qTasks}` 
        return ({
            title: parametr.firstName + ' ' +parametr.LastName,
            registration: rDate,
            task: qTasks
        })
    })
    console.log(newUser)

}

/*
Демонстрация всех задач 
    - по статусу
    - в нужном виде
*/

// function showTasks(status) {
//     if (status){                                            
//         let newTask2 = task.filter(            
//             function (parametr) {
//                 return  parametr.status === status
//             })
//         let newTask1 = newTask2.map((parametr) => {
//             return `title: ${parametr.title}; description: ${parametr.description}; status: ${parametr.status}; deadline: ${parametr.deadline}; responsible: ${parametr.responsible}`
//         })
//         console.log(newTask1)
//     } else {
//         let newTask1 = task.map((parametr) => {
//             return `title: ${parametr.title}; description: ${parametr.description}; status: ${parametr.status}; deadline: ${parametr.deadline}; responsible: ${parametr.responsible}`
//         })
//         console.log(newTask1)
//     }
// }


function showTasks(status) {
    let newTask1 = task.map((parametr) => {
       return ({
            title: parametr.title,
            description: parametr.description,
            status: parametr.status,
            deadline: parametr.deadline,
            responsible: parametr.responsible
        })
    })  
    if (!status) {
        console.log(newTask1)
    } else {
        let newTask2 = newTask1.filter(            
        function (parametr) {
        return  parametr.status === status
        })
        console.log(newTask2)
    }
}



console.log('')
addUser('Oleg', 'Nikitin')
console.log('')
addUser('Ivan', 'Shishkin')
console.log('')
addUser('Nikita', 'Vorobev')
console.log('')
addUser('Andrey', 'Andreev')
console.log('')
addUser('Ivan', 'Shishkin')                                 // Дубликат
console.log('')
addTask('Oleg Nikitin', 'Поздравить с 8 марта', 'Позвонить всем', '08-03-2019', '')         // Без указания кому выдается задача
console.log('')
addTask('Nikita Vorobev', 'Заказать пиццу', 'Заказать пиццу с сыром', '28-04-2018')         // Без указания кому выдается задача
console.log('')
addTask('Ivan### Shishkin', 'Помыть посуду', 'С мыслом', '20-08-2018', 'Nikita Vorobev')    // Ошибочный пользователь
console.log('')
addTask('Ivan Shishkin', 'Помыть посуду', 'С мыслом', '20-08-2018', 'Nikita Vorobev')
console.log('')
addTask('Petr Grach', 'Купить мозги', 'НАДО!!!!!', '30-03-2018', 'Andrey Andreev')
console.log('')
setResponsible('Поздрави2ть с 8 марта', 'Andrey Andreev')           // Ошибка в имени задачи
console.log('')
setResponsible('Поздравить с 8 марта', 'And2rey Andreev')        // Ошибочный пользователь
console.log('')
setResponsible('Поздрави2ть с 8 марта', '2Andrey Andreev')          //Везде ошибка
console.log('')
setResponsible('Заказать пиццу', 'Andrey Andreev')
console.log('')
setDeadline('Поздравить с 9 марта', '07-03-2019')               // Ошибка в имени задачи
console.log('')
setDeadline('Поздравить с 8 марта', '07-03-2019')  
console.log('')
setStatus('Помыть посуду', 'In Progress')
console.log('')
setStatus('Заказать пиццу', 'Done')
console.log('')
showUsers()
console.log('')
showTasks()
console.log('')
showTasks('Wait')
console.log(users)
console.log('')
console.log('')
console.log(task)


