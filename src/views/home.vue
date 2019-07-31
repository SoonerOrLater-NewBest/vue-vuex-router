<template>
  <div class="page">
    <el-header :title="title" fixed>
      <a slot="left" @click="goBack">
        <mt-button icon="back">返回</mt-button>
      </a>
    </el-header>
    <el-upload action :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
      <el-button
        icon="ios-cloud-upload-outline"
        :loading="uploadLoading"
        @click="handleUploadFile"
      >上传文件</el-button>
    </el-upload>
    <div class="container">
      <div class="chat_record">
        <div
          style="color:blue;text-align:center;line-height:2.5;"
          @click="msglist"
          v-if="show"
        >查看历史消息</div>
      </div>
    </div>
    <div class="chat-wrap">
      <input type="text" placeholder="输入聊天内容" class="chat_input" />
      <div class="send_input" @click="send">发送</div>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      from: "",
      to: "",
      uname: "",
      websock: null,
      show: true
    };
  },
  created() {
    console.log(this.$route.query);
    this.initWebSocket();
    this.title = this.$route.query.toname;
    this.from = this.$route.query.from;
    this.to = this.$route.query.to;
    this.uname = this.$route.query.uname;
  },
  methods: {
    handleBeforeUpload (file) {
      const fileExt = file.name.split('.').pop().toLocaleLowerCase()
      if (fileExt === 'xlsx' || fileExt === 'xls') {
        // this.readFile(file)
        console.log(file);
        let data = new FormData();
        data.append('xlxs',file)
        console.log(data);
        this.file = file
      } else {
        this.$notify({
          type: 'warning',
          title: '文件类型错误',
          message: '文件：' + file.name + '不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。'
        })
      }
      return false
    },
    msglist() {
      let _this = this;
    },
    goBack() {
      this.$router.go(-1);
    },
    setMsg(msg) {
      let _this = this;
    },
    send() {
      var t = this;
      var content = $(".chat_input").val();
      if (content == "") return;
      var reg = new RegExp("\r\n", "g");
      content = content.replace(reg, "");
      var msg = { content: content.trim(), type: "user", toname: t.title };
      this.websocketsend(msg);
      $(".chat_input").val("");
      this.setMsg(content);
    },
    initWebSocket() {
      //初始化weosocket
      const wsuri = "";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocket;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      console.log("连接已建立");
    },
    websocket() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      var t = this;
      var msg = JSON.parse(e.data);
      var issend = false;
      var from = "1"; //1 自己  2，对方
      var sender, user_name, name_list, change_type, name_all_list;

      switch (msg.type) {
        case "system":
          issend = true;
          sender = "系统消息: ";
          break;
        case "user":
          if (msg.from == t.title || msg.from == t.uname) {
            issend = true;
            if (msg.from == t.title) {
              from = 2;
            }
            sender = msg.from + ": ";
          } else {
            var froms = msg.from;
            //$(".to_name_"+froms).css("background","red");
            //$(".to_name_"+froms).animate({backgroundColor: "#aa0000"},3000);
            var shine = $(".to_name_" + froms);

            function starshine() {
              if (shine.hasClass("star")) {
                shine.removeClass("star");
              } else {
                shine.addClass("star");
              }
            }

            shinefunc(starshine);
          }

          break;
        case "handshake":
          issend = true;
          var user_info = { type: "login", content: t.uname, toname: t.title };
          t.websocketsend(user_info);
          return;
        case "login":
        case "logout":
          issend = true;
          user_name = msg.content;
          name_list = msg.user_list;
          name_all_list = msg.user_all_list;

          change_type = msg.type;
          // dealUser(user_name, change_type, name_list,name_all_list);
          return;
      }

      if (issend) {
        var data = sender + msg.content;
        t.listMsg(data, from);
      }
    },
    websocketsend(msg) {
      //数据发送
      var data = JSON.stringify(msg);
      this.websock.send(data);
    },
    listMsg(data, from) {
      var str = "";
      if (from == 1) {
        str = ' <p class="my_chat">' + data + "</p>";
      } else {
        str = ' <p class="your_chat">' + data + "</p>";
      }
      $(".chat_record").append(str);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    }
  },
  mounted() {},

  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  },
  components: {}
};
</script>
<style>
.my_chat {
  text-align: right;
  padding: 0.1rem 0.15rem;
}
.your_chat {
  text-align: left;
  padding: 0.1rem 0.15rem;
}
</style>

<style lang="scss" scoped>
.page {
  .container {
    padding: 0.5rem 0;
    background: #fff;
  }
  .chat-wrap {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0.5rem;
    display: flex;
    align-items: center;
    z-index: 9999;
    &::before {
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: 0;
      height: 0;
      border-top: 1px solid #eee;
      transform: scaleY(0.7);
    }
    input {
      flex: 1;
      padding: 0.1rem 0.15rem;
      height: 100%;
      background: #f7f7f7;
    }
    .send_input {
      background: red;
      color: #fff;
      width: 0.8rem;
      line-height: 0.5rem;
    }
  }
}
</style>
