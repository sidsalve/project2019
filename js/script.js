// let d = new Date();
// document.body.innerHTML = "<h1>Today's date is " + d + "</h1>"
var db = openDatabase('postDb', '1.0', 'This is a user database', 100 * 1024 * 1024);
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

db.transaction(function (tran) {
  tran.executeSql('CREATE TABLE IF NOT EXISTS images (imageId INTEGER PRIMARY KEY,imageFileName)');
  tran.executeSql('insert into images (imageId, imageFileName) values (1, "assets/images/img1.jpeg")');
  tran.executeSql('insert into images (imageId, imageFileName) values (2, "assets/images/img2.jpeg")');
  tran.executeSql('insert into images (imageId, imageFileName) values (3, "assets/images/img3.jpeg")');
  tran.executeSql('insert into images (imageId, imageFileName) values (4, "assets/images/img4.jpeg")');
  tran.executeSql('insert into images (imageId, imageFileName) values (5, "assets/images/img5.jpeg")');
  tran.executeSql('insert into images (imageId, imageFileName) values (6, "assets/images/img6.jpeg")');
  tran.executeSql('insert into images (imageId, imageFileName) values (7, "assets/images/img7.jpeg")');
  tran.executeSql('insert into images (imageId, imageFileName) values (8, "assets/images/img8.jpg")');
  tran.executeSql('insert into images (imageId, imageFileName) values (9, "assets/images/img9.jpg")');
  tran.executeSql('insert into images (imageId, imageFileName) values (10, "assets/images/img10.jpg")');
  tran.executeSql('insert into images (imageId, imageFileName) values (11, "assets/images/img11.jpg")');
  tran.executeSql('insert into images (imageId, imageFileName) values (12, "assets/images/img12.jpeg")');
  tran.executeSql('insert into images (imageId, imageFileName) values (13, "assets/images/img13.jpg")');
  tran.executeSql('insert into images (imageId, imageFileName) values (14, "assets/images/img14.jpg")');
  tran.executeSql('insert into images (imageId, imageFileName) values (15, "assets/images/img15.jpg")');
  tran.executeSql('insert into images (imageId, imageFileName) values (16, "assets/images/img16.jpg")');
  tran.executeSql('insert into images (imageId, imageFileName) values (17, "assets/images/img17.jpg")');
  tran.executeSql('insert into images (imageId, imageFileName) values (18, "assets/images/img18.jpg")');
  tran.executeSql('insert into images (imageId, imageFileName) values (19, "assets/images/img19.jpg")');
  tran.executeSql('insert into images (imageId, imageFileName) values (20, "assets/images/img20.jpg")');

});

db.transaction(function (tran) {
  tran.executeSql('CREATE TABLE IF NOT EXISTS posts (postId INTEGER PRIMARY KEY,postDescriptionShort, postDescriptionLong, postImageId, FOREIGN KEY (postImageId) REFERENCES images(imageId))');
  tran.executeSql('insert into posts (postId, postDescriptionShort, postDescriptionLong, postImageId) values (1, "image of nature 1","Nature in the broadest sense is the natural 1",1)');
  tran.executeSql('insert into posts (postId, postDescriptionShort, postDescriptionLong, postImageId) values (2, "image of nature 2","Nature in the broadest sense is the natural 2",2)');
  tran.executeSql('insert into posts (postId, postDescriptionShort, postDescriptionLong, postImageId) values (3, "image of nature 3","Nature in the broadest sense is the natural 3",3)');
  tran.executeSql('insert into posts (postId, postDescriptionShort, postDescriptionLong, postImageId) values (4, "image of nature 4","Nature in the broadest sense is the natural 4",4)');
  tran.executeSql('insert into posts (postId, postDescriptionShort, postDescriptionLong, postImageId) values (5, "image of nature 5","Nature in the broadest sense is the natural 5",5)');
  tran.executeSql('insert into posts (postId, postDescriptionShort, postDescriptionLong, postImageId) values (6, "image of nature 6","Nature in the broadest sense is the natural 6",6)');
  tran.executeSql('insert into posts (postId, postDescriptionShort, postDescriptionLong, postImageId) values (7, "image of nature 7","Nature in the broadest sense is the natural 7",7)');
  tran.executeSql('insert into posts (postId, postDescriptionShort, postDescriptionLong, postImageId) values (8, "image of nature 8","Nature in the broadest sense is the natural 8",8)');
  tran.executeSql('insert into posts (postId, postDescriptionShort, postDescriptionLong, postImageId) values (9, "image of nature 9","Nature in the broadest sense is the natural 9",9)');
  tran.executeSql('insert into posts (postId, postDescriptionShort, postDescriptionLong, postImageId) values (10, "image of nature 10","Nature in the broadest sense is the natural 10",10)');
  tran.executeSql('insert into posts (postId, postDescriptionShort, postDescriptionLong, postImageId) values (11, "image of nature 11","Nature in the broadest sense is the natural 11",11)');
  tran.executeSql('insert into posts (postId, postDescriptionShort, postDescriptionLong, postImageId) values (12, "image of nature 12","Nature in the broadest sense is the natural 12",12)');
  tran.executeSql('insert into posts (postId, postDescriptionShort, postDescriptionLong, postImageId) values (13, "image of nature 13","Nature in the broadest sense is the natural 13",13)');
  tran.executeSql('insert into posts (postId, postDescriptionShort, postDescriptionLong, postImageId) values (14, "image of nature 14","Nature in the broadest sense is the natural 14",14)');
  tran.executeSql('insert into posts (postId, postDescriptionShort, postDescriptionLong, postImageId) values (15, "image of nature 15","Nature in the broadest sense is the natural 15",15)');
  tran.executeSql('insert into posts (postId, postDescriptionShort, postDescriptionLong, postImageId) values (16, "image of nature 16","Nature in the broadest sense is the natural 16",16)');
  tran.executeSql('insert into posts (postId, postDescriptionShort, postDescriptionLong, postImageId) values (17, "image of nature 17","Nature in the broadest sense is the natural 17",17)');
  tran.executeSql('insert into posts (postId, postDescriptionShort, postDescriptionLong, postImageId) values (18, "image of nature 18","Nature in the broadest sense is the natural 18",18)');
  tran.executeSql('insert into posts (postId, postDescriptionShort, postDescriptionLong, postImageId) values (19, "image of nature 19","Nature in the broadest sense is the natural 19",19)');
  tran.executeSql('insert into posts (postId, postDescriptionShort, postDescriptionLong, postImageId) values (20, "image of nature 20","Nature in the broadest sense is the natural 20",20)');

});


var current_page = 1;
var records_per_page = 3; // you can change this number 
var selected = [];
var total_rec;
firstValue = 1;
lastValue = records_per_page;
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
  var total_page = document.getElementById("totalPage");
   setTimeout(() =>{
    total_page.innerHTML = numPages();
   },1000)
  // Validate page
  if (page < 1) page = 1;
  if (page > numPages()) page = numPages();

  listing_table.innerHTML = "";
  lastValue = page * records_per_page;
  firstValue = lastValue - records_per_page;

  db.transaction(function (tran) {
    tran.executeSql("select * FROM images WHERE imageId > ? ORDER BY imageId LIMIT ?", [firstValue, records_per_page], getResult);
  });

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

function getResult(transaction, results) {
  document.getElementById("newlistingTable").innerHTML = "";

  var listing_table1 = document.getElementById("newlistingTable");

  for (var i = 0; i < results.rows.length; i++) {

    listing_table1.innerHTML += "<img src=" + results.rows.item(i).imageFileName + " width=\"400px\" height=\"200px\" onclick=goImageDesc(" + results.rows.item(i).imageId + ") class=\"img_cursor\">" + "<br><br>";

  }
}
function goImageDesc(id) {
  db.transaction(function (tran) {
    tran.executeSql("select * FROM posts WHERE postImageId = ?", [id], showDesc);
  });
}
function showDesc(transaction, result) {
  document.getElementById("container").style.display = "none";
  document.getElementById("container1").style.display = "block";
  document.getElementById("container1").innerHTML = ""
  var desc = document.getElementById("container1");
  desc.innerHTML += "<h1>" + result.rows.item(0).postDescriptionLong + "</h1>";
  desc.innerHTML += `<br><br><button id="go" onclick="back()">Back</button>`;
}

function back() {
  document.getElementById("container1").style.display = "none";
  document.getElementById("container").style.display = "block";
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
  totalRecord(function (count) {
    total_rec = count;
  });
  return Math.ceil(total_rec / records_per_page);
}


function totalRecord(callback) {
  var count = 0;
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM images', [], function (tx, results) {
      // this function is called when the executeSql is ended
      count = results.rows.length;
      callback(count);   // <-- call the callback when is done   
    });
  });
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