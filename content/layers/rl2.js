function rl2reset(){
    if( getrl2exp().lte(player.rl2exp) || player.mass.lte(1e150) ) return;
    player.rl2exp = getrl2exp()
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
    player.rl1exp=one
    player.rl1mult=one
}
function getrl2exp(){
    var exp = player.mass.add(10).log10().log10().div(1.85).pow(0.4)
    if(exp.lte(1)) return one;
    return exp
}