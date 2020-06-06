let url, name

if (window.location.href.includes('localhost')) {
    name = 'middle-system'
    url = 'http://k-platform.djson.cn'
} else if(window.location.href.includes('middle-platform')) {
    name = 'middle-system-in'
    url = 'http://k-platform.djson.cn'
} else if(window.location.href.includes('ocean.dangkou.net')) {
    name = 'middle-system-net'
    url = 'http://k-platform.dangkou.net'
}

let data = {
    url, name
}

export default data