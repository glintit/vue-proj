/**
 * notifications
 * @author: liugl@inspur.com
 * @date: 2020/11/13
 */

 export function notify(){};
 notify.list=[];
 notify.seed=1;
 
 /* tip message */
 notify.tip=function(msg){
     var dom= document.createElement('div');
     dom.innerHTML=msg;
     dom.className='tip';
     document.body.appendChild(dom);
     window.setTimeout(function(){
         dom.parentNode.removeChild(dom);
     },3000);
 };

 notify.alert=function(msg,cb){
    var msk= document.createElement('div');
    msk.className='msk-cnclick';
    var dom=document.createElement('div');
    dom.className='alert';
    dom.innerHTML='<div class="content success">'+msg+'</div>';
    var btn=document.createElement('span');
    btn.className='btn blue-btn';
    btn.innerHTML='确定';
    dom.appendChild(btn);
    msk.appendChild(dom);
    document.body.appendChild(msk);
    btn.onclick=function(){
        msk.parentNode.removeChild(msk);
        if(cb){
            cb();
        }
    }
 }