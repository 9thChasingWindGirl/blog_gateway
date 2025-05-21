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
		<title>BlogCDN 测速单页</title>
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
				background: rgba(255, 255, 255, 0.6);
				backdrop-filter: blur(10px);
				border-radius: 24px;
				padding: 30px;
				width: 480px;
				min-height: 620px;
				box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				transition: all 0.3s ease;
			}
			.container:hover {
				transform: translateY(-5px);
				box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
			}
			h1 {
				color: #1a1f36;
				font-size: 28px;
				font-weight: 700;
				text-align: center;
				margin: 0 0 30px 0;
				padding-bottom: 15px;
				position: relative;
			}
	
			h1::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 60px;
				height: 4px;
				background: #6bdf8f;
				border-radius: 2px;
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

			#testBtn {
				padding: 8px 16px;
				background-color: #007bff;
				border: none;
				border-radius: 4px;
				color: white;
				font-weight: bold;
				cursor: pointer;
				margin: 1em 0;
				transition: background-color 0.3s ease;
			}
			#testBtn:hover {
				background-color: #0056b3;
			}
			ul {
				list-style: none;
				width: 100%;
				padding: 0;
				margin: 0;
			}
			
			ul li {
				color: #1a1f36;
				font-size: 16px;
				line-height: 1.6;
				padding: 12px 15px;
				margin-bottom: 10px;
				background: rgba(255, 255, 255, 0.5);
				border-radius: 12px;
				align-items: center;
				transition: all 0.3s ease;
			}
			
			ul li:hover {
				background: rgba(255, 255, 255, 0.8);
				transform: translateX(5px);
			}
			
			.test-item {
				margin-bottom: 1em;
			}
			.label {
				font-weight: bold;
			}
			.progress-container {
				position: relative;
				width: 100%;
				height: 25px;
				background: linear-gradient(to right, green, orange, red);
				border-radius: 4px;
				overflow: hidden;
				margin: 5px 0;
			}
			.progress-bar {
				position: absolute;
				height: 100%;
				background: rgba(255,255,255,0.7);
				width: 0%;
				transition: width 0.5s ease-out;
			}
			.result-text {
				position: absolute;
				width: 100%;
				text-align: center;
				line-height: 25px;
				font-size: 14px;
				font-weight: bold;
				color: #000;
			}

			.label.lowest-latency {
				color: green !important;
				font-weight: bold;
				cursor: pointer;
				text-decoration: underline;
			}
			  
			.label.failed {
				color: red !important;
				cursor: default;
			}
			
			.clickable-link {
				color: #000000;
				text-decoration: underline;
				cursor: pointer;
			}
			@keyframes octocat-wave {
				0%, 100% { transform: rotate(0) }
				20%, 60% { transform: rotate(-25deg) }
				40%, 80% { transform: rotate(10deg) }
			}
			
			.github-corner:hover .octo-arm {
				animation: octocat-wave 560ms ease-in-out;
			}
			
			@media (max-width: 500px) {
				.github-corner {
					width: 60px;
					height: 60px;
				}
				.github-corner:hover .octo-arm {
					animation: none;
				}
				.github-corner .octo-arm {
					animation: octocat-wave 560ms ease-in-out;
				}
			}
		</style>
	</head>
	<body>
		<div class="container">
			<h1>BlogCDN 测速单页</h1>
			<div class="visitor-count">
				🧲🤣!!! 📈今日访问人数:<span id="visitCount">加载中...</span>
			</div>
			<div class="ip-address">
				您的 IP 地址: <span id="clientIP">${clientIP}</span>
			</div>

			<h2>测速结果：</h2>
			<div id="testContainer"></div>
			<button id="testBtn" onclick="startTest()">开始测速</button>
			<p>
			<a href="https://icp.gov.moe/?keyword=20250770" target="_blank">萌ICP备 20250770 号</a>
			</p>
		</div>
	

		<script>
			// 访问人数统计
			fetch('https://tongji.090227.xyz/?id=xn--sjq13yo4by51ezbkoum.dpdns.org')
				.then(r => r.json())
				.then(d => document.getElementById('visitCount').innerText = d.visitCount)
				.catch(e => document.getElementById('visitCount').innerText = '加载失败');

			const testSites = [
				{ name: 'Cloudflare 国际原生', url: 'https://xn--sjq13yo4by51ezbkoum.dpdns.org' },
				{ name: 'Cloudflare 国际加速', url: 'https://cdn.xn--sjq13yo4by51ezbkoum.dpdns.org' },
				{ name: 'Edgeone 国际原生', url: 'https://instant-richard.edgeone.app' },
				{ name: 'Vercel 国际加速', url: 'https://vercel.xn--sjq13yo4by51ezbkoum.dpdns.org' },
				{ name: 'Netlify 国际加速', url: 'https://netlify.xn--sjq13yo4by51ezbkoum.dpdns.org' }
			];

			const maxTime = 3000;
			let results = [];
			let finishedCount = 0;

			function startTest() {
				document.getElementById('testBtn').textContent = '重新测速';
				results = [];
				finishedCount = 0;

				const container = document.getElementById('testContainer');
				container.innerHTML = '';
				
				const ul = document.createElement('ul');
				
				testSites.forEach((site, index) => {
					const li = document.createElement('li');
					li.className = 'test-item';

					const label = document.createElement('span');
					label.className = 'label';
					label.textContent = site.name + '：' + site.url;
					label.dataset.url = site.url;
					label.style.flex = '1';  // 占满剩余空间
				
					const progressWrap = document.createElement('div');
					progressWrap.className = 'progress-container';
					progressWrap.style.flex = '0 0 150px'; // 固定宽度
				
					const bar = document.createElement('div');
					bar.className = 'progress-bar';
				
					const result = document.createElement('div');
					result.className = 'result-text';
					result.textContent = '测速中...';
				
					progressWrap.appendChild(bar);
					progressWrap.appendChild(result);
				
					li.appendChild(label);
					li.appendChild(progressWrap);
				
					ul.appendChild(li);
				
					testLatency(site.url, result, bar, index, label);
				});
				
				container.appendChild(ul);
				
			}

			function testLatency(url, resultElem, barElem, index, labelElem) {
				const testImg = new Image();
				const start = performance.now();
				let finished = false;

				testImg.onload = testImg.onerror = function () {
					if (finished) return;
					finished = true;
					const duration = Math.round(performance.now() - start);
					results[index] = duration;
					updateUI(duration, resultElem, barElem);
					checkAllFinished();
				};

				testImg.src = url + '/favicon.ico?_nocache=' + Date.now() + Math.random();

				setTimeout(() => {
					if (!finished) {
						finished = true;
						results[index] = null;
						updateUI('timeout', resultElem, barElem);
						checkAllFinished();
					}
				}, maxTime);
			}

			function updateUI(result, resultElem, barElem) {
				if (typeof result === 'number') {
					resultElem.textContent = result + ' ms';
					let percent = Math.min(result / maxTime * 100, 100);
					barElem.style.width = percent + '%';
					// 清除之前的颜色，后面统一处理
					resultElem.style.color = '';
				} else {
					resultElem.textContent = result === 'timeout' ? '超时⚠️' : '失败🚫';
					barElem.style.width = '100%';
					// 失败/超时标红
					resultElem.style.color = 'red';
				}
			}

			function checkAllFinished() {
				finishedCount++;
				if (finishedCount === testSites.length) {
					markLowestLatency();
					enableLinks();
				}
			}

			function markLowestLatency() {
				let minTime = null;
				let minIndex = -1;
				results.forEach((r, i) => {
				  if (r !== null && (minTime === null || r < minTime)) {
					minTime = r;
					minIndex = i;
				  }
				});
				if (minIndex !== -1) {
				  const container = document.getElementById('testContainer');
				  const items = container.querySelectorAll('.test-item');
				  const label = items[minIndex].querySelector('.label');
				  label.textContent += ' 👈';
				  // 改为添加class，不直接操作style.color
				  label.classList.add('lowest-latency');
				}
			  }
			  
			function enableLinks() {
				const container = document.getElementById('testContainer');
				const labels = container.querySelectorAll('.label');
				labels.forEach((label, i) => {
				  const resultText = label.nextElementSibling.querySelector('.result-text').textContent;
				  const url = label.dataset.url;
			  
				if (label.classList.contains('lowest-latency')) {
					// 最低延迟优先，绿色且可点
					label.classList.add('clickable-link');
					label.classList.remove('failed');
					label.onclick = () => window.open(url, '_blank');
				} else if (!resultText.includes('超时') && !resultText.includes('失败')) {
					// 正常链接，蓝色可点
					label.classList.add('clickable-link');
					label.classList.remove('failed');
					label.classList.remove('lowest-latency');
					label.onclick = () => window.open(url, '_blank');
				} else {
					// 失败/超时，红色，不可点
					label.classList.remove('clickable-link');
					label.classList.remove('lowest-latency');
					label.classList.add('failed');
					label.onclick = null;
				}
			});
		}
			  
		</script>
	</body>
	</html>
	`;

	return new Response(htmlContent, {
		headers: { 'content-type': 'text/html;charset=UTF-8' },
	});
}
