let url, name

if (window.location.href.includes('localhost')) {
    name = 'middle-system'
    url = 'http://z-refund.djson.cn'
}

let data = {
    url, name
}

export default data