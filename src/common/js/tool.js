
var tool = {
    formatDate: function(cdate,fmt){

            var o = {
                "M+": cdate.getMonth() + 1, //月份 
                "d+": cdate.getDate(), //日 
                "h+": cdate.getHours(), //小时 
                "m+": cdate.getMinutes(), //分 
                "s+": cdate.getSeconds(), //秒 
                "q+": Math.floor((cdate.getMonth() + 3) / 3), //季度 
                "S": cdate.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (cdate.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) 
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
    },
    changeFormat: function(data){
        var newData = {};

        for(var key in data){
            newData['file_name'] = data['name'];
            newData['file_type'] = data['fileType'];
            newData['download_url'] = data['url'];
            newData['file_duration'] = data['videoTime'];
            newData['file_size'] = data['size'];
            newData['id'] = data['id'];
            newData['img'] = data['img'];
        }

        return newData;
    },
    getSelect: function(item,clsn,rs,d){
        item.parentNode.classList.toggle(clsn);

        var data = this.lget('file_list_'+rs) ? this.lget('file_list_'+rs) : [];
        var record = [];

        if(item.parentNode.classList.contains(clsn)){
            
            data.push(this.changeFormat(d))
            
            //数组去重复    
            record = [...new Set(data)];

        }else{
            for(var i=0;i<data.length;i++){
                if(data[i].id == d.id){
                  data.splice(i,1);
                }
            }
            record = data;
        }

        //存入本地
        this.lset('file_list_'+rs,data);
        
        return record;
    },
    concatArray: (arr1,arr2)=>{
        let newArr = [];

        for(var i=0;i<arr1.length;i++){
            newArr.push(arr1[i]);
        }

        for(i=0;i<arr2.length;i++){
            newArr.push(arr2[i]);
        }

        return newArr;
    },
    //获取上传视频的总长度
    getVideoDuration: function(file){
        var duration = 0;
        var video = document.createElement('video');
        video.src = URL.createObjectURL(file);
        video.preload = 'metadata';

        var promise = new Promise(
            function(resolve,reject){
                video.onloadedmetadata = function() {
                    URL.revokeObjectURL(video.src);
                    duration = video.duration; 
                    resolve(duration);
                    video.remove();
                }
            }
        )

        return promise;
    },
    //检测上传文件的类型
    checkFileType(file){
        var reImg = /image/g;
        var reVideo = /video/g;

        if(reImg.test(file.type)){
            return 0;
        }else if(reVideo.test(file.type)){
            return 1;
        }
    },
    //配置文件上传获取签名的参数
    getUploadAttr: function(file,cdir,fn){
        //默认参数
        let attr = {
            fileName: '',
            dir: cdir,
            fileType: 0,
            videoTime: 0
        }; 

        //1. 检测上传文件类型
        var type = this.checkFileType(file);

        //2. 配置参数
        attr.fileName = file.name;

        //3.如果是视频类型
        if(type === 1){
            this.getVideoDuration(file).then((dur)=>{
                attr.fileType = 1;
                attr.videoTime = dur;
                fn(attr);
            });
        }else{
            fn(attr);
        }
    },
    //随机文件名字符串
    randomString: function (len) {
    　　len = len || 32;
    　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
    　　var maxPos = chars.length;
    　　var pwd = '';
    　　for (var i = 0; i < len; i++) {
        　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    //取文件后缀名称
    getBackname: function(file){
        var re = /\.[^\.]+$/;
        var houzui = re.exec(file.name);
        return houzui[0];
    },
    //将字符串转换成16进制
    stringToHex: function(str){
　　　　 var shi = parseInt(str,2);
        //var shiliu = shi.toString(16);

        return shi;
　　},
    //设置本地存储对象
    lset: function(name,value){
        localStorage.setItem(name, JSON.stringify(value));
    },
    lget: function (name) {
        return JSON.parse(localStorage.getItem(name))
    },
    ladd: function (name, addVal) {
        let oldVal = this.lget(name)
        let newVal = oldVal.concat(addVal)
        this.lset(name, newVal)
    },
    //计算并且统计时间
    countTimes: function(time1,time2,weeks){
        var t1 = this.changeTimetoSecond(time1);
        var t2 = this.changeTimetoSecond(time2) - t1;
        var w = this.stringToHex(this.changeWeek(weeks));

        return {
          'time': time1+'-'+time2,
          'date': weeks.join(','),
          "start": t1,
          "duration": t2,
          "weeks":  w
        }
    },
    //把星期换算成十六进制
    changeWeek(week){
        var weekIndex = {'sun':0,'mon':1,'tue':2, 'web': 3, 'thu': 4, 'fri':5, 'sat': 6};
        var initWeekArr = [0,0,0,0,0,0,0];

        //获取坐标
        var getIndexs = [];

        for(var i=0;i<week.length;i++){
            getIndexs.push(weekIndex[week[i].toLowerCase()])
        }

        for(i=0;i<getIndexs.length;i++){
            initWeekArr[getIndexs[i]] = 1;
        }

        return initWeekArr.join('');
    },
    //把时间换算成秒
    changeTimetoSecond(time){
        var arr = time.split(':');
        var senconds = arr[0]*60*60 + arr[1]*60;
        return senconds;
    },
    //处理时间成数组返回
    handleTime: function(data)
    {   

        var os = [];
        var ms = []; 

        //注意： 进制处理
        for(var i=0;i<data.length;i++){
           var str = data[i].weeks.toString(2);
           ms.push([data[i].start,data[i].duration,this.addZoomBefore(str,7)]);
        }

        return ms;
    },
    //前面补零
    addZoomBefore(str,len){
        var dis = 0;
        var s = '';

        if(str.length < len){
            dis = len - str.length;

            for(var i=0;i<dis;i++){
                s += '0'
            }

            return (s+str);
        }else{
            return str;
        }

    },
    //换算比例 把时间换算成高度
    countPercent(ih,arr){
        var tH = 24*60*60;
        var per = ih/tH;

        var newArr = [];
        for(var i=0;i<arr.length;i++){
            newArr.push([Math.floor(arr[i][0]*per),Math.floor(arr[i][1]*per),arr[i][2]]);
        }
        
        return newArr;
    },
    //创建颜色块
    createColorblock(pclsn,clsn,data,color,storageName){
        var p = document.getElementsByClassName(pclsn);
        
        for(var i=0;i<data.length;i++){
            for(var j=0;j<p.length;j++){
                if(data[i][2].charAt(j) == 1){
                    p[j].innerHTML += `<span class="cwb" data-storage="${storageName}" style="display:block;width:100%;position:absolute;left:0;top:${data[i][0]}px;height:${data[i][1]}px;background-color:${color};"></span>`;
                }
            }
        }
    },
    checkTime: function(arr1,obj){
        
        var x1 = 0;
        var x2 = 0;
        var t1 = obj.start;
        var t2 = t1+obj.duration;


        for(var i=0;i<arr1.length;i++){
            x1 = arr1[i].start;
            x2 = x1+arr1[i].duration;

             //如果不重叠
            if(t2 <= x1 || t1 >= x2){

                if(i == arr1.length-1){
                    return false;
                }
                
            }else{
                return true;
            }

        }
    },
    //组装数据
    packageData: function(username){
        //1. 格式
        var programs = {
            "date": tool.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss"),
            "username": username,
            "program":[],
            "url_prefix": "https://skylander-dbs.oss-cn-hongkong.aliyuncs.com"
        }

        var program = {};
        var model_type_1 = {}; 
        var model_type_2 = {}; 
        var model_type_3 = {};    

        //2. 统计公共节目状态
        model_type_1 = this.cProgamWorkStatus('file_list_on','time_list_on');
        model_type_2 = this.cProgamWorkStatus('file_list_off','time_list_off');
        model_type_3 = this.cProgamWorkStatus('file_list_full','time_list_full');        

        
        if(model_type_1 || model_type_2 || model_type_3){
            
        }else{
            return false;
        }

        program = {
            'model_type_1': model_type_1,
            'model_type_2': model_type_2,
            'model_type_3': model_type_3
        }

        programs['program'] = program;

        return programs;
    },
    cProgamWorkStatus(sfn,stn){

        var data  = this.lget(sfn);
        var tdata = this.lget(stn);
        var file_list = [];
        var time_list = [];
        var obj = {};

        if(!data || !tdata || data.length == 0 || tdata.length == 0){
            return {
                file_list:[],
                time_list:[]
            };
        }

        for(var i=0;i<data.length;i++){
            file_list.push({/*
                  "file_name":data[i].file_name,*/
                  "file_type":data[i].file_type,
                  "download_url": tool.replaceUrl(data[i].download_url,'https://skylander-dbs.oss-cn-hongkong.aliyuncs.com'),
                  "file_size":data[i].file_size,
                  "file_duration":parseInt(data[i].file_duration) ? parseInt(data[i].file_duration) : 15
            })
        }

        for(var i=0;i<tdata.length;i++){
            time_list.push({
              "start":tdata[i].start,
              "duration":tdata[i].duration,
              "weeks":tdata[i].weeks
            })
        }

        obj = {
            'file_list' : file_list,
            'time_list' : time_list
        };

        return obj
    },
    replaceUrl(nUrl,str){
        return nUrl.replace(str,'');
    },
    checkTimelists: function(){
        var t1 = this.lget('time_list_on');
        var t2 = this.lget('time_list_off');
        var t3 = this.lget('time_list_full');

        if(t1.length>0 || t2.length>0 || t3.length>0){
            return true;
        }else{
            return false;
            //清空所有色块
        }
    },
    //重绘
    reDraws: function(pcls){
        //删除以前所有的数据
        //重新绘制
        var parents = document.getElementsByClassName(pcls);
        //var cls = document.getElementsByClassName(cls);

        for(var i=0;i<parents.length;i++){
            parents[i].innerHTML = '';
        }
        
    },
    drawRedConflict: function(){

        var locals = ['time_list_on','time_list_off','time_list_full'];
        var arrs = [];
        var alls = [];

        for(var i=0;i<locals.length;i++){

            if(!!tool.lget(locals[i]) && tool.lget(locals[i]).length>0){
                var data = tool.lget(locals[i]);
                var arr = tool.handleTime(data);

                var height = 144;

                //2. 换算比例
                var harr = tool.countPercent(height,arr);

                arrs.push(harr);
            }else{
                continue;
            } 
        }

        for(var i=0;i<arrs.length;i++)
        {
            for(var j=0;j<arrs[i].length;j++){
                alls.push(arrs[i][j]);
            }
        }  
        
        this.countWeeksTimes(alls);
    },
    //统计每个星期对应的所有时间段
    countWeeksTimes: function(alls){
        var weeks = ['sun','mon','tue','web','thr','fri','sat'];
        var day = '';
        var timelines = '';
        var ts = {
            'sun': [],
            'mon': [],
            'tue': [],
            'web': [],
            'thr': [],
            'fri': [],
            'sat': []
        };
        var arr = new Array();

        var key = 0;
        for(var i=0;i<alls.length;i++){
           timelines = alls[i][2];
           for(var n=0;n<timelines.length;n++){
                if(timelines[n] == 1){
                    day = weeks[n];
                    arr = new Array();
                    ts[day].push([alls[i][0],alls[i][1]]);
                }
           }
        }

        this.getRedBoxArray(ts);
    },
    getRedBoxArray(data){
        var datas = data;
        var arr = [[12,43],[22,10]];
        var rArr = [];
        var newPos = [];
        var redboxs = {
            '0' : [],
            '1' : [],
            '2' : [],
            '3' : [],
            '4' : [],
            '5' : [],
            '6' : []
        }
        var index = 0;
        var cv = null;

        for(var key in datas){
            //获取一周中每一天的新坐标
            if(datas[key].length>1){
                for(var i=0;i<datas[key].length;i++){
                    cv = datas[key][i];
                    for(var j=i+1;j<datas[key].length;j++){
                        //获取红色区块坐标二位数组
                        if(this.getRepeatBox(datas[key][j],cv)){
                            redboxs[index].push(this.getRepeatBox(datas[key][j],cv))
                        }
                    }
                }
            }

            index++;
        }

        //绘制红色区块
        this.drawRedBox(redboxs);
    },
    drawRedBox(data){
        //console.log(data[0]);

        var p = document.getElementsByClassName('child-lists-wrap');
        

        for(var key in data){
           for(var i=0;i<data[key].length;i++){
                p[key].innerHTML += `<span class="cwb cwb-repeat" style="display:block;width:100%;position:absolute;left:0;top:${data[key][i][0]}px;height:${data[key][i][1]}px;background-color:red;z-index:10;"></span>`;
           }
        }

    },
    //一对坐标对比算法
    getRepeatBox(arr1,arr2){
        var s1 = arr1[0];
        var e1 = s1 + arr1[1];

        var s2 = arr2[0];
        var e2 = s2 + arr2[1];

        var ns = 0;
        var ne = 0;

        //检测是否重叠
        //1. 如不不重叠
        if(e2 <= s1 || s2 >= e1){
            return false;
        }else{
            //1. 完全外包裹重叠
            if(s1>s2 && e1<e2){
                ns = s1;
                ne = e1;
            }
            //2.完全内包裹重叠
            if(s1<s2 && e2<e1){
                ns = s2;
                ne = e2;
            }
            //3. 上半部分重叠
            if(s2<s1 && e2>s1 && e2<e1){
                ns = s1;
                ne = e2;
            }
            //4. 下半部分重叠
            if(e2>e1 && s2>s1 && s2<e1){
                ns = s2;
                ne = e1;
            }

            return [ns,ne-ns];  
        }
    },
    //检测时间是否重复
    checkTimeRepeat: function(){
        var boxs = document.getElementsByClassName('cwb-repeat');
        if(boxs.length > 1){
            return true;
        } else{
            return false;
        }  
    },
    //通过素材选择情况来判断是否有时间添加
    checkTimeByFolder(){
        var times = ['time_list_on','time_list_off','time_list_full'];
        var files = ['file_list_on','file_list_off','file_list_full'];
        var messages = ['工作时间还未添加节目播放时间！','非工作时间还未添加节目播放时间！','全屏时间还未添加节目播放时间！'];

        var attr = {
            code: 0,
            message: '',
            onoff: true
        };
        var onoff = true;

        for(var i=0;i<files.length;i++){
            if(this.lget(files[i])&&this.lget(files[i]).length>=1){

                //检测是否有素材添加
                if(!this.lget(times[i]) || this.lget(times[i]).length==0){
                    attr.code = 400;
                    attr.message = messages[i];
                    onoff = true;
                    return attr;
                }else{
                    onoff = false;
                }
            }else{
                onoff = false;
            }
        }

        return false;
    },
    checkFolderByTimeLine(){
        var times = ['time_list_on','time_list_off','time_list_full'];
        var files = ['file_list_on','file_list_off','file_list_full'];
        var messages = ['工作时间还未添加节目播放素材！','非工作时间还未添加节目播放素材！','全屏时间还未添加节目播放素材！'];

        var attr = {
            code: 0,
            message: '',
            onoff: true
        };
        var onoff = true;

        for(var i=0;i<times.length;i++){
            if(this.lget(times[i])&&this.lget(times[i]).length>=1){

                //检测是否有素材添加
                if(!this.lget(files[i]) || this.lget(files[i]).length==0){
                    attr.code = 400;
                    attr.message = messages[i];
                    onoff = true;
                    return attr;
                }else{
                    onoff = false;
                }
            }else{
                onoff = false;
            }
        }

        return false;
    },
    //检测是否存在节目
    checkExistData(program){

        var rc = false;

        var m1 = program.model_type_1;
        var m2 = program.model_type_2;
        var m3 = program.model_type_3;

        if(m1.file_list.length > 0 && m1.time_list.length > 0){
            return true;
        }

        if(m2.file_list.length > 0 && m2.time_list.length > 0){
            return true;
        }

        if(m3.file_list.length > 0 && m3.time_list.length > 0){
            return true;
        }

        return false;
    }
};

export default tool;