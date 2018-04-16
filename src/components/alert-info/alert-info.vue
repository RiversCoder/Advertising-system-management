<template>
    <div>
        <el-dialog
          title="skylander infomation"
          :visible.sync="dialogVisible"
          :before-close="handleClose"
          width="30%"
          >
          <span>{{content}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelVisible">取 消</el-button>
            <el-button type="primary" @click="cancelVisible">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    export default{
        data(){
            return {
            }
        },
        props:{
            content:{
                type: String,
                default: '是否退出？'
            },
            dialogVisible:{
                type: Boolean,
                default: false
            }
        },
        methods:{
            cancelVisible(){
                this.$emit('cancelBox');
            },
            handleClose(){
                this.$emit('cancelBox');
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    
</style>