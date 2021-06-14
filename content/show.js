var tabnow = "null"
var one = OmegaNum(1)
const chsnumber = ["零","一","二","三","四","五","六","七","八"]
const tablist = ["bd","td","bu","sd","ach","bc"]
var laststr = ""
var maintabnow = 3
var tabnum = 0
var tabinfo={
    maintabs:4,
    tab1:{
        name:"设置",
        include:["清档",-10086,"导出",-114514,"导入",-1919810],
        unlreq(){return true},
    },
    tab2:{
        name:"成就",
        include:["成就",4],
        unlreq(){return true},
    },
    tab3:{
        name:"物质维度",
        include:["黑洞维度",0,"时间维度",1],
        unlreq(){return true},
    },
    tab4:{
        name:"塌缩",
        include:["塌缩升级",2,"奇点维度",3,"塌缩挑战",5],
        unlreq(){return !player.bp.eq(0)},
    },
    bd:{
        type:"dim",
        baseres:"mass",
        basereschs:"质量",
        others(){return ""},
        unlreq(){return true},
        dimname:"引力发生器",
        auto1(){return player.chacomp[type][num]},
        showrl1:true,
        showrl2:true
    },
    td:{
        type:"dim",
        baseres:"mass",
        basereschs:"质量",
        others(){return `时间碎片 : ${showint(player.ts)}  加成黑洞维度 x ${showint(player.ts.pow(player.tsexp))}(对高维效果减弱)`},
        unlreq(){return true},
        dimname:"时间曲速器",
        showrl1:true,
        showrl2:true
    },
    bu:{
        type:"upg",
        wide:5,
        row:3,
        canreset:true,
        rowdesp:true,
        unlreq(){return true},
        rowdesp(n){
            var txt = ""
        switch(n){
            case(1):    
            case(2):
            case(3):
                txt=`第${n}行价格:${getbucost(n)}(${getbubasecost(n)})BP 已购买:${getboughtbu(n)}`
                break    
            default:
                txt=`咕`
    }return txt
    },
        11:"11:塌缩要求/e20 公式从2x^(1/308)改善为2x^(1/288)",
        c11(){return getbucost(1)},
        12:"12:物质上限^1.5",
        c12(){return getbucost(1)},
        13:"13:物质维度倍率/购买+0.01x",
        c13(){return getbucost(1)},
        14:"14:获得一个免费的奇点零维,奇点指数+0.03 开启奇点维度",
        c14(){return getbucost(1)},
        15:"15:时间碎片以其^0.01加成时间维度",
        c15(){return getbucost(1)},
        21:"21:解锁挑战(未制作) bp*1.5",
        c21(){return getbucost(2)},
        22:"22:上限^1.5",
        c22(){return getbucost(2)},
        23:"23:物质维度倍率/购买+0.01x",
        c23(){return getbucost(2)},
        24:"24:奇点指数+0.01",
        c24(){return getbucost(2)},
        25:"25:质量永不低于e10,且rl1的物质计数^1.05.",
        c25(){return getbucost(2)},
    },
    sd:{
        unlreq(){return isbubought(14)},
        type:"dim",
        baseres:"bp",
        basereschs:"塌缩点数",
        others(){return `奇点能量 : ${showint(player.enegry)} 奇点指数:${showsmallnum(player.getenegrypow())}  加成物质维度 ${showint(player.enegry)} ^ ${showsmallnum(player.getenegrypow())} =  x ${showint(player.getenegryeff(),1)}`},
        dimname:"奇点能量发生器"
    },
    ach:{
        type:"upg",
        notshowbuybutton:true,
        unlreq(){return true},
        wide:10,
        row:5,
        rowdesp:true,
        rowdesp(n){return `该行已完成：${showachrow(n)}`},
        11:player.achlist[1].info,
        12:player.achlist[2].info,
        13:player.achlist[3].info,
        14:player.achlist[4].info,
        15:player.achlist[5].info,
        16:player.achlist[6].info,
        17:player.achlist[7].info,
        18:player.achlist[8].info,
    },
    bc:{
        type:"cha",
        wide:5,
        row:6,
        canreset:true,
        desp:true,
        unlreq(){return isbubought(21)},
        desp(){return `x-a继承挑战x-(a-1) 元挑战a开启所有x-a但是不会继承<br />当前正在进行:${player.chanow.bc}(${player.chaactive.bc})`},
        limit:{
            6:1
        },
        othername:{
            51:"meta-0",
            52:"meta-1",
            53:"meta-2",
            54:"meta-3",
            55:"meta-4",
            61:"meta-meta"
        },
        11:"11:禁用11成就倍率.时间碎片效果^0.9. 奖励:物质零维自动化.注：自动化不消耗对应资源.",
        12:"12:黑洞维度效率随维度等级减缓.(/10^等级). 奖励:物质一维自动化.",
        13:"13:时间维度效率随维度等级减缓.(/1000^等级). 奖励:物质二维自动化.",
        14:"14:rl1倍率^0.8.奖励:物质,三维,懂?",
        15:"15:rl1和2指数^0.5.奖励:基于bp给予物质维度一个倍率.(bp^0.65/10+1)",
        21:"21:时间速率/2,塌缩要求xe50.奖励:时间零维自动化.",
        22:"22:咕咕咕 下次再更"
    }
}
function isable(type,num){
    if(type=="bu") return isbubought(num)
    if(type=="ach") if(player.achlist[num-10]) return player.achlist[num-10].completed
    return false
}
function showmaintab(){
    var str = ""
    for(i=1;i<=tabinfo.maintabs;i++){
        if(tabinfo["tab"+i].unlreq()) player.tabunl[i-1]=true
        str+=`<button ${player.tabunl[i-1] ? "onclick=maintab("+i+")" : ""} class=${player.tabunl[i-1] ? "longsquareunlocked" : "longsquarelocked" }>${tabinfo["tab"+i].name}</button>`
    }
    if(str==laststr) return;
    document.getElementById("maintab").innerHTML = str
    laststr=str
}
function showdim(){
    document.getElementById("mass").innerHTML = `黑洞质量 : ${showint(player.mass)}`
    document.getElementById("rl3").innerHTML = `大塌缩 获得${showint(getrl3bp())}(${showint(player.bp)})BP(需${showint(getbcreq())})`
    if(tabinfo[tabnow].type!="dim") return;
    document.getElementById("others").innerHTML=tabinfo[tabnow].others()
    if(tabinfo[tabnow].showrl1) document.getElementById("rl1").innerHTML = `时间扭曲 给予物质维度x${showint(getrl1mult())}(${showint(player.rl1mult)})的倍率并给予时间碎片^${showsmallnum(getrl1exp())}(${showsmallnum(player.rl1exp)})的加成 但重置您的物质维度(需e50质量)`
    if(tabinfo[tabnow].showrl2) document.getElementById("rl2").innerHTML = `空间收缩 给予物质获取量^${showsmallnum(getrl2exp())}(${showsmallnum(player.rl2exp)})的加成 但重置您的物质维度以及时间扭曲加成(需e150质量)`
    for(i=0;i<=3;i++){
        document.getElementById(`dim${i}`).innerHTML = `${chsnumber[i]}维${tabinfo[tabnow].dimname} x${showint(getdimmult(tabnow,i))}  数量:${showint(player.dim[tabnow][i].num)}(${showint(getrealbought(tabnow,i))})`
        document.getElementById(`buydim${i}`).innerHTML = `购买${showint(getcanbuy(i))}个(最大) 价格：${showint(getbuycost(i))+tabinfo[tabnow].basereschs}`
    }
    var procshow = "生产倍率："
    for(i=0;i<=3;i++){
        procshow+=showint(player.dim[tabnow].proc[i]).toString()
        if(i!=3) procshow+=" x "
    }
    procshow+= `  =  + ${showint(player.dim[tabnow].proc[0].mul(player.dim[tabnow].proc[1]).mul(player.dim[tabnow].proc[2]).mul(player.dim[tabnow].proc[3]))} /s`
    document.getElementById("proc").innerHTML = procshow
}
function showupg(){
    if(tabinfo[tabnow].type=="upg"){
        for(row=1;row<=tabinfo[tabnow].row;row++){
            document.getElementById(`row${row}`).innerHTML = tabinfo[tabnow].rowdesp(row)
        }
    }
}
//升级显示
function showupg2(num){
    var str = tabinfo[tabnow][num]
    if(!tabinfo[tabnow].notshowbuybutton) str+=`<button onclick=buy${tabnow}(${num}) class=${player.bp.gte(getbucost(Math.floor(num/10))) ? "smalllongsquareunlocked" : "smalllongsquarelocked"}>购买</button>`
    document.getElementById("others").innerHTML=str
}
function showcha(){
    if(tabinfo[tabnow].type=="cha"){
        if(tabinfo[tabnow].desp) document.getElementById(`desp`).innerHTML = tabinfo[tabnow].desp()
    }
}
function showcha2(num){
    var str = tabinfo[tabnow][num]
    str+=`<button onclick=startcha(${tabnum},${num}) class=smalllongsquare>开始挑战</button>`
    document.getElementById("others").innerHTML=str
}
//fps显示
function showfps(){
    document.getElementById("fps").innerHTML = "fps: "+showint(OmegaNum(1/realdelay))
}
function tab(num){
    if(num==-10086){askforclear();return}
    if(num==-114514){prompt("存档：",LZString.compressToBase64(JSON.stringify(player)));return}
    if(num==-1919810){load(JSON.parse(LZString.decompressFromBase64(prompt("输入存档："))));return}
    if(!tabinfo[tablist[num]].unlreq()) return;
    tabnow = tablist[num]
    tabnum = num
    var showstr = ""
    document.getElementById("others").innerHTML=""
    document.getElementById("proc").innerHTML=""
    //维度
    if(tabinfo[tabnow].type=="dim"){
        for(i=0;i<=3;i++){
            showstr+=`<dim id=dim${i} class=dim></dim>   <button id=buydim${i} onclick=buydim(${i}) class=normal></button> <br />`
        }
    }
    //升级
    if(tabinfo[tabnow].type=="upg"){
        if(tabinfo[tabnow].canreset) showstr+=`<button onclick=resetupg() class=smalllongsquare>重置升级</button><br>`
        var high = tabinfo[tabnow].row
        var wide = tabinfo[tabnow].wide
        for(i1=1;i1<=high;i1++){
            if(tabinfo[tabnow].rowdesp){showstr+=`<rowdesp id=row${i1}></rowdesp><br />`}
            for(i2=1;i2<=wide;i2++){
                if(tabinfo[tabnow].limit) if(tabinfo[tabnow].limit[i2]) if(i2>tabinfo[tabnow].limit[i2]) break;
                showstr+=`<button id=upg${i1*10+i2} onclick=showupg2(${i1*10+i2}) class=${isable(tabnow,i1*10+i2) ? "longsquarecompleted" : "longsquarenotcompleted"}>${i1*10+i2}</button>`
            }
            showstr+=`<br />`
        }
    }
    if(tabinfo[tabnow].showrl1) showstr+=`<br /><button id=rl1 onclick=rl1reset() class=rl1></button>`
    if(tabinfo[tabnow].showrl2) showstr+=`<br /><button id=rl2 onclick=rl2reset() class=rl2></button>`
    //挑战
    if(tabinfo[tabnow].type=="cha"){
        var high = tabinfo[tabnow].row
        var wide = tabinfo[tabnow].wide
        if(tabinfo[tabnow].canreset) showstr+=`<button onclick=exitcha(${tabnum}) class=smalllongsquare>离开挑战</button><br>`
        if(tabinfo[tabnow].desp){showstr+=`<desp id=desp></desp><br />`}
        for(i1=1;i1<=high;i1++){
            for(i2=1;i2<=wide;i2++){
                if(tabinfo[tabnow].limit) if(tabinfo[tabnow].limit[i1]) if(i2>tabinfo[tabnow].limit[i1]) break;
                if(tabinfo[tabnow].othername){
                    if(tabinfo[tabnow].othername[i1*10+i2]){
                        showstr+=`<button id=cha${i1*10+i2} onclick=showcha2(${i1*10+i2}) class=${player.chaactive[tabnow].indexOf(i1*10+i2)+1 ?　(player.chanow[tabnow]==i1*10+i2 ? "longsquaredoing" : "longsquareactive" ) : (player.chacomp[tabnow][i1*10+i2] ? "longsquarecompleted" : "longsquarenotcompleted")}>${tabinfo[tabnow].othername[i1*10+i2]}</button>`
                    }else{
                        showstr+=`<button id=cha${i1*10+i2} onclick=showcha2(${i1*10+i2}) class=${player.chaactive[tabnow].indexOf(i1*10+i2)+1 ?　(player.chanow[tabnow]==i1*10+i2 ? "longsquaredoing" : "longsquareactive" ) : (player.chacomp[tabnow][i1*10+i2] ? "longsquarecompleted" : "longsquarenotcompleted")}>C${i1+"-"+(i2-1)}</button>`
                    }
                }
                else{showstr+=`<button id=cha${i1*10+i2} onclick=showcha2(${i1*10+i2}) class=${player.chaactive[tabnow].indexOf(i1*10+i2)+1 ?　(player.chanow[tabnow]==i1*10+i2 ? "longsquaredoing" : "longsquareactive" ) : (player.chacomp[tabnow][i1*10+i2] ? "longsquarecompleted" : "longsquarenotcompleted")}}>C${i1+"-"+(i2-1)}</button>`}
            }
            showstr+=`<br />`
        }
    }
    document.getElementById(`showid`).innerHTML = showstr
}
function showint(num,pre=0){
    if(num.lte(1e4))return num.toFixed(pre)
    return num.toExponential(3)
}
function showsmallnum(num){
    if(num.lte(1e4))return num.toFixed(3)
    return num.toExponential(3)
}
function maintab(num){
    var str = ""
    for(i=0;i<tabinfo["tab"+num].include.length;i+=2){
        if(num!=1) str+=`<button onclick=tab(${tabinfo["tab"+num].include[i+1]}) class=${tabinfo[tablist[tabinfo["tab"+num].include[i+1]]].unlreq() ? "longsquareunlocked" : "longsquarelocked" }>${tabinfo["tab"+num].include[i]}</button>`
        if(num==1) str+=`<button onclick=tab(${tabinfo["tab"+num].include[i+1]}) class="longsquareunlocked">${tabinfo["tab"+num].include[i]}</button>`
    }
    document.getElementById("tab").innerHTML=str
    maintabnow=num
}

function refresh(){
    maintab(maintabnow)
    tab(tablist.indexOf(tabnow))
}
