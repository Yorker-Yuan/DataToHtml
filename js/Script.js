const areaSelect = document.querySelector("#area");
const zoneSelect = document.querySelector("#zone");
const box = document.querySelector("#box");
const endpoint = 'public/data.json';

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var rows = JSON.parse(xhttp.responseText);
    var txt = `<option value="">請選擇行政區域</option>`;
    var result = '';
    
    //去重
    const set = new Set();
    const NorepeatCity = rows.filter(item=>!set.has(item.City)?set.add(item.City):false);
    //一階SELECT
    for (let i = 0;i<NorepeatCity.length;i++) {
      txt += `<option value="${NorepeatCity[i].City}">${NorepeatCity[i].City}</option>`;
    }   
    document.getElementById("area").innerHTML = txt;
    //全部顯示
    for(let j = 0;j<rows.length; j++)
    {
      result += `
      <div class="col">
    <div class="mask"></div>
      <div class="title">${rows[j].City}</div>
      <img src="${rows[j].PicURL}" >
      <div class="info">
        <i>${rows[j].Town}</i>
        <h3>${rows[j].Name}</h3>
        <p id="${rows[j].ID}" class="contents fadeIn">
        ${rows[j].FoodFeature}  
        </p>
        </div>
        </div>
      `;
    }
    document.getElementById("box").innerHTML = result;

  }
};
xhttp.open("GET", 'public/data.json', true);
xhttp.send();

//二階select
function changeHandler(val){
  
}
