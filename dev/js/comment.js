
function init(){ 
    
    var actNo = JSON.parse(localStorage['actNo']);
    {/* <script type="text/x-template" id="comment-input">
        <div class="comment-input">
            <p class="title">留下意見</p>
            <textarea name="" id="" aria-label="" placeholder="有任何疑問嗎" v-model="msg"></textarea>
            <div class="input-group">
                <span class="errMeg"></span>
                <span class="counter">0/100</span>
            </div>
            <div>
                <button @click="InputEvent" class="send" >留言</button>
            </div>
        </div>
    </script> */}
    {/* <script type="text/x-template" id="comment-list">
        <div class="comment-list">
            <div class="comment-item">
                <div class="avatar">
                    <img src="https://picsum.photos/60/60?random=10" alt=""></img>
                </div>
                <div class="content">
                    <div class="comment-name">clair</div>
                    <div class="comment-txt">{{itemMsg}}</div>
                    <div class="comment-date">2019-11-09</div>
                </div>
            </div>
        </div>
    </script> */}
    var data=[];

    $.ajax({
        url:"php/getComment.php?actNo="+actNo,
        type:"GET",
        data:{},
        success:function(res){
            // console.log(res);
            
             data = JSON.parse(res);
             console.log(data);
             
                


                Vue.component("comment-input",{
                        template:`
                        <div>
                            <div class="comment-input">
                                <p class="title">留下意見</p>
                                <textarea name="" id="" aria-label="" placeholder="有任何疑問嗎" v-model="message"></textarea>
                                <div class="input-group">
                                    <span class="errMeg"></span>
                                    <span class="counter">0/100</span>
                                </div>
                                <div>
                                    <button @click.prevent="InputEvent" class="send" >留言</button>
                                </div>
                            </div>
                    </div>`,
                        data:function(){
                            return{
                                message:"",
                            }
                        },
                        methods:{
                            InputEvent:function(){
                                // this.$emit('inputText',this.message)
                                var value = this.message.trim();
                
                                if(!value){
                                    return;
                                }
                
                                this.$emit('input-text',value);
                                this.message="";
                            }
                        },
                    
                    })


                    
                Vue.component("comment-list",{
                    template:`
                        <div>     
                            <div class="comment-item">
                                <div class="avatar">
                                    <img src="https://picsum.photos/60/60?random=10" alt="">
                                </div>
                                <div class="content">
                                    <div class="comment-name">{{item.memNickName}}</div>
                                    <div class="comment-txt">{{item.comContent}}</div>
                                    <div class="comment-date">{{item.comDate.slice(0,-3)}}</div>
                                </div>
                            </div>
                        </div>
                    `,
                    props:['item','itemMsg'],
                    data:function(){
                        return{
                            
                        }
                    },
                    methods:{
                        // 看怎麼放進子主見自己的data
                    },
                    // template:'#comment-list',
                    
                })


                new Vue({
                    el:'#app',
                    data:{
                        userMessage:"",
                        list:data,
                        // list:[
                        //     {
                        //         id:1,
                        //         memPic:"",
                        //         nickName:"clair",
                        //         content:"你好嗎",
                        //         comDate:"2019/11/09",
                        //     },
                        //     {
                        //         id:2,
                        //         memPic:"",
                        //         nickName:"ch",
                        //         content:"怎麼反應",
                        //         comDate:"2019/11/10",
                        //     },
                        //     // {
                        //     //     memPic:"",
                        //     //     NickName:"",
                        //     //     content:"",
                        //     //     comDate:"",
                                
                        //     // }
                        // ]
                    },
                    methods:{
                        putText:function(newMsg){
                            // this.userMessage=newMsg;

                            var timestamp = Math.floor(Date.now());
                            console.log(timestamp);
                            
                            localStorage['memNo']=2;
                            localStorage['memPic']=JSON.stringify("");
                            localStorage['memNickName']=JSON.stringify("視網膜");

                            var dates =new Date();
                            var month = dates.getMonth()+1;
                            var date = dates.getDate();

                            var comDate = dates.getFullYear() + '/' + 
                            (month<10 ? '0' : '') + month + '/' + 
                            (date<10 ? '0' : '') + date;


                            this.list.push({
                                // memNo:JSON.parse(localStorage['memNo']),
                                id:timestamp,
                                memPic:JSON.parse(localStorage['memPic']),
                                nickName:JSON.parse(localStorage['memNickName']),
                                content:newMsg,
                                comDate:comDate,
                            });
                            // https://blog.reh.tw/archives/662 如果是post請求
                            // 機器人管理
                            // =====================


                            

                            $.ajax({
                                url:"php/comment.php",
                                type:"POST",
                                // async:false,
                                // data:{msgStr},
                                // dataType:"JSON",
                                data:{
                                    // actNo:msg.actNo,
                                    // memNickName:msg.memNickName,
                                    // comContent:msg.comContent
                                    actNo:JSON.parse(localStorage['actNo']),
                                    memNo:JSON.parse(localStorage['memNo']),
                                    comContent:newMsg,
                                    // comDate:dates,
                                },
                                success:function(res){
                                    // data = JSON.parse(res);
                                    console.log(res);
                                    // console.log("狀況");
                                    
                                    // this.inner=data;
                                },error:function(){
                                    console.log("前台傳送失敗");
                                    
                                }
                    
                            })

                        }
                    },
                    // components:{
                    //     'comment-input':{
                    //         template:`
                    //             <div>
                    //                 <div class="comment-input">
                    //                     <p class="title">留下意見</p>
                    //                     <textarea name="" id="" aria-label="" placeholder="有任何疑問嗎" v-model="message"></textarea>
                    //                     <div class="input-group">
                    //                         <span class="errMeg"></span>
                    //                         <span class="counter">0/100</span>
                    //                     </div>
                    //                     <div>
                    //                         <button @click.prevent="InputEvent" class="send" >留言</button>
                    //                     </div>
                    //                 </div>
                    //         </div>`,
                    //         data:function(){
                    //             return{
                    //                 message:"",
                    //             }
                    //         },
                    //         methods:{
                    //             InputEvent:function(){
                    //                 // this.$emit('inputText',this.message)
                    //                 this.$emit('input-text',this.message)
                    //                 this.message="";
                    //             }
                    //          },
                    //     },
                    //     'comment-list':{
                    //         template:`
                    //         <div>     
                    //             <div class="comment-item">
                    //                 <div class="avatar">
                    //                     <img src="https://picsum.photos/60/60?random=10" alt="">
                    //                 </div>
                    //                 <div class="content">
                    //                     <div class="comment-name">clair</div>
                    //                     <div class="comment-txt">{{item.content}}</div>
                    //                     <div class="comment-date">2019-11-09</div>
                    //                 </div>
                    //             </div>
                    //         </div>
                    //     `,
                    //     props:['item','itemMsg'],
                    //     data:function(){
                    //         return{
                                
                    //         }
                    //     },
                    //     methods:{
                    //         // 看怎麼放進子主見自己的data
                    //     },
                    //     // template:'#comment-list',
                    //     }
                    // }
                    

                })
           
        },error:function(res){
            console.log(res);
            
            console.log("撈取失敗");
            

        }
    });




            
    


   
}


window.addEventListener("load",init);