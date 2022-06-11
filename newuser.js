var username = document.getElementById("username");

var doublearr = [];
var k = 0;
var i = 0;

doublearr = doublearr.concat(JSON.parse(localStorage.getItem('z')));

function user_sumbit(){
    var username_value = username.value;

    if(doublearr.includes(username_value)){
        alert("값이 겹칩니다");
    }else{
        doublearr.push(username_value);

        if(localStorage.getItem('k')!=0){
            i = localStorage.getItem('k');
            localStorage.setItem(i++, username_value);
            localStorage.setItem('k', i);
        }else{
            localStorage.setItem(i++, username_value);
            localStorage.setItem('k',i);
        }
        localStorage.setItem('z', JSON.stringify(doublearr));
        alert('값 : ' + username_value + '이 저장되었습니다.');
    }
}

/*
추가적인 기능 구현 내용은 깃허브 참고
https://github.com/chh4031/CRUD_Project
*/