import"./hoisted.ChRvRewF.js";const d=document.getElementById("sakuraContainer"),l=15;for(let t=0;t<l;t++){const e=document.createElement("div");e.className="sakura",e.style.left=Math.random()*100+"%",e.style.animationDuration=Math.random()*5+10+"s",e.style.animationDelay=Math.random()*5+"s",e.style.width=Math.random()*6+8+"px",e.style.height=e.style.width,d.appendChild(e)}const u=document.getElementById("nameInput"),o=document.getElementById("contentInput"),s=document.getElementById("submitBtn"),i=document.getElementById("messageList"),v=[{name:"初音未来",avatar:"🎵",content:"欢迎来到柳卿烟的小窝～记得留下你的足迹哦！",time:new Date(Date.now()-864e5).toISOString()},{name:"樱花精灵",avatar:"🌸",content:"樱花飘落之时，便是相遇之刻～",time:new Date(Date.now()-36e5).toISOString()}];function r(){const t=localStorage.getItem("guestbook_messages");return t?JSON.parse(t):v}function g(t){localStorage.setItem("guestbook_messages",JSON.stringify(t))}function f(t){const e=new Date(t),n=new Date-e;return n<6e4?"刚刚":n<36e5?Math.floor(n/6e4)+"分钟前":n<864e5?Math.floor(n/36e5)+"小时前":n<6048e5?Math.floor(n/864e5)+"天前":e.toLocaleDateString("zh-CN")}function m(){const t=r();if(t.length===0){i.innerHTML=`
						<div class="empty-state">
							<div class="empty-icon">💌</div>
							<div class="empty-title">还没有留言呢</div>
							<div class="empty-desc">
								快来留下第一条留言吧～<br />
								你的话会被好好保存的哦！
							</div>
						</div>
					`;return}i.innerHTML=t.map(e=>`
					<div class="message-card">
						<div class="message-header">
							<div class="message-avatar">${e.avatar||"😊"}</div>
							<div class="message-info">
								<div class="message-name">${e.name||"匿名小可爱"}</div>
								<div class="message-time">${f(e.time)}</div>
							</div>
						</div>
						<div class="message-content">${e.content}</div>
					</div>
				`).join("")}s.addEventListener("click",()=>{const t=u.value.trim()||"匿名小可爱",e=o.value.trim();if(!e){alert("留言内容不能为空哦～");return}const a=r(),n=["😊","🌸","🎵","⭐","🌙","💫","🎀","🍀"],c={name:t,avatar:n[Math.floor(Math.random()*n.length)],content:e,time:new Date().toISOString()};a.unshift(c),g(a),m(),o.value="",s.textContent="✅ 留言成功！",setTimeout(()=>{s.textContent="🌸 发送留言"},2e3)});m();
