var zero = OmegaNum(0)
function rl1reset(){
    if( getrl1mult().lte(player.rl1mult) && getrl1exp().lte(player.tsexp) || player.mass.lte(1e50)) return;
    if(player.rl1mult.lte(getrl1mult())) player.rl1mult = getrl1mult()
    if(player.rl1exp.lte(getrl1exp())) player.rl1exp = getrl1exp()
    for(i=0;i<=3;i++){
        player.dim.bd[i].num=zero
        player.dim.bd[i].buynum=zero
        player.dim.bd.proc[i]=one
        player.dim.td[i].num=zero
        player.dim.td[i].buynum=zero
        player.dim.td.proc[i]=one
    }
    player.mass=zero
    player.ts=zero
}
function getrl1mult(){
    var mult = player.mass.pow(player.rl1multexp)
    if(isbubought(25)) mult = mult.pow(1.05)
    return mult
}
function getrl1exp(){
    var exp = player.mass.add(10).log10().log10().div(1.2).pow(0.25)
    if(isbubought(25)) exp = player.mass.pow(1.05).add(10).log10().log10().div(1.2).pow(0.25)
    if(exp.lte(1)) return one;
    return exp
}