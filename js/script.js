// let d = new Date();
// document.body.innerHTML = "<h1>Today's date is " + d + "</h1>"

var db = openDatabase('userDataBase', '1.0', 'This is a user database', 2 * 1024 * 1024);
if(!db){
    alert("DataBase not created");
}
else{
    var version = db.version;
    console.log("database created",db.version);   
}

db.transaction(function (tran){
    tran.executeSql('CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY,Name, MailID, Gender, Dob)');
    // tran.executeSql('insert into Users (id, Name, MailID, Gender, Dob) values (1, "Siddharth","siddharthsalve@gmail.com","Male","19/06/1997")');
});
// db.transaction(function (tx) {
//     tx.executeSql('DROP TABLE Users');
//   });
output();
function displayTable(transaction,results) {

    document.getElementById("result").innerHTML = "";
  
    var listholder = `<table border=1>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Dob</th>
                                    <th>Edit</th>
                                </tr>`;
  
    var i;
    for (i = 0; i < results.rows.length; i++) {
      var row = results.rows.item(i);
      listholder += "<tr><td>"+row.Name+"</td><td>"+row.MailID+"</td><td>"+row.Gender +"</td><td>"+row.Dob+"</td><td>"+"(<a href='javascript:void(0);' onclick='deleterow(" + row.id + ");'>Delete row</a>)"+"</td></tr>";
    }
    listholder+= "</table>";
    document.getElementById("result").innerHTML = listholder;
  }

  function output() {
    if (db) {
      db.transaction(function(tran) {
        tran.executeSql("SELECT * FROM Users", [], displayTable);
      });
    } else {
      alert("db not found, your browser does not support web sql!");
    }
  }

  function deleterow(id) {
    if (db) {
      db.transaction(function(tran) {
        tran.executeSql("DELETE FROM Users WHERE id=?", [id], output);
      });
    } else {
      alert("db not found, your browser does not support web sql!");
    }
  }
  
function onSubmit(){
    var gen ="";
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var gender = document.getElementsByName("gender");  
    var dob = document.getElementById('dob').value;
    for(i = 0; i < gender.length; i++) { 
        if(gender[i].checked){
             gen = gender[i]
        }       
    } 
    if(name == "" || email == "" || gen.value == "" || dob == ""){
        alert("please fill form");
        return false;
    } else{
        var data = name +","+ email +","+ gen.value +","+ dob;
        db.transaction(function (tran){
            tran.executeSql('insert into Users (Name, MailID, Gender, Dob) values (?, ?, ?, ?)', [name, email, gen.value, dob]);
            output();
        });
        document. getElementById("userform").reset();
        document.getElementById("mylocation").innerHTML="Data Submitted"; 
        return true; 
    }
    //  console.log(name);
    //  console.log(email);
    //  console.log(gen.value);
    //  console.log(dob);
     
}
