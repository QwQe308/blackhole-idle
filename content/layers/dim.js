function getmaxmass(){
    var basemaxmass = OmegaNum("1.80e308")
    if(isbubought(12)) basemaxmass = basemaxmass.pow(1.5)
    if(isbubought(22)) basemaxmass = basemaxmass.pow(1.5)
    return basemaxmass
}
function getrealbought(type,num){
    var basenum = player.dim[type][num].buynum
    basenum=sc0(basenum)
    basenum=sc1(basenum)
    basenum=sc2(basenum)
    return basenum
}
var dimstat={
    bd:{
        tsmul:true,
        rl1:true,
        rl2:true,
        enegry:true,
        achmul(){return isincha("bc",11) ? OmegaNum(1) : OmegaNum(1.5).pow(player.achlist.totalcompleted)},
        res:"mass",
        maxres(){return getmaxmass()}
    },
    td:{
        rl1:true,
        enegry:true,
        achmul(){return isincha("bc",11) ? OmegaNum(1) : OmegaNum(1.5).pow(player.achlist.totalcompleted)},
        res:"ts",
    },
    sd:{
        res:"enegry",
        achmul(){return 1},
    }
}

function gettsboost(num){
    var mult = player.ts.pow(player.tsexp).add(OmegaNum(1)).root((num+1)**0.5)
    mult=mult.pow(player.rl1exp)
    //挑战debuff
    if(isincha("bc",11)) mult=mult.pow(0.9)
    return mult
}

//计算倍率
function getdimmult(dimtype,num){
 
    var mult = OmegaNum(1)
                
    //购买倍率
    mult=mult.mul(getbuymult(dimtype,num).pow(getrealbought(dimtype,num)))
                
    //时间碎片倍率
    if(dimstat[dimtype].tsmul) mult=mult.mul(gettsboost(num))

    //rl1倍率
    if(dimstat[dimtype].rl1) mult=mult.mul(player.rl1mult)

    if(isbubought(15)&&dimtype=="td") mult=mult.mul(player.ts.pow(0.015))

    if(dimstat[dimtype].enegry) mult=mult.mul(player.getenegryeff()) 

    if(dimstat[dimtype].achmul) mult=mult.mul(dimstat[dimtype].achmul())

    //挑战debuff
    if(isincha("bc",12)) if(dimtype=="bd") mult=mult.mul(OmegaNum(0.1).pow(num))
    if(isincha("bc",13)) if(dimtype=="td") mult=mult.mul(OmegaNum(0.001).pow(num))

    //挑战奖励
    if(player.chacomp.bc[15]) mult=mult.mul(player.bp.pow(0.65).mul(0.1).add(1))
                
    return mult
                
    }
    
    
//计算维度生产
function dimproduce(type){
    //维度间生产
    for(i=3;i>=1;i--){
        player.dim[type][i-1].num = player.dim[type][i-1].num.add(player.dim[type][i].num.mul(getdimmult(type,i)).pow(player.dim[type].dimnerf).mul(diff).div(10))
    }
                
    //生产倍率
    for(i=0;i<=3;i++){
        player.dim[type].proc[i]=player.dim[type].proc[i].add(player.dim[type][i].num.mul(getdimmult(type,i)).mul(diff))
    }    
                
    //倍率生产
    var totalproc=OmegaNum(1)
    for(i=0;i<=3;i++){
        totalproc=totalproc.mul(player.dim[type].proc[i])
    }
    if(dimstat[type].rl2) totalproc=totalproc.pow(player.rl2exp)
    player[dimstat[type].res]=player[dimstat[type].res].add(totalproc.mul(diff))
    if(dimstat[type].maxres) player[dimstat[type].res] = player[dimstat[type].res].min(dimstat[type].maxres())
    //结束
}

function getbuymult(type,num){
    var buymult = player.dim[type][num].buymult
    if(isbubought(13)&&(type=="bd"||type=="td")) buymult=buymult.add(0.01)
    if(isbubought(23)&&(type=="bd"||type=="td")) buymult=buymult.add(0.01)
    return buymult
}