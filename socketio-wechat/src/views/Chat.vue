<template>
  <div>
    <div class="chatBox">
      <div class="loginList">
        <img :src="imgSrc"
             alt="">
        <p>用户列表</p>
        <div v-for="(item,index) in allUserList"
             :key="index">
          <img :src="item.imgVal"
               alt="">
          <span>{{item.username}}</span>
        </div>
      </div>
      <div class="chatContent">
        <header>聊天室<span>{{allUserList.length}}</span></header>
        <div class="content">
          <p v-for="(item,index) in newUserList"
             :key="index">{{item.type ==='del'?item.username+'离开':item.username+'加入'}}了群聊</p>
          <p></p>
        </div>
        <div class="inputBox">
          <div class="logo"></div>
          <div class="bottom">
            <input type="textarea"
                   v-model="inputVal">
            <span>按下ctrl+enter发送</span><button @click="sendMsg">发送</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  sockets: {
    // 监听添加用户的消息
    addUser (data) {
      console.log(data, 'adduser')
      // 添加一条系统消息
      this.newUserList.push(data)
    },
    // 监听登陆成功的请求
    loginSuccess (data) {
      console.log(data, 'chat')
      this.imgSrc = data.data.imgVal
      this.username = data.data.username
    },
    // 监听所有用户
    userList (data) {
      console.log(data, 'userList')
      this.allUserList = data
    },
    // 删除用户事件
    deluser (data) {
      this.newUserList.push(data)
    },
    // 监听获取聊天信息
    receiveMsg (data) {
      // 显示到聊天窗口中
      if (data.username === this.username) {
        // 自己的消息
      } else {
        // 别人的消息框
      }
    }
  },
  methods: {
    sendMsg () {
      if (!this.inputVal) return alert('请输入内容')
      this.$sockets.emit('sendMsg', {
        msg: this.inputVal,
        username: this.username,
        imgVal: this.imgSrc
      })
    }
  },
  data () {
    return {
      imgSrc: '',
      newUserList: [],
      allUserList: [],
      username: '',
      inputVal: ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/chat.scss';
</style>
