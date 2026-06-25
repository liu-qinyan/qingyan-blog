// 看板娘互动功能
(function() {
  const container = document.getElementById('live2dContainer');
  const tip = document.getElementById('live2dTip');
  const img = document.getElementById('live2dImg');
  
  if (!container || !tip || !img) return;
  
  // ========== 对话内容 ==========
  const greetings = {
    morning: [
      '早上好呀～今天也要加油哦！',
      '早安！今天想吃什么早餐呢？',
      '新的一天开始啦，元气满满！',
      '早上好～记得吃早餐哦'
    ],
    noon: [
      '中午好！该吃午饭啦～',
      '午安～要不要小憩一会儿？',
      '中午好呀，今天天气真不错',
      '吃了吗？没吃的话快去吃！'
    ],
    afternoon: [
      '下午好～有点困了呢',
      '下午茶时间到！',
      '下午也要加油哦，快放学啦',
      '今天作业多不多呀？'
    ],
    evening: [
      '晚上好～今天过得怎么样？',
      '晚饭吃了吗？',
      '晚上好呀，来看看博客吧',
      '欢迎回来～今天辛苦啦'
    ],
    night: [
      '这么晚还不睡呀？',
      '晚安～早点休息哦',
      '夜深了，要注意身体呀',
      '还在写作业吗？加油！'
    ]
  };
  
  const clickDialogues = [
    '嘿嘿，你戳到我啦～',
    '怎么啦？有什么事吗？',
    '再戳我，再戳我我就...我就害羞了！',
    '欢迎欢迎～随便逛逛吧',
    '你好呀！我是看板娘～',
    '今天也要开心哦！',
    '嘿嘿，被你发现了',
    '有什么想看的吗？',
    '累了就休息一下吧',
    '我会一直在这里陪着你的～'
  ];
  
  const hoverDialogues = [
    '嗯？你在看我吗？',
    '怎么啦～',
    '我好看吗？嘿嘿',
    '不要一直盯着人家啦',
    '有什么事吗？'
  ];
  
  // ========== 工具函数 ==========
  function getTimePeriod() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return 'morning';
    if (hour >= 11 && hour < 13) return 'noon';
    if (hour >= 13 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  }
  
  function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  let tipTimer = null;
  function showTip(text, duration = 3000) {
    tip.textContent = text;
    tip.style.opacity = '1';
    tip.style.transform = 'translateY(0)';
    
    if (tipTimer) clearTimeout(tipTimer);
    tipTimer = setTimeout(() => {
      tip.style.opacity = '0';
      tip.style.transform = 'translateY(10px)';
    }, duration);
  }
  
  // ========== 初始化 ==========
  // 初始问候
  setTimeout(() => {
    const period = getTimePeriod();
    const greeting = getRandomItem(greetings[period]);
    showTip(greeting, 4000);
  }, 1000);
  
  // ========== 点击互动 ==========
  let clickCount = 0;
  img.addEventListener('click', () => {
    clickCount++;
    
    // 点击动画
    img.style.transform = 'scale(0.95)';
    setTimeout(() => {
      img.style.transform = 'scale(1)';
    }, 100);
    
    // 特殊对话
    if (clickCount % 10 === 0) {
      showTip('你已经戳了我' + clickCount + '次啦！手不累吗？', 3000);
    } else if (clickCount % 5 === 0) {
      showTip('还戳还戳！再戳我就不理你了！', 2500);
    } else {
      showTip(getRandomItem(clickDialogues), 2500);
    }
  });
  
  // ========== 鼠标悬停 ==========
  let hoverTimer = null;
  container.addEventListener('mouseenter', () => {
    // 悬停动画
    img.style.transform = 'scale(1.05) translateY(-5px)';
    
    hoverTimer = setTimeout(() => {
      showTip(getRandomItem(hoverDialogues), 2000);
    }, 500);
  });
  
  container.addEventListener('mouseleave', () => {
    img.style.transform = 'scale(1) translateY(0)';
    if (hoverTimer) clearTimeout(hoverTimer);
  });
  
  // ========== 定时说话 ==========
  const autoTalkInterval = 20000; // 20秒说一次
  setInterval(() => {
    if (Math.random() > 0.5) { // 50%概率说话
      const period = getTimePeriod();
      const dialogue = getRandomItem([...greetings[period], ...clickDialogues]);
      showTip(dialogue, 3000);
    }
  }, autoTalkInterval);
  
  // ========== 拖拽功能 ==========
  let isDragging = false;
  let startX, startY, startLeft, startBottom;
  
  container.style.cursor = 'grab';
  
  container.addEventListener('mousedown', (e) => {
    if (e.target === tip) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    
    const rect = container.getBoundingClientRect();
    startLeft = rect.left;
    startBottom = window.innerHeight - rect.bottom;
    
    container.style.cursor = 'grabbing';
    container.style.transition = 'none';
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    const newLeft = startLeft + deltaX;
    const newBottom = startBottom - deltaY;
    
    // 限制在视口范围内
    const maxLeft = window.innerWidth - container.offsetWidth;
    const maxBottom = window.innerHeight - container.offsetHeight;
    
    const clampedLeft = Math.max(0, Math.min(newLeft, maxLeft));
    const clampedBottom = Math.max(0, Math.min(newBottom, maxBottom));
    
    container.style.left = clampedLeft + 'px';
    container.style.bottom = clampedBottom + 'px';
    container.style.right = 'auto';
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      container.style.cursor = 'grab';
      container.style.transition = '';
    }
  });
  
  // ========== 滚动互动 ==========
  let lastScrollTop = 0;
  let scrollCooldown = false;
  
  window.addEventListener('scroll', () => {
    if (scrollCooldown) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      // 向下滚动
      if (Math.random() > 0.7) {
        showTip('慢慢看，别着急～', 2000);
        scrollCooldown = true;
        setTimeout(() => scrollCooldown = false, 10000);
      }
    }
    
    lastScrollTop = scrollTop;
  });
  
  // ========== 页面可见性 ==========
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      setTimeout(() => {
        showTip('你回来啦！我好想你～', 2500);
      }, 500);
    }
  });
  
  // ========== 样式优化 ==========
  // 添加过渡效果
  tip.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  img.style.transition = 'transform 0.3s ease';
  container.style.transition = 'left 0.1s ease, bottom 0.1s ease';
  
  // 初始隐藏提示框
  tip.style.opacity = '0';
  tip.style.transform = 'translateY(10px)';
  
})();
