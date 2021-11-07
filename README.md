# autodata
Config:
1. MongoDb has netwerk access to everyone
2. all configuration parameters are shown in config file

Instruction to API
1. Метод получения списка объявлений

Get All: GET http://localhost:5000/api/v1/promos

Get All with pagination(page=1 default):  GET http://localhost:5000/api/v1/promos?page=2

Get ALL with select, sort(sorting default is createAt): GET http://localhost:5000/api/v1/promos?select=name&sort=price

2. Метод получения конкретного объявления

Get Single: GET http://localhost:5000/api/v1/promos/5d713995b721c3bb38c1f5d0

Get Single with fields param: GET http://localhost:5000/api/v1/promos/5d713995b721c3bb38c1f5d0/fields

3. Метод создания объявления:

Create One: POST http://localhost:5000/api/v1/promos
