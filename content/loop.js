//帧率
var tickdelay = setInterval(gameloop,1000/30)

//定义
var t=new Date()
var timestart=new Date()
var diff=0
var savedelay=OmegaNum(5)
var devspeed = OmegaNum(1)
var realdelay=0

function getminmass(){
    var minmass=OmegaNum(0)
    if(player.achlist[7].completed) minmass=minmass.add(10)
    if(isbubought(25)) minmass=minmass.add(1e10)
    return minmass
}

//循环
function gameloop(){
    if(tabnow=="null") tab(0)
    //检测最低物质
    player.mass=player.mass.max(getminmass())
    //计算时间
    calctime()
    //检测成就
    checkach()
    //计算维度生产
    dimproduce("bd")
    dimproduce("td")
    dimproduce("sd")

    //输出
    showfps()
    showdim()
    showupg()
    showcha()
    showmaintab()

    //自动存档
    savedelay=savedelay.sub(diff)
    if(savedelay.lte(0)) localStorage.setItem("blackholesave", LZString.compressToBase64(JSON.stringify(player)));
}
function calctime(){
    //deltatime-计算时间间隔
    t = new Date()
    diff=OmegaNum((Number(t.getTime())-timestart)/1000).min(0.05).mul(devspeed)
    realdelay=(Number(t.getTime())-timestart)/1000
    timestart=t.getTime()
    //计算结束 真-输出是diff
}