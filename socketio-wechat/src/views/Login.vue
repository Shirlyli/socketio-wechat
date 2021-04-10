<template>
  <div>
    <div class="loginBox">
      <div class="loginForm"
           v-show="!showChat">
        <div class="left">
          <div>
            <h2>Welcome To</h2>
            <h2>Shirly聊天室</h2>
          </div>
        </div>
        <div class="right">
          <span>用户名</span>
          <div>
            <input type="text"
                   placeholder="admin"
                   v-model="inputVal">
          </div>
          <span>选择头像</span>
          <div class="imgBox">
            <img :src="src"
                 alt=""
                 v-for="(src,index) in imgList"
                 :class="{'choose':src === imgVal}"
                 :key="index"
                 @click="imgClick(src)">
          </div>
          <button @click="login"
                  type="primary">登陆</button>
        </div>
      </div>
      <chat v-show="showChat" class="chatBox"></chat>
    </div>
  </div>
</template>

<script>
import Chat from './Chat'
export default {
  components: {
    Chat
  },
  name: 'Login',
  methods: {
    // 登陆事件
    login () {
      if (!this.inputVal) {
        alert('请输入用户名')
      } else if (!this.imgVal) {
        alert('请选择头像')
      } else {
        this.$socket.emit('loginin', {
          username: this.inputVal,
          imgVal: this.imgVal
        })
      }
    },
    imgClick (src) {
      console.log(src)
      this.imgVal = src
    }
  },
  sockets: {
    // 监听登陆成功
    loginSuccess (data) {
      console.log(data)
      alert('登陆成功')
      setTimeout(() => {
        this.showChat = true
      }, 1000)
    },
    // 监听登陆失败
    loginFail (data) {
      alert(data.msg)
    }
  },
  data () {
    return {
      inputVal: 'admin',
      imgList: [require('@/assets/img/2.jpeg'), require('@/assets/img/3.jpg'), require('@/assets/img/4.jpeg'), require('@/assets/img/5.jpeg'), require('@/assets/img/6.jpeg'), require('@/assets/img/7.jpeg'), require('@/assets/img/8.jpeg'), require('@/assets/img/9.jpg')],
      imgVal: '',
      showChat: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/login.scss';
</style>
