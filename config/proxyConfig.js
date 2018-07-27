module.exports = {
	proxyList: {
		'/apis': {
			target: 'http://101.132.40.201',
			// target: 'http://192.168.1.131:8080',
			// target: 'http://192.168.1.122:8080',
			// target: 'http://localhost:8082',
			// target: 'http://192.168.1.119:8080',
			changeOrigin: true,
			pathRewrite: {
				'^/apis': ''
			}
		},
		'/devs': {
			target: 'http://192.168.1.122:8082',
			changeOrigin: true,
			pathRewrite: {
				'^/devs': ''
			}
		},
		'/llw': {
			target: 'http://192.168.1.122:8180',
			changeOrigin: true,
			pathRewrite: {
				'^/llw': ''
			}
		},
		'/servers': {
			target: 'http://192.168.1.119:8080',
			changeOrigin: true,
			pathRewrite: {
				'^/servers': ''
			}
		},		
		'/hqg': {
			target: 'http://192.168.2.100:8080',
			changeOrigin: true,
			pathRewrite: {
				'^/hqg': ''
			}
		}
	}
}