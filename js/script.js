var db = new SQL.Database();
var container = document.getElementById("container");
var popup = document.getElementById("popup");

var I_ADD_FORM = {
  id: '',
  f_name: '',
  l_name: '',
  address: '',
};

const FORM_NAMES = {
  F_NAME: 'f_name',
  L_NAME: 'l_name',
  ADDRESS: 'address'
}

const QUERY = {
  DROP_TABLE: 'DROP TABLE user;',
  DROP_TABLE_IF_EXIST: 'DROP TABLE IF EXISTS user;',
  CREATE_TABLE: `
  CREATE TABLE user (
                      id INTEGER PRIMARY KEY AUTOINCREMENT, 
                      f_name text, 
                      l_name text, 
                      address text
                    );
  `,
  ALL_RECORD: "SELECT * FROM user;"
}
var ALL_RECORDS = [];
function dataBaseConf() {
  const result = runQuery(QUERY.DROP_TABLE_IF_EXIST);
  if (result) {
    console.log('table drop result', result);
  }

  const result1 = runQuery(QUERY.CREATE_TABLE);
  if (result1) {
    console.log('table create', result);
  }
  return true;
}

function runQuery(query) {
  const result = db.run(query);
  if (result) {
    console.log('query result', result);
    return true;
  } else {
    console.error('Error', result);
    return false;
  }
}

function prepareQuery(query) {
  let resultArry = []
  const result = db.prepare(query);
  while (result.step()) {
    resultArry.push(result.getAsObject());
  }
  return resultArry;
}

function loading() {
  var spinner = `
  <div class="text-center">
              <div class="spinner-border text-primary" style="width: 6rem; height: 6rem;" role="status">
                  <span class="sr-only">Loading...</span>
              </div>
          </div>
  `;
  container.innerHTML = spinner;
}

function addFormTitle(id) {
  if (id) {
    return 'Edit User Detail';
  }
  return 'Add New User Detail';
}

function sucessPopUp(msg) {
  var popupHtml = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Success</strong> ${msg}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `;
  popup.innerHTML = popupHtml;
  setTimeout(() => {
    popup.innerHTML = null;
  }, 3000);
}
function onChange(event) {
  // console.log('onchange', event.target.value);
  if (event.target.id == FORM_NAMES.F_NAME) {
    I_ADD_FORM.f_name = event.target.value;
  } else if (event.target.id == FORM_NAMES.L_NAME) {
    I_ADD_FORM.l_name = event.target.value;
  } else if (event.target.id == FORM_NAMES.ADDRESS) {
    I_ADD_FORM.address = event.target.value;
  }
}
function clearForm() {
  for (let key in I_ADD_FORM) {
    I_ADD_FORM[key] = '';
  }
  return I_ADD_FORM;
}

function addUser() {
  console.log('form', I_ADD_FORM);
  if (I_ADD_FORM.f_name && I_ADD_FORM.l_name && I_ADD_FORM.address) {
    if (I_ADD_FORM.id) {
      const result = runQuery(`UPDATE user
      SET f_name = '${I_ADD_FORM.f_name}',
          l_name = '${I_ADD_FORM.l_name}',
          address = '${I_ADD_FORM.address}'
      WHERE id = ${I_ADD_FORM.id};`);
      if (result) {
        sucessPopUp('User Updated Successfuly..!');
        loading()
        displayTable();
      }
    } else {
      const result = runQuery(`INSERT INTO user VALUES (NULL, '${I_ADD_FORM.f_name}', '${I_ADD_FORM.l_name}', '${I_ADD_FORM.address}');`);
      if (result) {
        sucessPopUp('User Added Successfuly..!');
        loading()
        displayTable();
      }
    }
  } else {
    alert("Fill all fields");
  }
}

function addForm(value) {
  var form = `
        <div class="row p-3 bg-light text-center">
            <h1 class="text-right">
            ${value.id ? '<img src="assets/back.svg" alt="Back" width="35" height="35" title="Back User" onclick="displayTable();return false;">' : ''}
            ${addFormTitle(value.id)}</h1>
        </div>
        <div class="row">
            <div class="col-lg-8 mt-20">
                <div class="form-group">
                    <label for="f_name">First Name</label>
                    <input class="form-control" type=text name="f_name" id="f_name" value="${value.f_name}" onkeyup="onChange(event)"/>
                </div>
                <div class="form-group">
                    <label for="l_name">Last Name</label>
                    <input class="form-control" type=text name="l_name" id="l_name" value="${value.l_name}" onkeyup="onChange(event)"/>
                </div>
                <div class="form-group">
                  <label for="address">Address</label>
                  <textarea class="form-control" id="address" rows="3" onkeyup="onChange(event)">${value.address}</textarea>
                </div>
                <div class="form-group">
                  <input class="btn btn-primary" type="submit" value="Submit" onclick="addUser();return false;">
                </div>
            </div>
        </div>`;
  return form;
}

function displayTable() {
  loading();
  ALL_RECORDS = prepareQuery(QUERY.ALL_RECORD);
  var tableHtml = `
        <div class="row p-3 bg-light text-center">
            <h1 class="text-right">All User Records</h1>
        </div>
        <div class="row">
        <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Address</th>
            <th scope="col">Actions
            ${ALL_RECORDS.length > 0 ? '<img src="assets/download.svg" alt="Download" width="22" height="22" title="Download All" onclick="download(\'multi\');return false;">' : ''}
            </th>
          </tr>
        </thead>
        <tbody>
        `;
  ALL_RECORDS.map(value => {
    tableHtml += `
      <tr>
      <th scope="row">${value.id}</th>
      <td>${value.f_name}</td>
      <td>${value.l_name}</td>
      <td>${value.address}</td>
      <td>
        <img src="assets/edit.svg" alt="Edit" width="25" height="25" title="Edit User" onclick="editUser(${value.id});return false;">
        <img src="assets/trash.svg" alt="Delete" width="25" height="25" title="Delete User" onclick="deleteUser(${value.id});return false;">
        <img src="assets/download.svg" alt="Download" width="25" height="25" title="Download" onclick="download(\'single\', ${value.id});return false;">
      </td>
    </tr>
      `;
  });
  tableHtml += ALL_RECORDS.length < 1 ? '<tr><td colspan="5" class="text-center">No Rocord Found..!</td></tr>' : '';
  tableHtml += `
        </tbody>
      </table>
      </div>
      <div class="row">
        <div class="text-right">
          <button type="button" class="btn btn-info">
          <img src="assets/addUser.svg" alt="Add" width="25" height="25" title="Add User" onclick="addNewUser();return false;">
          </button>
        </div>
      </div>
      `;
  container.innerHTML = tableHtml;

}

function addNewUser() {
  const value = clearForm();
  container.innerHTML = addForm(value);
}

function editUser(id) {
  var result = ALL_RECORDS.filter(x => x.id === id);
  console.log('user to edit', result);
  const value = clearForm();
  I_ADD_FORM = result[0];
  container.innerHTML = addForm(result[0]);
}

function deleteUser(id) {
  console.log('user to delete', id);
  const result = runQuery(`DELETE FROM user WHERE id = ${id};`);
  if (result) {
    sucessPopUp("Record Deleted Successfuly..!");
    displayTable();
  }

}
function download(type, id = null) {
  if (type == 'single') {
    var result = ALL_RECORDS.filter(x => x.id === id);
    PrepareToDownload(result[0].f_name + "_" + result[0].l_name + ".json", result[0]);
  } else {
    PrepareToDownload("All_user.json", ALL_RECORDS);
  }
}

function PrepareToDownload(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(text)));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
  sucessPopUp("Json File Downloaded Successfuly..!");
}

dataBaseConf();
container.innerHTML = addForm(I_ADD_FORM);
