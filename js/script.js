// let d = new Date();
// document.body.innerHTML = "<h1>Today's date is " + d + "</h1>"

var db = openDatabase('userDataBase', '1.0', 'This is a user database', 2 * 1024 * 1024);
var columnsTotal;
var str;
var editstr;
var joinTableValDummy;
if (!db) {
  alert("DataBase not created");
}
else {
  var version = db.version;
  console.log("database created", db.version);
}

// db.transaction(function (tran) {
//   tran.executeSql('CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY,Name, MailID, Gender, Dob)');
  // tran.executeSql('insert into Users (id, Name, MailID, Gender, Dob) values (1, "Siddharth","siddharthsalve@gmail.com","Male","19/06/1997")');
// });
// db.transaction(function (tx) {
//     tx.executeSql('DROP TABLE Users');
//   });
// output();
// function displayTable(transaction, results) {

//   document.getElementById("result").innerHTML = "";

//   var listholder = `<table border=1>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Email</th>
//                                     <th>Gender</th>
//                                     <th>Dob</th>
//                                     <th>Edit</th>
//                                 </tr>`;

//   var i;
//   for (i = 0; i < results.rows.length; i++) {
//     var row = results.rows.item(i);
//     listholder += "<tr><td>" + row.Name + "</td><td>" + row.MailID + "</td><td>" + row.Gender + "</td><td>" + row.Dob + "</td><td>" + "(<a href='javascript:void(0);' onclick='deleterow(" + row.id + ");'>Delete row</a>)" + "</td></tr>";
//   }
//   listholder += "</table>";
//   document.getElementById("result").innerHTML = listholder;
// }

// function output() {
//   if (db) {
//     db.transaction(function (tran) {
//       tran.executeSql("SELECT * FROM Users", [], displayTable);
//     });
//   } else {
//     alert("db not found, your browser does not support web sql!");
//   }
// }

function deleterow(id) {
  if (db) {
    db.transaction(function (tran) {
      tran.executeSql("DELETE FROM Users WHERE id=?", [id], output);
    });
  } else {
    alert("db not found, your browser does not support web sql!");
  }
}

function onSubmit() {
  var gen = "";
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var gender = document.getElementsByName("gender");
  var dob = document.getElementById('dob').value;
  for (i = 0; i < gender.length; i++) {
    if (gender[i].checked) {
      gen = gender[i]
    }
  }
  if (name == "" || email == "" || gen.value == "" || dob == "") {
    alert("please fill form");
    return false;
  } else {
    db.transaction(function (tran) {
      tran.executeSql('insert into Users (Name, MailID, Gender, Dob) values (?, ?, ?, ?)', [name, email, gen.value, dob]);
      output();
    });
    document.getElementById("userform").reset();
    document.getElementById("mylocation").innerHTML = "Data Submitted";
    return true;
  }
}

function deleteRow2(id) {
  if (db) {
    db.transaction(function (tran) {
      tran.executeSql("DELETE FROM Temp WHERE id=?", [id], output2);
    });
  } else {
    alert("db not found, your browser does not support web sql!");
  }
}

function editRow(id) {
  if (db) {
    db.transaction(function (tran) {
      tran.executeSql("select * FROM Temp WHERE id=?", [id], updateForm);
    });
  } else {
    alert("db not found, your browser does not support web sql!");
  }
}
function update() {
  var formElements = document.getElementById('edit').elements;
  var postData = {};
  for (var i = 0; i < formElements.length; i++)
    if (formElements[i].type != "submit")
      postData[formElements[i].name] = formElements[i].value;

  var getcolval = Object.values(postData);
  getcolval.push(+getcolval.shift());
  // console.log(getcolval);
  var tablecol = [];
  for (let i = 0; i < columnsTotal; i++) {
    tablecol.push("field" + i + "=?");
  }
  editstr = tablecol.join(',');
  editstr += " WHERE id=?";
  db.transaction(function (tran) {
    tran.executeSql("UPDATE Temp SET " + editstr, getcolval);
  });
  output2();
}
function updateForm(transaction, results) {
  document.getElementById("container").innerHTML = "";
  var row = results.rows.item(0);
  // console.log("row", row);

  var editForm = `<form id="edit">`;

  for (var key of Object.keys(row)) {
    if (key == "id") {
      editForm += `<input type="text" name="` + key + `" id="row` + key + `" value="` + row[key] + `" class="in-text" readonly><br><br>`;
    } else {
      editForm += `<input type="text" name="` + key + `" id="row` + key + `" value="` + row[key] + `" class="in-text"required><br><br>`;
    }
  }
  editForm += `<input type="submit" value="Submit" class="btn" onclick="update();return false;">&nbsp;<input type="submit" value="Cancel" class="btn" onclick="output2();return false;"></form>`;

  document.getElementById("container").innerHTML = editForm;
}

function displayTable2(transaction, results) {

  document.getElementById("container").innerHTML = "";

  var tHeader = "<table border=1><tr><th>Id</th>";

  for (let i = 0; i < columnsTotal; i++) {
    tHeader += "<th>Column" + i + "</th>";
  }
  tHeader += "<th>edit</th><th>delete</th></tr>";
  var i;
  for (i = 0; i < results.rows.length; i++) {
    var row = results.rows.item(i);

    tHeader += "<tr>";
    for (var key of Object.keys(row)) {
      tHeader += "<td>" + row[key] + "</td>";
    }
    tHeader += "<td>" + "(<a href='javascript:void(0);' onclick='editRow(" + row.id + ");'>edit</a>)" + "</td><td>" + "(<a href='javascript:void(0);' onclick='deleteRow2(" + row.id + ");'>delete</a>)" + "</td></tr>";
  }
  tHeader += "</table><a href='javascript:void(0);' onclick='addNew();'>+Add New</a>";
  document.getElementById("container").innerHTML = tHeader;
}

function output2() {
  if (db) {
    db.transaction(function (tran) {
      tran.executeSql("SELECT * FROM Temp", [], displayTable2);
    });
  } else {
    alert("db not found, your browser does not support web sql!");
  }
}

function createTable() {
  var row = document.getElementById('row').value;
  var col = document.getElementById('col').value;
  if (row == "" || col == "") {
    alert("please fill form");
    return false;
  }

  if (row < 1 || col < 1) {
    alert("negative or 0 value not allowed..!!");
    return;
  }
  columnsTotal = col;
  var tablecol = [];
  var tablevaldummy = []
  for (let i = 0; i < col; i++) {
    tablecol.push("field" + i);
    tablevaldummy.push("?");
  }
  str = tablecol.join(',');
  joinTableValDummy = tablevaldummy.join(",");
  let str1 = 'CREATE TABLE IF NOT EXISTS Temp (id INTEGER PRIMARY KEY,' + str + ')';
  db.transaction(function (tran) {
    tran.executeSql('DROP TABLE Temp');
  });
  db.transaction(function (tran) {
    tran.executeSql(str1);
  });

  document.getElementById("container").innerHTML = "";

  var htmlstr = `<h1>Enter ` + row + ` Record<h1><br><br><form id="dataform">`;
  for (let i = 0; i < row; i++) {
    htmlstr += `<h3>Enter record ` + i + `<br>`;
    for (let j = 0; j < col; j++) {

      htmlstr += `<input type="text" name="` + i + `row` + j + `" id="` + i + `row` + j + `" class="in-text" placeholder="data` + j + `" required><br><br>`;

    }
    htmlstr += "<hr>";
  }
  htmlstr += `<input type="submit" value="Submit" class="btn" onclick="submitData();return false;"></form>`;
  document.getElementById("container").innerHTML = htmlstr;
}

function submitData() {
  var formElements = document.getElementById('dataform').elements;
  var postData = {};
  for (var i = 0; i < formElements.length; i++)
    if (formElements[i].type != "submit")
      postData[formElements[i].name] = formElements[i].value;

  var getcolval = Object.values(postData);
  // console.log(getcolval);
  var chunk;
  while (getcolval.length > 0) {

    chunk = getcolval.splice(0, columnsTotal)
    insertValue(chunk);
  }

  output2();
}

function insertValue(data) {
  db.transaction(function (tran) {
    tran.executeSql('insert into Temp (' + str + ') values (' + joinTableValDummy + ')', data);
  });
}

function addNew() {
  document.getElementById("container").innerHTML = "";

  var htmlstr = `<h1><form id="dataform">`;
    htmlstr += `<h3>Enter new record<br>`;
    var i=0;
    for (let j = 0; j < columnsTotal; j++) {

      htmlstr += `<input type="text" name="` + i + `row` + j + `" id="` + i + `row` + j + `" class="in-text" placeholder="data` + j + `" required><br><br>`;

    }
  htmlstr += `<input type="submit" value="Add" class="btn" onclick="submitData();return false;">&nbsp;<input type="submit" value="Cancel" class="btn" onclick="output2();return false;"></form>`;
  document.getElementById("container").innerHTML = htmlstr;
}