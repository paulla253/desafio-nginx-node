# Desafio Nginx Node

O retorno da aplicação node.js para o nginx deverá ser:

Full Cycle Rocks! </br>
Lista de nomes cadastrada no banco de dados.

Gere o docker-compose de uma forma que basta apenas rodarmos: docker-compose up -d que tudo deverá estar funcionando e disponível na porta: 8080.

## Informações extras:

1. No dockerfile no node, está usando a propriedade USER, que evita problemas de segurança, caso a aplicação sofra um attack hacker.

2. Foi utilizado o healthcheck para o node aguardar o banco de dados, em vez do dockerize.

3. Foi criado o volume para o banco de dados, pois não seria criado pastas no diretório e o docker cuidaria desse processo.
