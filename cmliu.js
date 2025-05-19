let urls = [
	'https://xn--sjq13yo4by51ezbkoum.dpdns.org/# [国际原生]Cloudflare',
	'https://cdn.xn--sjq13yo4by51ezbkoum.dpdns.org/# [国际加速]Cloudflare',
	'https://instant-richard.edgeone.app/# [国际原生]Edgeone',
	'https://vercel.xn--sjq13yo4by51ezbkoum.dpdns.org/# [国际加速]Vercel',
	'https://netlify.xn--sjq13yo4by51ezbkoum.dpdns.org/# [国际加速]Netlify'
];

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const path = url.pathname;
		const params = url.search;

		// 如果 env.URLS 存在，则添加到数组
		if (env.URL) urls = await ADD(env.URL);
		
		const ads = env.ADS || '';
		const 网站图标 = env.ICO || 'https://xn--sjq13yo4by51ezbkoum.dpdns.org/favicon.ico';
		const 网站头像 = env.PNG || 'https://cdn.jsdelivr.net/gh/9thChasingWindGirl/imageGO/image/69580996.jpg';
		const 网络备案 = env.BEIAN || `<a href='https://icp.gov.moe/?keyword=20250770/'><img src="https://icp.gov.moe/favicon.ico" style="width:16px;height:16px;vertical-align:middle;margin-right:4px;" alt="萌ICP备图标">萌ICP备-20250770号</a>`;
		const 网页标题 = env.TITLE || 'BlogCDN 智能访问网关';
		const 站点名称 = env.NAME || "速溶理查's Blog";
		if (url.pathname.toLowerCase() == '/ads.txt') {
			return new Response(ads, {
				headers: {
					'content-type': 'text/plain;charset=UTF-8'
				}
			});
		} else if (url.pathname.toLowerCase() == '/favicon.ico') {
			return fetch(网站图标);
		} else {
			// 先测速，不加载背景图片
			let img = ''; // 默认图片
			if (env.IMG) {
				const imgs = await ADD(env.IMG);
				img = imgs[Math.floor(Math.random() * imgs.length)];
			}

			// 生成将 urls 数组传递给前端 JavaScript 的 HTML
			const html = `
			<!DOCTYPE html>
			<html lang="zh-CN">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>${站点名称} - ${网页标题}</title>
				<style>
					* {
						margin: 0;
						padding: 0;
						box-sizing: border-box;
					}
					
					body {
						font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
						margin: 0;
						padding: 0;
						background-image: url('${img}');
						background-size: cover;
						background-position: center;
						background-attachment: fixed;
						min-height: 100vh;
						display: flex;
						justify-content: center;
						align-items: center;
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
			
					.logo-container {
						position: relative;
						width: 180px;
						height: 180px;
						margin-bottom: 20px;
					}
			
					.logo {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						border: 8px solid white;
						box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
						animation: pulse 2s infinite;
						object-fit: cover;
					}
			
					@keyframes pulse {
						0% {
							box-shadow: 0 0 0 0 rgba(107, 223, 143, 0.4);
						}
						70% {
							box-shadow: 0 0 0 20px rgba(107, 223, 143, 0);
						}
						100% {
							box-shadow: 0 0 0 0 rgba(107, 223, 143, 0);
						}
					}

					@keyframes blink {
						0% { opacity: 1; }
						50% { opacity: 0.6; }
						100% { opacity: 1; }
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
			
					.description {
						width: 100%;
						padding: 0 15px;
						margin-bottom: 15px;
						font-weight: 600;  // 添加这一行来加粗文字
					}
			
					ul {
						list-style: none;
						width: 100%;
					}
			
					ul li {
						color: #1a1f36;
						font-size: 16px;
						line-height: 1.6;
						padding: 12px 15px;
						margin-bottom: 10px;
						background: rgba(255, 255, 255, 0.5);
						border-radius: 12px;
						display: flex;
						justify-content: space-between;
						align-items: center;
						transition: all 0.3s ease;
					}
			
					ul li:hover {
						background: rgba(255, 255, 255, 0.8);
						transform: translateX(5px);
					}

					.beian-info a {
						color: var(--primary-color);
						text-decoration: none;
						border-bottom: 1px dashed var(--primary-color);
						padding-bottom: 2px;
					}

					.beian-info a:hover {
						border-bottom-style: solid;
					}
			
					#visitCount, #liveuser {
						font-weight: 600;
						color: #2d3748;
						margin: 0 4px;
					}

					.github-corner {
						position: fixed;
						top: 0;
						right: 0;
						z-index: 1000;
					}

					.github-corner svg {
						position: absolute;
						top: 0;
						right: 0;
						border: 0;
						fill: #6bdf8f;
						color: #ffffff;
						width: 80px;
						height: 80px;
						transition: fill 0.3s ease;
					}
					
					.github-corner:hover svg {
						fill: #5bc77d;
					}
					
					.github-corner .octo-arm {
						transform-origin: 130px 106px;
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
				<a href="https://github.com/9thChasingWindGirl" target="_blank" class="github-corner" aria-label="View source on Github">
					<svg viewBox="0 0 250 250" aria-hidden="true">
						<path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
						<path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
						<path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
					</svg>
				</a>
				<div class="container">
					<div class="logo-container">
						<img class="logo" src="${网站头像}" alt="Logo">
					</div>
					<h1>${网页标题}</h1>
					<ul class="description" id="urls"></ul>
					<div class="beian-info" style="text-align: center; font-size: 13px;">
						${网络备案}
					</div>
				</div>
				<script>
					const urls = ${JSON.stringify(urls)};
					
					// 动态生成URL列表
					const ul = document.getElementById("urls");
					urls.forEach((url, index) => {
						const [testUrl, name] = url.split('#');
						const li = document.createElement("li");
						li.id = \`result\${index}\`;
						li.innerHTML = \`\${name} <span id="latency\${index}">测速中...</span>\`;
						ul.appendChild(li);
					});
			
					const timeout = 3000;
			
					function testLatency(url) {
						return new Promise((resolve) => {
							const start = Date.now();
							const xhr = new XMLHttpRequest();
							xhr.open('HEAD', url, true);
							xhr.timeout = timeout;
			
							xhr.onload = function () {
								const latency = Date.now() - start;
								if (xhr.status === 200) {
									resolve({ url, latency });
								} else {
									resolve({ url, latency: \`状态码: \${xhr.status}\` });
								}
							};
			
							xhr.ontimeout = function () {
								resolve({ url, latency: \`响应超时 \${timeout}ms\` });
							};
			
							xhr.onerror = function () {
								resolve({ url, latency: '请求失败' });
							};
			
							xhr.send();
						});
					}
			
					function getLatencyColor(latency) {
						if (latency <= 100) return '#22c55e';
						if (latency <= 200) return '#84cc16';
						if (latency <= 500) return '#eab308';
						if (latency <= 1000) return '#f97316';
						if (latency > 1000) return '#ef4444';
						return '#dc2626';
					}
			
					// 只需要修改 runTests 函数中处理最快结果的部分:

					async function runTests() {
						const results = await Promise.all(urls.map(url => {
							const [testUrl, name] = url.split('#');
							return testLatency(testUrl).then(result => ({
								...result,
								name
							}));
						}));

						results.forEach((result, index) => {
							const li = document.getElementById(\`result\${index}\`);
							const latencySpan = document.getElementById(\`latency\${index}\`);
							if (typeof result.latency === 'number') {
								latencySpan.textContent = \`\${result.latency}ms\`;
								latencySpan.style.color = getLatencyColor(result.latency);
							} else {
								latencySpan.textContent = result.latency;
								latencySpan.style.color = '#dc2626';
							}
						});

						const validResults = results.filter(result => typeof result.latency === 'number');
						if (validResults.length > 0) {
							const fastest = validResults.reduce((prev, current) => 
								(prev.latency < current.latency ? prev : current), validResults[0]);

							results.forEach((result, index) => {
								if (result.name === fastest.name) {
									const li = document.getElementById(\`result\${index}\`);
									li.style.background = 'rgba(107, 223, 143, 0.3)';
									li.style.border = '2px solid rgba(107, 223, 143, 0.5)';
									li.style.transform = 'translateX(5px)';
								}
							});

							const currentPath = '${path}';
							const currentParams = '${params}';
							const redirectUrl = fastest.url + currentPath + currentParams;
							window.location.href = redirectUrl;
						}
					}
			
					window.onload = runTests;
				</script>
			</body>
			</html>
			`;

			return new Response(html, {
				headers: { 'content-type': 'text/html;charset=UTF-8' }
			});
		}
	}
};

// 辅助函数：将env.URLS字符串处理成数组
async function ADD(envadd) {
	// 将制表符、双引号、单引号和换行符都替换为逗号
	// 然后将连续的多个逗号替换为单个逗号
	var addtext = envadd.replace(/[	|"'\r\n]+/g, ',').replace(/,+/g, ',');
	
	// 删除开头和结尾的逗号（如果有的话）
	if (addtext.charAt(0) == ',') addtext = addtext.slice(1);
	if (addtext.charAt(addtext.length - 1) == ',') addtext = addtext.slice(0, addtext.length - 1);
	
	// 使用逗号分割字符串，得到地址数组
	const add = addtext.split(',');

	return add;
}
