function buydim(num){
    var canbuy = player[tabinfo[tabnow].baseres].div(player.dim[tabnow][num].cost).logBase(player.dim[tabnow][num].costinc).sub(player.dim[tabnow][num].buynum).add(one).floor()
    if(canbuy.gte(one)){
    var buycost = OmegaNum(10).pow(canbuy.sub(one).add(player.dim[tabnow][num].buynum).mul(player.dim[tabnow][num].costinc.log10())).mul(player.dim[tabnow][num].cost)
    player[tabinfo[tabnow].baseres] = player[tabinfo[tabnow].baseres].sub(buycost)
    player.dim[tabnow][num].buynum = player.dim[tabnow][num].buynum.add(canbuy)
    player.dim[tabnow][num].num = player.dim[tabnow][num].num.add(canbuy)
}}
function getcanbuy(num){
    var canbuy = player[tabinfo[tabnow].baseres].div(player.dim[tabnow][num].cost).logBase(player.dim[tabnow][num].costinc).sub(player.dim[tabnow][num].buynum).add(one).floor()
    if(canbuy.lt(one)) canbuy = one
    return canbuy
}
function getbuycost(num){
    var canbuy = player[tabinfo[tabnow].baseres].div(player.dim[tabnow][num].cost).logBase(player.dim[tabnow][num].costinc).sub(player.dim[tabnow][num].buynum).add(one).floor()
    if(canbuy.lt(one)) canbuy = one
    return OmegaNum(10).pow(canbuy.sub(one).add(player.dim[tabnow][num].buynum).mul(player.dim[tabnow][num].costinc.log10())).mul(player.dim[tabnow][num].cost)
}
function buymax(){
    for(i=0;i<=3;i++){
        buydim(i)
    }
}

//rl3

function getbucost(row1){
    var cost = getbubasecost(row1)
    var power = 1
    for(i=1;i<=5;i++){
        if(isbubought(row1*10+i)) power+=1
    }
    return cost.pow(power)
}
function getbubasecost(row){
    var costbase = [OmegaNum(2),OmegaNum(3),OmegaNum(10)]
    var cost = costbase[row-1]
    return cost
}
function buybu(num){
    if(player.bp.gte(getbucost(Math.floor(num/10)))&&!isbubought(num)){
        player.bp=player.bp.sub(getbucost(Math.floor(num/10)))
        player.bu.push(num)
        if(num==14) player.dim.sd[0].num=player.dim.sd[0].num.add(1)
        refresh()
}}
function getboughtbu(row2){
    var str = ""
    for(i=1;i<=5;i++){
        if(isbubought(row2*10+i)) str+=row2*10+i+","
    }
    return str
}
function isbubought(num){
    return player.bu.indexOf(num)+1
}
var resetedbu = false
function resetupg(){
    if(confirm("你确定清除升级吗?这不会返还任何塌缩点数!")){if(player.bu!=[]){resetedbu = true};player[tabnow]=[]}
    refresh()
}

//challenge

function startcha(chatabnum,num){
    var chatab = tablist[chatabnum]
    if(chatab=="bc"){
        if(player.chanow.bc!=[]) exitcha(tablist.indexOf("bc"))
        if(num<50){
            for(i=num;i>num-num%10;i--){
                player.chaactive.bc.push(i)
            }
            player.chanow.bc.push(num)
            rl3reset(true);
            return;
        }
        if(num!=61){
            for(i=num;i>=10;i-=10){
                player.chaactive.bc.push(i)
            }
            player.chanow.bc.push(num)
            rl3reset(true);
            return;
        }
        for(i1=1;i1<6;i1++){
            for(i2=1;i2<6;i2++){
                player.chaactive.bc.push(i1*10+i2)
            }
        }
        player.chaactive.bc.push(61)
        player.chanow.bc.push(61)
        rl3reset(true);
        return;
    }
}
function exitcha(chatabnum){
    var chatab = tablist[chatabnum]
    player.chanow[chatab]=[]
    player.chaactive[chatab]=[]
    rl3reset(true);
}