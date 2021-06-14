function sc0(num,start=200,power=1){
    if(num.lte(start)) return num;
    return num.sub(start).div(OmegaNum(2).pow(power)).add(start)
}
function sc1(num,start=308,power=1){
    if(num.lte(start)) return num;
    return num.sub(start).div(OmegaNum(3).pow(power)).add(start)
}
function sc2(num,start=308,power=1){
    if(num.lte(start)) return num;
    return num.div(start).pow(OmegaNum(0.75).pow(power)).mul(start)
}