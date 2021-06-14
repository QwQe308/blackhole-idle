var player = {
    tabunl:[false,false,false,false],
        //版本
        version : 0.24,
        devspeed:OmegaNum(1),
        //物质
        mass:OmegaNum(0),
        //时间碎片
        ts:OmegaNum(0),
        //时间碎片加成指数
        tsexp:OmegaNum(0.1),
        //rl1
        rl1mult:OmegaNum(1),
        rl1multexp:OmegaNum(1/50),
        rl1exp:OmegaNum(1),
        //rl2
        rl2exp:OmegaNum(1),
        //rl3
        bp:OmegaNum(0),
        bu:[],
        enegry:OmegaNum(0),
        getenegrypow(){
            var exp = OmegaNum(0)
            if(isbubought(14)) exp=exp.add(0.03)
            if(isbubought(24)) exp=exp.add(0.01)
            return exp
        },
        getenegryeff(){
            var exp = player.getenegrypow()
            return player.enegry.pow(exp).max(1)
        },
        chanow:{
            bc:0
        },
        chaactive:{
            bc:[]
        },
        chacomp:{
            bc:{
                11:false,12:false,13:false,14:false,15:false,21:false,22:false,23:false,24:false,25:false,31:false,32:false,33:false,34:false,35:false,41:false,42:false,43:false,44:false,45:false,51:false,52:false,53:false,54:false,55:false,61:false
            }
        },
        achlist:{
            total:8,
            upto:1,
            totalcompleted:0,
            1:{
                info:"11:起点:购买物质零维 奖:每一个完成的成就加成物质维度x1.5",
                check(){return !player.dim.bd[0].buynum.eq(0)},
                completed:false
            },
            2:{
                info:"12:线!:购买物质一维",
                check(){return !player.dim.bd[1].buynum.eq(0)},
                completed:false
            },
            3:{
                info:"13:这么简单的成就我都懒得取名:购买物质二维",
                check(){return !player.dim.bd[2].buynum.eq(0)},
                completed:false
            },
            4:{
                info:"14:3d游戏?:购买物质三维",
                check(){return !player.dim.bd[3].buynum.eq(0)},
                completed:false
            },
            5:{
                info:"15:new start.:一阶重置一次.以后简称rl1.",
                check(){return !player.rl1mult.eq(1)},
                completed:false
            },
            6:{
                info:"16:new start^2:二阶重置一次.以后简称rl2.",
                check(){return !player.rl2exp.eq(1)},
                completed:false
            },
            7:{
                info:"17:var bigcrunch = new start():rl3一次.rl3是什么？类比不会吗（ 奖:物质重置为10而不是0.",
                check(){return !player.bp.eq(0)},
                completed:false
            },
            8:{
                info:"18:概不退货:在有塌缩升级时重置塌缩升级.",
                check(){return resetedbu},
                completed:false
            }
        },
        //维度信息
        dim:{
            
            bd:{
                
                //生产倍率
                proc:[OmegaNum(1),OmegaNum(1),OmegaNum(1),OmegaNum(1)],
                
                //维度间生产debuff
                dimnerf:OmegaNum(0.5),
    
                //维度
                0:{
                    //数量
                    num:OmegaNum(0),
                    //购买数量
                    buynum:OmegaNum(0),
                    //购买倍率
                    buymult:OmegaNum(2),
                    //价格
                    cost:OmegaNum(10),
                    //价格增长
                    costinc:OmegaNum(10)
                },
                1:{
                    //数量
                    num:OmegaNum(0),
                    //购买数量
                    buynum:OmegaNum(0),
                    //购买倍率
                    buymult:OmegaNum(2),
                    //价格
                    cost:OmegaNum(1000),
                    //价格增长
                    costinc:OmegaNum(1e3)
                },
                2:{
                    //数量
                    num:OmegaNum(0),
                    //购买数量
                    buynum:OmegaNum(0),
                    //购买倍率
                    buymult:OmegaNum(2),
                    //价格
                    cost:OmegaNum(1e16),
                    //价格增长
                    costinc:OmegaNum(1e5)
                },
                3:{
                    //数量
                    num:OmegaNum(0),
                    //购买数量
                    buynum:OmegaNum(0),
                    //购买倍率
                    buymult:OmegaNum(2),
                    //价格
                    cost:OmegaNum(1e25),
                    //价格增长
                    costinc:OmegaNum(1e8)
                }},
                
            //时间维度
            td:{
            
                //生产倍率
                proc:[OmegaNum(0),OmegaNum(1),OmegaNum(1),OmegaNum(1)],
                
                //维度间生产debuff
                dimnerf:OmegaNum(0.5),
                
                //维度
                0:{
                    //数量
                    num:OmegaNum(0),
                    //购买数量
                    buynum:OmegaNum(0),
                    //购买倍率
                    buymult:OmegaNum(2),
                    //价格
                    cost:OmegaNum(1e16),
                    //价格增长
                    costinc:OmegaNum(1e4)
                },
                1:{
                    //数量
                    num:OmegaNum(0),
                    //购买数量
                    buynum:OmegaNum(0),
                    //购买倍率
                    buymult:OmegaNum(2),
                    //价格
                    cost:OmegaNum(1e24),
                    //价格增长
                    costinc:OmegaNum(1e9)
                },
                2:{
                    //数量
                    num:OmegaNum(0),
                    //购买数量
                    buynum:OmegaNum(0),
                    //购买倍率
                    buymult:OmegaNum(2),
                    //价格
                    cost:OmegaNum(1e36),
                    //价格增长
                    costinc:OmegaNum(1e16)
                },
                3:{
                    //数量
                    num:OmegaNum(0),
                    //购买数量
                    buynum:OmegaNum(0),
                    //购买倍率
                    buymult:OmegaNum(2),
                    //价格 
                    cost:OmegaNum(1e48),
                    //价格增长
                    costinc:OmegaNum(1e25)
                }
            },
            sd:{
            
                //生产倍率
                proc:[OmegaNum(0),OmegaNum(1),OmegaNum(1),OmegaNum(1)],
                
                //维度间生产debuff
                dimnerf:OmegaNum(0.5),
                
                //维度
                0:{
                    //数量
                    num:OmegaNum(0),
                    //购买数量
                    buynum:OmegaNum(0),
                    //购买倍率
                    buymult:OmegaNum(2),
                    //价格
                    cost:OmegaNum(1),
                    //价格增长
                    costinc:OmegaNum(2)
                },
                1:{
                    //数量
                    num:OmegaNum(0),
                    //购买数量
                    buynum:OmegaNum(0),
                    //购买倍率
                    buymult:OmegaNum(2),
                    //价格
                    cost:OmegaNum(4),
                    //价格增长
                    costinc:OmegaNum(4)
                },
                2:{
                    //数量
                    num:OmegaNum(0),
                    //购买数量
                    buynum:OmegaNum(0),
                    //购买倍率
                    buymult:OmegaNum(2),
                    //价格
                    cost:OmegaNum(16),
                    //价格增长
                    costinc:OmegaNum(8)
                },
                3:{
                    //数量
                    num:OmegaNum(0),
                    //购买数量
                    buynum:OmegaNum(0),
                    //购买倍率
                    buymult:OmegaNum(2),
                    //价格
                    cost:OmegaNum(64),
                    //价格增长
                    costinc:OmegaNum(16)
                }
            }
        }
    }
function askforclear(){
    if(confirm("你确定清除存档吗 点击三次以确认")){
        if(confirm("你确定清除存档吗 点击两次以确认")){
            if(confirm("你确定清除存档吗 点击一次以确认")){
        localStorage.removeItem("blackholesave");
        location.reload();
            }
        }
    }
}
function load(data=""){
    if(!data) save = JSON.parse(LZString.decompressFromBase64(localStorage.getItem("blackholesave")));
    if(data) save = JSON.parse(LZString.decompressFromBase64(data))
    if(save){
    if(save.tabunl) for(i=0;i<player.tabunl.length;i++){if(save.tabunl[i]) player.tabunl[i]=true}
    if(save.mass) player.mass=OmegaNum(save.mass)
    if(save.ts) player.ts=OmegaNum(save.ts)
    if(save.rl1mult) player.rl1mult=OmegaNum(save.rl1mult)
    if(save.rl1exp) player.rl1exp=OmegaNum(save.rl1exp)
    if(save.rl2exp) player.rl2exp=OmegaNum(save.rl2exp)
    if(save.bp) player.bp=OmegaNum(save.bp)
    if(save.bu) player.bu=save.bu
    if(save.enegry) player.enegry=OmegaNum(save.enegry)
    if(save.chanow){
        if(save.chanow.bc) player.chanow.bc=save.chanow.bc
    }
    if(save.chaactive){
        if(save.chaactive.bc) player.chaactive.bc=save.chaactive.bc
    }
    if(save.chacomp) if(save.chacomp.bc) for(i=1;i<=61;i++){if(save.chacomp.bc[i]) player.chacomp.bc[i] = true}
    if(save.achlist){
        if(save.achlist.upto) player.achlist.upto=save.achlist.upto
        if(save.achlist.totalcompleted) player.achlist.totalcompleted=save.achlist.totalcompleted
        for(i=1;i<=player.achlist.total;i++){
        if(save.achlist[i]){if(save.achlist[i].completed){player.achlist[i].completed=true}}
        }
    }
    if(save.dim){
        if(save.dim.bd){
            if(save.dim.bd.proc) for(i=0;i<=3;i++){if(save.dim.bd.proc[i]) player.dim.bd.proc[i]=OmegaNum(save.dim.bd.proc[i])}
            for(i=0;i<=3;i++){
                if(save.dim.bd[i]){
                    if(save.dim.bd[i].num) player.dim.bd[i].num=OmegaNum(save.dim.bd[i].num)
                    if(save.dim.bd[i].buynum) player.dim.bd[i].buynum=OmegaNum(save.dim.bd[i].buynum)
                }
            }
        }
        if(save.dim.td){
            if(save.dim.td.proc) for(i=0;i<=3;i++){if(save.dim.td.proc[i]) player.dim.td.proc[i]=OmegaNum(save.dim.td.proc[i])}
            for(i=0;i<=3;i++){
                if(save.dim.td[i]){
                    if(save.dim.td[i].num) player.dim.td[i].num=OmegaNum(save.dim.td[i].num)
                    if(save.dim.td[i].buynum) player.dim.td[i].buynum=OmegaNum(save.dim.td[i].buynum)
                }
            }
        }
        if(save.dim.sd){
            if(save.dim.sd.proc) for(i=0;i<=3;i++){if(save.dim.sd.proc[i]) player.dim.sd.proc[i]=OmegaNum(save.dim.sd.proc[i])}
            for(i=0;i<=3;i++){
                if(save.dim.sd[i]){
                    if(save.dim.sd[i].num) player.dim.sd[i].num=OmegaNum(save.dim.sd[i].num)
                    if(save.dim.sd[i].buynum) player.dim.sd[i].buynum=OmegaNum(save.dim.sd[i].buynum)
                }
            }
        }
    }
}fixsave()}
function fixsave(){
    if(save.version<0.24) player.chanow.bc=0
    if(save.version<0.22){
        player.bp = player.bp.div(5).floor()
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
        player.rl2exp = one
    }
}
load()