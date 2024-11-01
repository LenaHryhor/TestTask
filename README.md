# Завдання

Відобразити табличку у відповідності до макету використовуючи бібліотеку [MUI](https://mui.com/material-ui/all-components/) та заповнити її даними які будуть отримані з АПІ. 

Таблиця складаєтся з визначених стовбчиків значення для яких отримуються з ендпоїнта *operator* та стовбчиків які необхідно вмержити з ендпоїнта *operatorAddon*. Значення для комірки *operatorAddon* взяти з поля *text*.

Плюсом буде реалізація пагінації, фільтрації та сортування.

| #  | Користувач       | Працює          | Дата доєднання       | SMTP     | JBOD     | [fieldName] |
|----|-------------------|-----------------|-----------------------|----------|----------|-------------|
| 1  | `<Avatar/> + name` | `<Checkbox/>`  | 12.06.2007 17:59     | [text]   | [text]   | [text]      |
| 2  | `<Avatar/> + name` | `<Checkbox/>`  | 12.06.2007 17:59     | [text]   | [text]   | [text]      |

## Макет

![operatorsMaket](https://github.com/user-attachments/assets/f21eb87c-221f-419c-bb3a-442bd282b395)

## API:
```
const API_TOKEN = '66a7f07b53c13f22a3d17fb1';
const url = `https://API_TOKEN.mockapi.io/api/:endpoint`;
```

## Типи
```
interface Operator {
	createdAt: string;
	name: string;
	avatar: string;
	isWorking: boolean;
	id: string;
}[]

interface OperatorAddon {
	fieldName: string;
	text: string;
	isChecked: boolean;
	id: string;
}[]
```

## Команди для запуску

### `npm start`

Запускає додаток у режимі розробки. \
Відкрийте [http://localhost:3000](http://localhost:3000) у браузері для перегляду.

Сторінка перезавантажиться після внесення змін у коді. \
У консолі будуть відображені помилки або попередження.

### `npm run build`

Збирає додаток для продакшн у папку `build`. \
Зібраний додаток оптимізований та готовий до розгортання.

Докладніше про розгортання читайте у [deployment](https://facebook.github.io/create-react-app/docs/deployment).

## Learn More

Дізнайтеся більше в документації [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) та документації [React documentation](https://reactjs.org/).
