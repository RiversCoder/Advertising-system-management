
var tool = {
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
        var shiliu = shi.toString(16);

        return shiliu;
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
       
        data.forEach((item)=>{
           var num = parseInt(item.weeks,16);
           var str = num.toString(2);
           ms.push([item.start,item.duration,this.addZoomBefore(str,7)]);
        })

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
    createColorblock(pclsn,clsn,data,color){
        var p = document.getElementsByClassName(pclsn);
        console.log(data)
        for(var i=0;i<data.length;i++){
            for(var j=0;j<p.length;j++){
                console.log()
                if(data[i][2].charAt(j) == 1){
                    p[j].innerHTML += `<span class="cwb" style="display:block;width:100%;position:absolute;left:0;top:${data[i][0]}px;height:${data[i][1]}px;background-color:${color};"></span>`;
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
            "date": new Date().getTime(),
            "username": username,
            "program":[]
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
            return true;
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
            return false;
        }

        for(var i=0;i<data.length;i++){
            file_list.push({
                 "file_name":data[i].file_name,
                  "file_type":data[i].file_type,
                  "download_url":data[i].download_url,
                  "file_size":data[i].file_size,
                  "file_duration":data[i].file_duration
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
    }
};

export default tool;