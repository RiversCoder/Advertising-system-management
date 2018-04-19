
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
    }
};

export default tool;