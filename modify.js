addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
	const clientIP = request.headers.get('cf-connecting-ip') || '无法获取';
  
	const htmlContent = `
	<!DOCTYPE html>
	<html lang="zh-CN">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>BlogCDN 智能访问</title>
		<style>
			body {
				font-family: Arial, sans-serif;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100vh;
				margin: 0;
				background-image: url('');
				background-size: cover;
				background-position: center;
				color: #333;
			}
			.container {
				background-color: rgba(255, 255, 255, 0.85);
				padding: 30px;
				border-radius: 10px;
				max-width: 400px;
				text-align: center;
				box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
			}
			h1 {
				font-size: 24px;
				color: #333;
				margin-bottom: 20px;
			}

			.cdn-item {
				display: grid;
				grid-template-columns: 1fr 1.5fr auto;
				align-items: center;
				gap: 10px;
				margin-bottom: 12px;
			}
			  
			  .cdn-item p {
				font-size: 16px;
				line-height: 1.4;
				color: #333;
				margin: 0;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.latency-bar {
				  width: 100%;
				  height: 10px;
				  background-color: #eee;
			 	  border-radius: 5px;
			 	  overflow: hidden;
				  position: relative;
			}

			.latency-fill {
				  height: 100%;
				  width: 0;
				  transition: width 0.3s ease;
				  background: linear-gradient(to right, #4caf50, #ff9800, #f44336); /* 绿 → 橙 → 红 */
			}

			.fastest {
				font-weight: bold;
				color: green;
				margin-top: 20px;
				font-size: 18px;
			}
			.visitor-count {
				font-size: 14px;
				color: #666;
				margin-top: 10px;
			}
			.ip-address {
				font-size: 14px;
				color: #555;
				margin-top: 15px;
				font-style: italic;
			}
			#countdown {
				margin-top: 10px;
				color: red;
				font-weight: bold;
			}
			#cancel-btn {
				margin-top: 10px;
				background-color: #f44336;
				color: white;
				border: none;
				padding: 8px 16px;
				border-radius: 5px;
				cursor: pointer;
				font-size: 14px;
				display: none;
			}
			#cancel-btn:hover {
				background-color: #d32f2f;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<h1>BlogCDN 智能访问</h1>
			<div class="cdn-list">
				<div class="cdn-item">
					<p>[国际原生]Cloudflare:</p>
					<div class="latency-bar"><div class="latency-fill" id="cloudflare1-latency"></div></div>
					<span id="cloudflare1-time">测量中...</span>
				</div>
				<div class="cdn-item">
					<p>[国际加速]Cloudflare:</p>
					<div class="latency-bar"><div class="latency-fill" id="cloudflare2-latency"></div></div>
					<span id="cloudflare2-time">测量中...</span>
				</div>
				<div class="cdn-item">
					<p>[国际原生]Edgeone:</p>
					<div class="latency-bar"><div class="latency-fill" id="edgeone-latency"></div></div>
					<span id="edgeone-time">测量中...</span>
				</div>
				<div class="cdn-item">
					<p>[国际加速]Vercel:</p>
					<div class="latency-bar"><div class="latency-fill" id="vercel-latency"></div></div>
					<span id="vercel-time">测量中...</span>
				</div>
				<div class="cdn-item">
					<p>[国际加速]Netlify:</p>
					<div class="latency-bar"><div class="latency-fill" id="netlify-latency"></div></div>
					<span id="netlify-time">测量中...</span>
				</div>
			</div>
			<div class="fastest" id="fastest-cdn">最快 CDN: 测量中...</div>
			<div id="countdown"></div>
			<button id="cancel-btn">取消跳转</button>
			<div class="visitor-count">
				🧲🤣!!! 📈今日访问人数:<span id="visitCount">加载中...</span>
			</div>
			<div class="ip-address">
				您的 IP 地址: <span id="clientIP">${clientIP}</span>
			</div>
		</div>
  
		<script>
			let countdownTimer;
			let redirectCanceled = false;
  
			// 访问人数统计
			fetch('https://tongji.090227.xyz/?id=xn--sjq13yo4by51ezbkoum.dpdns.org')
				.then(r => r.json())
				.then(d => document.getElementById('visitCount').innerText = d.visitCount)
				.catch(e => document.getElementById('visitCount').innerText = '加载失败');
  
			// 测试延迟
			async function testLatency(url, barId, timeId) {
				const start = Date.now();
				try {
					const response = await fetch(url);
					await response.text();
				} catch (e) {}
				const latency = Date.now() - start;
				document.getElementById(timeId).textContent = latency + 'ms';
				document.getElementById(barId).style.width = Math.min(100, (100 - latency / 2)) + '%';
				return latency;
			}
  
			async function measureAllLatencies() {
				const results = await Promise.all([
					testLatency('https://xn--sjq13yo4by51ezbkoum.dpdns.org/', 'cloudflare1-latency', 'cloudflare1-time'),
					testLatency('https://cdn.xn--sjq13yo4by51ezbkoum.dpdns.org/', 'cloudflare2-latency', 'cloudflare2-time'),
					testLatency('https://instant-richard.edgeone.app/', 'edgeone-latency', 'edgeone-time'),
					testLatency('https://vercel.xn--sjq13yo4by51ezbkoum.dpdns.org/', 'vercel-latency', 'vercel-time'),
					testLatency('https://netlify.xn--sjq13yo4by51ezbkoum.dpdns.org/', 'netlify-latency', 'netlify-time')
				]);
  
				const cdns = ['Cloudflare 国际原生', 'Cloudflare 国际加速', 'Edgeone 国际原生', 'Vercel 国际加速', 'Netlify 国际加速'];
				const urls = [
					'https://xn--sjq13yo4by51ezbkoum.dpdns.org/',
					'https://cdn.xn--sjq13yo4by51ezbkoum.dpdns.org/',
					'https://instant-richard.edgeone.app/',
					'https://vercel.xn--sjq13yo4by51ezbkoum.dpdns.org/',
					'https://netlify.xn--sjq13yo4by51ezbkoum.dpdns.org/'
				];
				const fastestIndex = results.indexOf(Math.min(...results));
				const fastestName = cdns[fastestIndex];
				const fastestURL = urls[fastestIndex];
				document.getElementById('fastest-cdn').textContent = '最快 CDN: ' + fastestName + ' ✅';
  
				// 倒计时跳转逻辑
				let secondsLeft = 7;
				const countdownEl = document.getElementById('countdown');
				const cancelBtn = document.getElementById('cancel-btn');
				cancelBtn.style.display = 'inline-block';
  
				countdownEl.textContent = '将在 ' + secondsLeft + ' 秒后跳转至 ' + fastestName;
				countdownTimer = setInterval(() => {
					if (redirectCanceled) {
						clearInterval(countdownTimer);
						countdownEl.textContent = '跳转已取消';
						return;
					}
					secondsLeft--;
					if (secondsLeft > 0) {
						countdownEl.textContent = '将在 ' + secondsLeft + ' 秒后跳转至 ' + fastestName;
					} else {
						clearInterval(countdownTimer);
						countdownEl.textContent = '正在跳转中...';
						window.location.href = fastestURL;
					}
				}, 1000);
  
				cancelBtn.onclick = () => {
					redirectCanceled = true;
					cancelBtn.disabled = true;
					cancelBtn.innerText = '已取消';
				};
			}
  
			measureAllLatencies();
		</script>
	</body>
	</html>
	`;
  
	return new Response(htmlContent, {
	  headers: { 'content-type': 'text/html;charset=UTF-8' },
	});
  }
  
