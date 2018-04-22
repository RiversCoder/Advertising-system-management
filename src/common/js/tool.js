
var tool = {
    getSelect: (item,clsn,id,record)=>{
        item.parentNode.classList.toggle(clsn);

        if(item.parentNode.classList.contains(clsn)){
            record.push(id);
            record = [...new Set(record)];
        }else{
          for(var i=0;i<record.length;i++){
            if(record[i] == id){
              record.splice(i,1);
            }
          }
        }
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
    checkTime: function(arr1,obj){
        console.log(arr1,obj)
        if(arr1.length >= 1){
            var x1 = arr1[arr1.length-1].start;
            var x2 = x1+arr1[arr1.length-1].duration;
            var t1 = obj.start;
            var t2 = t1+obj.duration;
            
            //如果不重叠
            if(t2 <= x1 || t1 >= x2){
                return false;
            }else{
                return true;
            }
        }
    }
};

export default tool;