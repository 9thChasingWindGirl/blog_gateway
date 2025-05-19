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
        <title>BlogCDN 智能访问**</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-image: url('https://pic.imgdb.cn/item/66f6c978f21886ccc06c2337.jpg');
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
            .cdn-list {
                margin-top: 20px;
                text-align: left;
            }
            .cdn-item {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                position: relative;
            }
            .cdn-item p {
                font-size: 16px;
                line-height: 1.5;
                color: #333;
                margin: 0;
                width: 50%;
            }
            .latency-bar {
                flex-grow: 1;
                height: 10px;
                background-color: #ddd;
                border-radius: 5px;
                overflow: hidden;
                margin-left: 10px;
                position: relative;
            }
            .latency-fill {
                height: 100%;
                background-color: #4caf50;
                width: 0;
                transition: width 0.3s ease;
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
        </style>
    </head>
    <body>
        <div class="container">
            <h1>BlogCDN 智能访问**</h1>
            <div class="cdn-list">
                <div class="cdn-item">
                    <p>Cloudflare CDN:</p>
                    <div class="latency-bar"><div class="latency-fill" id="cloudflare-latency"></div></div>
                    <span id="cloudflare-time">测量中...</span>
                </div>
                <div class="cdn-item">
                    <p>Cloudflare1 CDN:</p>
                    <div class="latency-bar"><div class="latency-fill" id="cloudflare1-latency"></div></div>
                    <span id="cloudflare1-time">测量中...</span>
                </div>
                <div class="cdn-item">
                    <p>Cloudflare2 CDN:</p>
                    <div class="latency-bar"><div class="latency-fill" id="cloudflare2-latency"></div></div>
                    <span id="cloudflare2-time">测量中...</span>
                </div>
                <div class="cdn-item">
                    <p>Cloudflare3 CDN:</p>
                    <div class="latency-bar"><div class="latency-fill" id="cloudflare3-latency"></div></div>
                    <span id="cloudflare3-time">测量中...</span>
                </div>
                <div class="cdn-item">
                    <p>Cloudflare4 CDN:</p>
                    <div class="latency-bar"><div class="latency-fill" id="cloudflare4-latency"></div></div>
                    <span id="cloudflare4-time">测量中...</span>
                </div>
            </div>
            <div class="fastest" id="fastest-cdn">
                最快 CDN: 测量中...
            </div>
            <div class="visitor-count">
      🧲🤣!!! 📈今日访问人数:<span id="visitCount">加载中...</span>
  </div>
  <div class="ip-address">
      您的 IP 地址: <span id="clientIP">加载中...</span>
  </div>
  
  <script>
      // 获取访问人数
      fetch('https://tongji.090227.xyz/?id=blog.gxid.club')  // 请替换为你自己的域名ID
          .then(r => r.json())  // 将响应数据转为JSON格式
          .then(d => document.getElementById('visitCount').innerText = d.visitCount)  // 显示访问人数
          .catch(e => document.getElementById('visitCount').innerText = '加载失败');  // 错误处理
  
      // 获取客户端 IP 地址
      fetch('https://api.ipify.org?format=json')  // 通过该API获取用户的IP地址
          .then(response => response.json())  // 将响应数据转为JSON格式
          .then(data => document.getElementById('clientIP').innerText = data.ip)  // 显示IP地址
          .catch(e => document.getElementById('clientIP').innerText = '加载失败');  // 错误处理
  </script>
  
        <script>
            // 测试HTTP延迟的函数
            async function testLatency(url, elementId, timeId) {
                const start = Date.now();
                try {
                    const response = await fetch(url);  // 使用GET请求来测试完整的HTTP延迟
                    await response.text();  // 读取响应体，确保完全接收到数据
                } catch (error) {
                    // Ignore errors due to network or other issues
                }
                const latency = Date.now() - start;
                document.getElementById(timeId).textContent = latency + 'ms';
                document.getElementById(elementId).style.width = Math.min(100, (100 - (latency / 2))) + '%';
                return latency;
            }
  
            async function measureAllLatencies() {
                const results = await Promise.all([
                    testLatency('https://blbl.us.kg', 'cloudflare-latency', 'cloudflare-time'),
                    testLatency('https://blog.lwxpz.com', 'cloudflare1-latency', 'cloudflare1-time'),
                    testLatency('https://lwxpz.com', 'cloudflare2-latency', 'cloudflare2-time'),
                    testLatency('https://yx.lwxpz.com', 'cloudflare3-latency', 'cloudflare3-time'),
                    testLatency('https://laowang.us.kg', 'cloudflare4-latency', 'cloudflare4-time')
                ]);
  
                const cdns = ['Cloudflare', 'Cloudflare1', 'cloudflare2', 'cloudflare3', 'cloudflare4'];
                const fastestIndex = results.indexOf(Math.min(...results));
                document.getElementById('fastest-cdn').textContent = '最快 CDN: ' + cdns[fastestIndex] + ' ✅';
  
                // 自动跳转到最快的 CDN
                const fastestCDNUrls = [
                    'https://blbl.us.kg', 'https://blog.lwxpz.com', 'https://lwxpz.com', 'https://yx.lwxpz.com', 'https://laowang.us.kg'
                ];
                window.location.href = fastestCDNUrls[fastestIndex];
            }
  
            // 开始测量延迟
            measureAllLatencies();
        </script>
    </body>
    </html>
    `;
  
    // 返回 HTML 响应
    return new Response(htmlContent, {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
    });
  }
  
