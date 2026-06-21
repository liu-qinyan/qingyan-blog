const d=document.getElementById("live2dContainer"),o=document.getElementById("live2dTip"),t=["欢迎欢迎～","今天也要开心哦！","要来点音乐吗？","嘿嘿，被你发现啦～","私はずっとここにいるよ","累了就休息一下吧","樱花好漂亮呢～","你好呀～","记得按时吃饭哦！","晚安，做个好梦～"];let a;function s(e){o.textContent=e,o.classList.add("show"),clearTimeout(a),a=setTimeout(()=>{o.classList.remove("show")},3e3)}d.addEventListener("click",()=>{const e=t[Math.floor(Math.random()*t.length)];s(e)});d.addEventListener("mouseenter",()=>{s("嘿嘿，你好呀～")});setInterval(()=>{if(Math.random()>.7){const e=t[Math.floor(Math.random()*t.length)];s(e)}},1e4);const n=document.getElementById("backToTop");window.addEventListener("scroll",()=>{window.scrollY>300?n.classList.add("show"):n.classList.remove("show")});n.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});

// 点击樱花特效
document.addEventListener("click",function(e){
  // 排除点击看板娘和按钮等交互元素
  if(e.target.closest(".live2d-container")||e.target.closest("button")||e.target.closest("a"))return;
  
  const count=Math.floor(Math.random()*2)+2; // 每次点击生成2-3个樱花
  for(let i=0;i<count;i++){
    const petal=document.createElement("div");
    const size=Math.random()*6+8; // 8-14px，小一点不挡视野
    const moveY=-(Math.random()*60+40); // 向上飘40-100px
    const moveX=Math.random()*40-20; // 左右飘-20到20px
    const rotate=Math.random()*720-360; // 旋转-360到360度
    const duration=Math.random()*0.5+1; // 1-1.5秒
    
    petal.style.cssText=`
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background: linear-gradient(135deg, #7dd3fc, #bae6fd);
      border-radius: 50% 0 50% 50%;
      opacity: 0.9;
      pointer-events: none;
      z-index: 9998;
      left: ${e.clientX + Math.random()*20-10}px;
      top: ${e.clientY + Math.random()*20-10}px;
      transform: rotate(${Math.random()*360}deg) scale(1);
      transition: all ${duration}s ease-out;
    `;
    
    document.body.appendChild(petal);
    
    // 下一帧开始动画
    requestAnimationFrame(()=>{
      petal.style.opacity="0";
      petal.style.transform=`translate(${moveX}px, ${moveY}px) rotate(${rotate}deg) scale(0.3)`;
    });
    
    setTimeout(()=>{
      petal.remove();
    },duration*1000+50);
  }
});
