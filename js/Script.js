const areaSelect = document.querySelector("#select__area");
const zoneSelect = document.querySelector("#select__zone");
var txtArea = `<option value="">請選擇行政區域</option>`;
var txtZone = `<option value="">請選擇鄉鎮區</option>`;
const box = document.querySelector("#box");
const endpoint = 'public/data.json';

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    rows = JSON.parse(xhttp.responseText);
    //去掉var變成全域變數

    //去重
    const set = new Set();
    const NorepeatCity = rows.filter(item=>!set.has(item.City)?set.add(item.City):false);

  for (let i = 0;i<NorepeatCity.length;i++) {
    txtArea += `<option value="${NorepeatCity[i].City}">${NorepeatCity[i].City}</option>`;
  }   
  areaSelect.innerHTML = txtArea;

    //三階畫面
    var viewSets = changeViewHandler();

    //全部顯示
    show(rows);
  }
};
xhttp.open("GET", 'public/data.json', true);
xhttp.send();

function show(rows){
  var result = '';

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
  //記得先清空原來內容
  txtZone = `<option value="">請選擇鄉鎮區</option>`;
   var zoneSets = Object.values(rows).filter(x=>x.City == val);
   //去重
   const set = new Set();
   var NorepeatTown = zoneSets.filter(item=>!set.has(item.Town)?set.add(item.Town):false);
  console.log(NorepeatTown);
    for (let i = 0;i<NorepeatTown.length;i++) {
        txtZone += `<option value="${NorepeatTown[i].Town}">${NorepeatTown[i].Town}</option>`;
      }   
      zoneSelect.innerHTML = txtZone;
}
//三階畫面
function changeViewHandler(val){
  var viewSets = Object.values(rows).filter(x=>x.Town == val);
  console.log(viewSets);
  show(viewSets);
}

//loading
document.querySelector('#loaderbody').classList.add('hide');
// document.querySelector('#select__area').addEventListener('change',()=>{
//   document.querySelector('#loaderbody').classList.remove('hide');
// });
// setTimeout(() => {
//   document.querySelector('#loaderbody').classList.add('hide');
// }, 1000);