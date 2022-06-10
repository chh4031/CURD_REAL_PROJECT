var admin_value = document.getElementById('admin_value');
var search_value = document.getElementById("search_value");
var admin_search = document.getElementById("admin_search");
var update_id = document.getElementById("update_id");
var real_submit = document.getElementById("real_submit");
 
var keynum = 0;
var control = 0;
var arrarr_sub = [];
arrarr_sub = arrarr_sub.concat(JSON.parse(localStorage.getItem('z')));
console.log(arrarr_sub);

var i = 0, k = 0, g = 0, m = 0, n = 0;
let savearr = [];
k = localStorage.getItem('k');
//locatstorage의 k키의 값을 가져옴. 즉 현재 저장된 값들의 갯수

for(g = 0;g < k;g++){
    var a1 = [];
    a1[i] = localStorage.getItem(i);
    k = localStorage.getItem('k');
    savearr[i] = a1[i];

    i++;
    /*
    console.log('k값'+k);
    console.log('i값'+i);
    console.log('데이터가 들어간 배열값'+a1);
    */
}
//console.log(savearr);

/*로컬스토리지의 사용에서의 중복을 막기 위한 for문
로컬스토리지의 해당 번호키 값에 해당하는 것을 배열의 0번째 인덱스부터 savearr라는 배열에 넣어줌.
*/

function Storageclear(){
    localStorage.clear();
}
//로컬스토리지의 초기화를 위한 단순 기능 함수

function Storagecomfirm(){
    console.log(localStorage);
}
//로컬스토리지의 현재 키와 값들을 보여주는 단순 함수

function Storagelist(){
    var locallist = localStorage.length;
    admin_value.innerHTML = "";

    for(m = 0; m < locallist-2; m++){
        admin_value.innerHTML += '<div>' + localStorage.getItem(m) + '</div>';
    }
}
/*
현재 로컬스토리지에 저장되어 있는 값들을 화면상에 나타내주는 함수
단, -2가 되는 이유는 현재 키값들 중에 끝에 k와 z라는 이름의 키는 가져와야할 값이 아님
즉 k는 현재 저장된 회원들의 이름값들의 갯수이고,
z는 중복방지를 위해 만든 새로운 배열형식의 키값이므로
이 둘은 화면상에 보여줄 이유가 없으므로 -2로 둘을 제외함.
*/

function admin_search1(){
    var locallist = localStorage.length;
    for(n = 0;n < locallist-2; n++){
        var keyvalue1 = localStorage.getItem(n);
        if(admin_search.value == keyvalue1){
            //console.log('true');
            keynum = n;
            search_value.innerHTML=keyvalue1;
            break;
        }else{
            search_value.innerHTML="일치하는 값 없음.";
        }
    }
}
/*
현재 저장된 키값들중에 사용자가 입력하고 검색을 눌렀을때 해당 값이 있는지를 찾고
해당 값을 찾으면 아래에 보여주는 함수
*/

function ok(){
    control = 0;
    if(search_value.innerText == "일치하는 값 없음."){
        alert('잘못된 수정 입니다.');
    }else{
        //console.log('key : ' + n);
        update_id.value = search_value.innerText;
        control = 1;
    }
}
/*
값을 수정하기 위한 함수, 즉 위에서 만든 검색기능으로 검색된 값을 수정하기 위해
옆의 수정 페이지로 넘기기위한 함수이다.
단, 옆에서 수정을 위해 넘기는 부분에서 관리자 페이지에 접근이후 바로
수정하는 것을 막기 위해 control이라는 변수의 0또는 1값을 같이 넘겨줌으로써 
해당 예외를 처리함.
*/

function realok(){
    var VE = update_id.value;
    //console.log(update_id.value);
    if(control == 1){
        if(arrarr_sub.includes(update_id.value)){
            alert("값이 겹칩니다.");
        }else{
            localStorage.setItem(n, update_id.value);
            delete arrarr_sub[arrarr_sub.indexOf(VE)];
            arrarr_sub.splice(arrarr_sub.indexOf(VE),0,update_id.value);

            control = 0;
            return control;
        }
    }else{
        alert("잘못된 제출입니다.");    
    }
}
/*
수정된 값을 제출하기 위한 함수로, 값이 겹치는지를 위에서 만든 arrarr배열을 이용해 검사도함.
겹치지 않을시 값을 제출하나 로컬스토리지의 값도 같이 바꿔주고, z키값의 배열 안의 값도 같이
바꿔주어야 예외처리가 발생하지 않음. 당연히 컨트롤 값을 받아야 이용이 가능함.
또한 중복값 처리까지 추가함.
*/

function removeok(){
    if(control == 1){
        localStorage.removeItem(n);
        localStorage.setItem(n, "null"+n);
        delete arrarr_sub[arrarr_sub.indexOf(update_id.value)];
        arrarr_sub.splice((arrarr_sub.indexOf(update_id.value)-1),0,'');
        control = 0;
    }else{
        control = 0;
        alert("잘못된 삭제 입니다.")
    }
}

/*
값을 삭제하는 기능인데 로컬스토리지에서의 값을 삭제하면 해당 키값까지 같이 삭제되는 문제가 발생함
즉 
0 : name
1 : name1
2 : name2
일때 2를 삭제시
0 : name
2 : name2
로 되어 우리가 사용하는 모든 기능에서의 문제가 발생.
그래서 키값은 그대로 두고, 해당 키에 해당하는 값을 null+숫자의 형태로 만들어 값을 대체하도록함.
이 기능을 삭제로 정의했고, 원래 키의 데이터값은 사라지고, 그 값을 대체하는 다른 값을 넣도록 정의함.
당연히 로컬스토리지에서의 값도 변경시키고, 'z' 키값의 데이터 값에도 변경하여 검색기능에서 삭제한 값이
검색되지 않도록하는 예외를 처리함.
*/