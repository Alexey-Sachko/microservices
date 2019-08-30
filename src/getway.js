// импортируем класс Gateway из раннее установленного пакета micromq
const Gateway = require('micromq/gateway');

// создаем экземпляр класса Gateway
const app = new Gateway({
  // названия микросервисов, к которым мы будем обращаться
  microservices: ['users'],
  // настройки rabbitmq
  rabbit: {
    // ссылка для подключения к rabbitmq (default: amqp://guest:guest@localhost:5672)
    url: 'amqp://guest:guest@localhost:5672' //process.env.RABBIT_URL,
  },
});

// создаем два эндпоинта /friends & /status на метод GET
app.get(['/friends', '/status'], async (req, res) => {
  // делегируем запрос в микросервис users
  console.log('request')
  await res.delegate('users');
});

// начинаем слушать порт
app.listen(process.env.PORT);