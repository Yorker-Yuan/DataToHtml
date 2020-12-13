const areaSelect = document.querySelector("#select__area");
const zoneSelect = document.querySelector("#select__zone");
const box = document.querySelector("#box");
const endpoint = 'public/data.json';

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var rows = JSON.parse(xhttp.responseText);
    
    //去重
    const set = new Set();
    const NorepeatCity = rows.filter(item=>!set.has(item.City)?set.add(item.City):false);
   
    ///二階select
    var zoneval = changeHandler();
    var zoneSets = rows.filter(function (set){
      return set.Zone == zoneval;
    });
    console.log('zoneval:',zoneval);
    console.log('zoneSets:',zoneSets);
    //三階畫面
    var viewSets = changeViewHandler();
    
    //全部顯示
    show(NorepeatCity,zoneSets,rows);
  }
};
xhttp.open("GET", 'public/data.json', true);
xhttp.send();

function show(area,zone,rows){
  var txtArea = `<option value="">請選擇行政區域</option>`;
  var txtZone = `<option value="">請選擇鄉鎮區</option>`;
  var result = '';

  for (let i = 0;i<area.length;i++) {
    txtArea += `<option value="${area[i].City}">${area[i].City}</option>`;
  }   
  areaSelect.innerHTML = txtArea;

  // for (let i = 0;i<zone.length;i++) {
  //   txtZone += `<option value="${zone[i].Zone}">${zone[i].Zone}</option>`;
  // }   
  // areaSelect.innerHTML = txtZone;

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
    box.innerHTML = result;
}

//二階select
function changeHandler(val){
  return val;
}
//三階畫面
function changeViewHandler(val){

}