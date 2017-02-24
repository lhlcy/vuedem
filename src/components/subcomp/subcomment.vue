<template>
    <div class="tmpl">
      <div class="submittitle">
          提交评论
      </div>
        <div class="submitarea">
            <textarea ref="postcontent" class="textarea" placeholder="请输入评论内容"></textarea>
            <mt-button type="primary" size="large" @click="postcomment">发表</mt-button>
        </div>

        <div class="commenttitle">
            评论列表
        </div>
        <div class="commentlist">
            <div class="outwarp" v-for="item in comments">
                <div class="content" v-text="item.content"></div>
                <div class="user" v-text="item.user_name"></div>
                <div class="time">{{item.add_time | fmtdate('YYYY-MM-DD HH:mm:ss')}}</div>
            </div>
         

        </div>

        <!--加载跟多按钮-->
        <mt-button class="more" type="danger" size="large" plain @click="getmore">加载更多</mt-button>

    </div>
</template>
<style scoped>
    .more{
        margin-top: 10px;
    }
    .tmpl{
        padding: 5px;
    }
   .submittitle,.commenttitle{
       font-weight: 700;
       font-size: 21px;
       border-bottom: 1px solid rgba(92,92,92,0.4);
       padding-bottom: 15px;
   }
    .submitarea{
        margin-top: 5px;
    }
    .commenttitle{
        margin-top: 10px;
        border-top: 1px solid rgba(92,92,92,0.4);
        padding: 10px 0px 10px 0;
    }
    .outwarp{
        border-bottom: 1px solid rgba(92,92,92,0.4);
        clear: both;
        max-height:300px;
        overflow-y: auto;
        padding: 5px;
    }
    .user,.time{
        width: 50%;
        float: left;
        color: #0094ff;
    }
    .time{
        float: right;
   }
</style>
<script>
    import common from '../../kits/common.js'
    import { Toast } from 'mint-ui'; 

    export default{
        data(){
            return{
               comments:[], //用来存放当前数据的评论信息列表
                pageindex:1 //这是获取评论的页码，默认为第1页
            }
        },
        created(){
            this.getcomment(this.pageindex);
        }
        ,
        methods:{
           //提交评论
            postcomment(){
               let url = common.apihost+'/api/postcomment/'+this.artid;
                //可以通过  console.log(this.$refs.postcontent);
             
                let contentText = this.$refs.postcontent.value;
                //判断是否有值
                if(!contentText || contentText.trim().length <=0){
                    Toast('评论内容必须填写');
                    return;
                }
                //2.0 将评论数据提交到服务器
                this.$http.post(url,{content:contentText},{emulateJSON:true})
                        .then(res=>{
                   
                    Toast('评论提交成功');

                    //重新加载评论
                    this.getcomment(this.pageindex,true);

                    //清空文本空中的值
                this.$refs.postcontent.value = '';

                },res => {console.log('评论提交失败');});
            },
           // 获取评论
            getcomment(pageindex,isreload){
                let url = common.apihost+'/api/getcomments/'+this.artid+'?pageindex='+pageindex;
                this.$http.get(url).then(res=>{
              
                    if(isreload){
                        this.comments = res.body.message;
                    }else{
                        //这是给加载跟多使用的
                        this.comments = this.comments.concat(res.body.message);
                    }
                },res=>{
                    console.log('获取评论数据失败');
                });
            },
            // 获取跟多数据
            getmore(){
              
                this.pageindex++;
              
                this.getcomment(this.pageindex);
            }
        },
        props:['artid']  //用来接收当前评论数据的所属内容的id,这个值可以在vue对象中的任何地方使用
    }
</script>
