const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

app.get("/", async (req, res) => {
  const connection = mysql.createConnection(config);

  connection.connect(function (err) {
    if (err) {
      console.log(`connectionRequest Failed ${err.stack}`);
    } else {
      console.log(`DB connectionRequest Successful ${connection.threadId}`);
    }
  });

  await insertRegister(connection);

  const results = await getAll(connection);

  const table = createTable(results);

  res.send("<h1>Full Cycle Rocks b!</h1>" + table);

  connection.end();
});

async function insertRegister(connection) {
  const sql = `INSERT INTO people(name) values('Ana')`;

  connection.query(sql, (err) => {
    if (err instanceof Error) {
      console.log(err);
      return;
    }
  });
}

async function getAll(connection) {
  const SELECT_QUERY = `SELECT id, name FROM people;`;

  return new Promise((resolve, reject) => {
    connection.query(SELECT_QUERY, (err, results) => {
      if (err) {
        console.error("Erro ao executar a consulta:", err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function createTable(results) {
  if (!results) return "";

  const tableRows = results
    .map(
      (person) => `
    <tr>
      <td>${person.id}</td>
      <td>${person.name}</td>
    </tr> `
    )
    .join("");
  const table = `
  <table>
    <tr>
      <th>#</th>
      <th>Name</th>
    </tr>
    ${tableRows}
  </table>`;

  return table;
}

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
