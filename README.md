# PROD этап 2: Frontend
Решение для задания второго этапа необходимо разместить в этом репозитории.
Задание находится в директории [task](task/task.md).

### Где писать код?
Внутри директории solution вы можете редактировать предсозданный файл index.html и создавать другие необходимые вам файлы. 

Внимание: если в коммитах с вашим решением будут присутствовать изменения вне директории solution,
то новые результаты прохождения учитываться не будут.

### Как запустить открытые тесты?
Если в вашем репозитории не установлены пакеты (отсутствует папка node_modules), то изначально нужно установить зависимости с помощью команд:

```
npm ci
npx playwright install
```

После этого для запусков тестов можно выполнять следующую команду:

```npm run playwright-test```

Прохождение тестов можно рассмотреть подробнее через UI интерфейс:


```npm run playwright-test:ui```
