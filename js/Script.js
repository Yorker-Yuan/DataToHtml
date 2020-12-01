const areaSelect = document.querySelector("#area");
const zoneSelect = document.querySelector("#zone");
const endpoint = 'public/data.json';
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var rows = JSON.parse(xhttp.responseText);
    var txt = `<option value="">請選擇行政區域</option>`;
    //去重
    const set = new Set();
    const NorepeatCity = rows.filter(item=>!set.has(item.City)?set.add(item.City):false);
    for (let i = 0;i<NorepeatCity.length;i++) {
      txt += `<option value="${NorepeatCity[i].City}">${NorepeatCity[i].City}</option>`;
    }
    document.getElementById("area").innerHTML = txt;
  }
};
xhttp.open("GET", 'public/data.json', true);
xhttp.send();

function changeHandler(index) {
  var data, xhttp, myObj, x, txt = "";
  data = JSON.stringify(endpoint);
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
      for (x = 0;x<data[index].length;x++) {
        txt += `
        <div class="mask"></div>
        <div class="title">${data[x].City}</div>
        <img src="${data[x].PicURL}" >
        <div class="info">
          <i>${data[x].Town}</i>
          <h3>${data[x].Name}</h3>
          <p class="contents fadeIn">
          ${data[x].HostWords}</p>
        </div>`;
      }
      document.getElementById("box").innerHTML = txt;
      }
    };
    xhttp.open("GET", 'public/data.json', true);
    xhttp.send();
}