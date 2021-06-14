function checkach(){
    if(player.achlist.upto>player.achlist.total) return
    for(i=player.achlist.upto;i<=player.achlist.total;i++){
        if(!player.achlist[i].completed){if(player.achlist[i].check()){player.achlist[i].completed=true;player.achlist.totalcompleted+=1}}
    }
    if(player.achlist[player.achlist.upto].completed) player.achlist.upto+=1
}
function showachrow(row){
    var start=row*10-9
    var end = row*10
    var str = ""
    for(i=start;i<=end;i++){
        if(player.achlist[i]) if(player.achlist[i].completed){str+=(i+10);str+=","}
    }return str
}