function rl3reset(hardreset = false){
    if(!hardreset){
    if( player.mass.lt(getbcreq()) ) return;
    player.bp=player.bp.add(getrl3bp())
}
    for(i=0;i<=3;i++){
        player.dim.bd[i].num=zero
        player.dim.bd[i].buynum=zero
        player.dim.bd.proc[i]=one
        player.dim.td[i].num=zero
        player.dim.td[i].buynum=zero
        player.dim.td.proc[i]=one
        player.dim.sd[i].num=player.dim.sd[i].buynum
        player.dim.sd[i].buynum=zero
        player.dim.sd.proc[i]=one
    }        
    if(isbubought(14)) player.dim.sd[0].num = one
    player.dim.sd.proc[0]=zero
    player.enegry=zero
    player.mass=zero
    player.ts=zero
    player.rl1exp=one
    player.rl1mult=one
    player.rl2exp = one
    refresh()
}
function getrl3bp(){
    return player.mass.root(getbcreq().log10()).div(10).floor().mul(2).mul(getbpmul())
}
function getbpmul(){
    var mul = OmegaNum(1)
    if(isbubought(21)) mul = mul.mul(1.5)
    return mul
}
function getbcreq(){
    var req=OmegaNum("1.80e308")
    if(isbubought(11)) req=req.div(1e20)
    if(isincha("bc",21)) req=req.mul(1e50)
    return req
}