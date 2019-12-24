// let d = new Date();
// document.body.innerHTML = "<h1>Today's date is " + d + "</h1>"

// var db = openDatabase('userDataBase', '1.0', 'This is a user database', 2 * 1024 * 1024);
var columnsTotal;
var str;
var editstr;
var joinTableValDummy;
// if (!db) {
//   alert("DataBase not created");
// }
// else {
//   var version = db.version;
//   console.log("database created", db.version);
// }

var current_page = 1;
var records_per_page = 2;
var selected = [];
var objJson = [
  { images: "assets/images/img1.jpeg" },
  { images: "assets/images/img2.jpeg" },
  { images: "assets/images/img3.jpeg" },
  { images: "assets/images/img4.jpeg" },
  { images: "assets/images/img5.jpeg" },
  { images: "assets/images/img6.jpeg" },
  { images: "assets/images/img7.jpeg" },
  { images: "assets/images/img8.jpg" },
  { images: "assets/images/img9.jpg" },
  { images: "assets/images/img10.jpg" },
  { images: "assets/images/img11.jpg" },
  { images: "assets/images/img12.jpeg" },
  { images: "assets/images/img13.jpg" },
  { images: "assets/images/img14.jpg" },
  { images: "assets/images/img15.jpg" },
  { images: "assets/images/img16.jpg" },
  { images: "assets/images/img17.jpg" },
  { images: "assets/images/img18.jpg" },
  { images: "assets/images/img19.jpg" },
  { images: "assets/images/img20.jpg" }
]; // Can be obtained from another source, such as your objJson variable

function prevPage() {
  if (current_page > 1) {
    current_page--;
    changePage(current_page);
    document.getElementById("result").innerHTML = "";
  }
}

function nextPage() {
  if (current_page < numPages()) {
    document.getElementById("result").innerHTML = "";
    current_page++;
    changePage(current_page);

  }
}

function changePage(page) {
  var btn_next = document.getElementById("btn_next");
  var btn_prev = document.getElementById("btn_prev");
  var listing_table = document.getElementById("listingTable");
  var page_span = document.getElementById("page");
  document.getElementById("totalPage").innerHTML = numPages();
  // Validate page
  if (page < 1) page = 1;
  if (page > numPages()) page = numPages();

  listing_table.innerHTML = "";

  for (var i = (page - 1) * records_per_page; i < (page * records_per_page); i++) {
    // listing_table.innerHTML += objJson[i].adName + "<br>";
    listing_table.innerHTML += "<img src=" + objJson[i].images + " width=\"400px\" height=\"200px\">" + "<br><br>";

  }
  listing_table.innerHTML += `
    <br><br>
    <form id="mainForm" name="mainForm">
      <table align="center">
        <tr>
            <td class="style10">
            <input id="Radio1"  type="radio" name="rating" onclick="handleClick(this);" value="1"><span>1</span>
            <input id="Radio2" type="radio" name="rating" onclick="handleClick(this);" value="2"><span>2</span>
            <input id="Radio3" type="radio" name="rating" onclick="handleClick(this);" value="3"><span>3</span>
            <input id="Radio4" type="radio" name="rating" onclick="handleClick(this);" value="4"><span>4</span>
            <input id="Radio5" type="radio" name="rating" onclick="handleClick(this);" value="5"><span>5</span>
            <input id="Radio6" type="radio" name="rating" onclick="handleClick(this);" value="6"><span>6</span>
            <input id="Radio7" type="radio" name="rating" onclick="handleClick(this);" value="7"><span>7</span>
            <input id="Radio8" type="radio" name="rating" onclick="handleClick(this);" value="8"><span>8</span>
            <input id="Radio9" type="radio" name="rating" onclick="handleClick(this);" value="9"><span>9</span>
            <input id="Radio10" type="radio" name="rating" onclick="handleClick(this);" value="10"><span>10</span>
        </tr>
      </table>
    </form>
    `
  page_span.innerHTML = page;
  var key = "page" + page;
  if (selected.length > 0) {
    for (let i = 0; i < selected.length; i++) {
      for (const keys in selected[i]) {
        if (keys === key) {
          document.getElementById("Radio" + selected[i][key]).checked = true;
        }
      }
    }
  }

  if (page == 1) {
    btn_prev.style.visibility = "hidden";
  } else {
    btn_prev.style.visibility = "visible";
  }

  if (page == numPages()) {
    btn_next.style.visibility = "hidden";
  } else {
    btn_next.style.visibility = "visible";
  }
}

// document.mainForm.onclick = function(){
//   var radVal = document.mainForm.rating.value;
//   result.innerHTML = 'You selected: '+radVal;
// }

// (function (){
//   var radios = document.getElementsByName('rating');
//   console.log(radios);
//   for(var i = 0; i < radios.length; i++){
//       radios[i].onclick = function(){
//           document.getElementById('result').innerText = this.value;
//       }
//   }
// })();

function handleClick(myRadio) {
  var match = true;
  document.getElementById('result').innerText = 'You selected: ' + myRadio.value;
  var pa = document.getElementById("page");
  var pageVal = pa.textContent;
  var obj = {};
  var key = "page" + pageVal
  obj[key] = myRadio.value;
  if (selected.length > 0) {
    // console.log("kkk",selected[0]["page"+1]);
    for (let i = 0; i < selected.length; i++) {
      for (const keys in selected[i]) {
        if (keys === key) {
          match = false;
          selected[i][key] = myRadio.value;
        }
      }
    }
    if (match) {
      selected.push(obj);
    }
  }
  else {
    selected.push(obj);
  }
}


function getPage() {
  var input = document.getElementById("pageno");
  if (input.value <= numPages()) {
    current_page = input.value;
    changePage(input.value);
  } else {
    alert("Page NOT Found..!");
  }

}
function numPages() {
  return Math.ceil(objJson.length / records_per_page);
}

window.onload = function () {
  var input = document.getElementById("pageno");
  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();

      document.getElementById("go").click();
    }
  });

  changePage(1);
};