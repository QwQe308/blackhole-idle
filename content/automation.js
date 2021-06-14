function automation(){
    for(i=0;i<4;i++){
    if(player.chacomp.bc[11+i]) autobuydim("bd",i)
    if(player.chacomp.bc[21+i]) autobuydim("td",i)
    if(player.chacomp.bc[31+i]) autobuydim("sd",i)
    }
}