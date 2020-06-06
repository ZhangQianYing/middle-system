import Qs from 'qs'
import axios from 'axios';
import lib from './lib';
var Rxports = {
    /**
     * 封装axios，减少学习成本，参数基本跟jq ajax一致
     * @param {String} type         请求的类型，默认post
     * @param {String} url              请求地址
     * @param {String} time         超时时间
     * @param {Object} data         请求参数
     * @param {String} dataType     预期服务器返回的数据类型，xml html json ...
     * @param {Object} headers          自定义请求headers
     * @param {Function} success        请求成功后，这里会有两个参数,服务器返回数据，返回状态，[data, res]
     * @param {Function} error      发送请求前
     * @param return 
     */
    ajax: function(opt) {
        let opts = opt || {};
        let arr = ''
        if ($cookies.isKey(lib.name)) {
            arr = $cookies.get(lib.name)
        }

        if (!opts.url) {
            alert('请填写接口地址');
            return false;
        }
        axios({
            method: opts.type || 'post',
            url: opts.url,
            params: opts.params || {},
            data: opts.data || {},
            headers: opts.headers || {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': arr,
            },
            baseURL: opts.baseURL || lib.url,
            timeout: opts.time || 10 * 1000,
            responseType: opts.dataType || 'json',
            transformRequest: opts.transformRequest || [function(data) {
                data = Qs.stringify(data);
                return data;
            }],
        }).then(function(res) {
            if(res.data.status == 401){
                $cookies.remove(lib.name)
                window.location.href="/#/login"
            }
           
            if (opts.success) {
                //对接受的数据进行JSON处理
                opts.success(res.data, res.data);
            }
            if (opts.error) {
                opts.error(res.data);
            }

        }).catch(function(error) {
            if (opts.error) {

            } else {
                
            }
        });

    },
};

export default Rxports;