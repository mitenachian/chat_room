<template>
  <div class="room">
    <div class="nav">
      <div class="title">Chatroom</div>
    </div>
    <div class="flexW">
      <div class="side">
          <img class="tumbPic" :src="image(this.tumb)"/>
          <span>{{this.name}}</span>
          <span class="someText">點別人的頭像偷偷聊(未完)</span>
          <button @click="leave()">離開</button>
          <div class="mode mode-activ">
              <span>大廳<br />模式</span>
          </div>
          <div class="mode">
              <span>系統<br />配對</span>
          </div>
          <div class="mode">
              <span>+<br />創建</span>
          </div>
      </div>
      <div class="main">
        <div class="child">
          <!-- list -->
            <div class="chartlist" id="chatlist">
              <ul>
                <li v-for="(item,index) in messages" :key="index" :class="{'host': item.name === user_name}">
                  <div class="imgname" @click="privateChat(item.name, item.src)">
                    <img :src="image(item.src)" width="35px" height="35px" class="chatimg" />
                    <span>{{item.name}}</span>
                  </div>
                  <div :class="`chatlog${item.team}`">
                    <span>{{item.label}}</span>
                  </div>
                  <div class="chattime">
                    <span> {{timeformat(item.chattime)}}</span>
                  </div>
                </li>
              </ul>
              <div class="submit">
                <div class="subFn">
                  <font-awesome-icon icon="grin" />
                  <font-awesome-icon icon="file" />
                  <font-awesome-icon icon="paperclip" />
                </div>
                <input v-model="text" @keyup.enter="submit" placeholder="輸入你的對話" />
                <div class="subSend" @click="submit">
                  <font-awesome-icon icon="comment" />
                </div>
              </div>
            </div>
          <!-- list -->
        </div>
      </div>
    </div><!--flexW-->
  <div>
    <transition name="modal">
      <div v-if="showModal">
        <div class="overlay" @click.self="showModal = false;">
          <div class="modal">
            <h2>確定要與 <span style="color:#DDA27C; font-size:30px;">{{privatechat_name}}</span> 開啟一對一聊天</h2>
            <img class="tumbPic" :src="image(privatechat_img)"/>
            <div>
              <div class="buttonGO">進入聊天</div>
              <div class="buttonCancel">取消按錯</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
  </div><!--room-->
</template>

<script>
export default {
  name: 'ChatRoom',
  props: ['name', 'tumb'],
  data () {
    return {
      showModal: false,
      privatechat_name: '',
      privatchat_img: '',
      user_name: '',
      user_img: '',
      text:'',
      messages: [],
    }
  },
  methods: {
    image(item) {
      return require(`../assets/tumb/${item}`);
    },
    submit() {
      if (this.text != "") {
        db.collection("messages").add({
          name: this.name,
          src: this.tumb,
          team: "host",
          label: this.text,
          chattime: new Date(),
        })
        this.text = "";
      }
    },
    gethMessages() {
      db.collection('messages').orderBy('chattime').onSnapshot((querySnapshot) => {
        let allMessages = [];
        querySnapshot.forEach((doc) => {
          allMessages.push(doc.data());
        })
        this.messages = allMessages;
      })
    },
    timeformat(val) {
      let dd = new Date(val.seconds*1000);
      var y = dd.getFullYear();   
      var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);
      var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();
      let h = dd.getHours()<10?"0"+dd.getHours():dd.getHours();
      let mm = dd.getMinutes()<10?"0"+dd.getMinutes():dd.getMinutes();
      return `${m}/${d}  ${h}:${mm}`;
    },
    scroll() {
      let container = this.$el.querySelector("#chatlist");
      container.scrollTop = container.scrollHeight;
    },
    privateChat(name,src) {
      if(name !== this.user_name){
        this.privatechat_name = name;
        this.privatechat_img = src;
        this.showModal = true;
      }
    },
    leave() {
      this.$router.push({
          name: 'home',
        })
    }
  },
  created() {
    this.user_name = this.$route.params.name;
    this.user_img = this.$route.params.tumb;
  },
  mounted() {
    this.gethMessages();
  },
  updated() {
  this.scroll();
  }
}
</script>

<style scoped>
.room {
  color:#fff;
  font-family: 'Noto Sans TC', sans-serif;
  height: 100%;
  width: 100%;
	display: flex;
	flex-direction: column;
}
.nav {
  width: 100%;
  height: 60px;
  background: #524A4A 0% 0% no-repeat padding-box;
  text-align: left;
}
.nav .title {
  text-align: left;
  padding: 15px 50px;
  font-size: 20px;
  color: #A59696;
  letter-spacing: 0.48px;
  
}
.flexW {
    height:100%;
    display:flex;
    display: -webkit-flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    -webkit-align-content: stretch;
    align-content: stretch;
}
.main {
    background-color:#655C5C;
    -webkit-flex: 1;
    flex:1;
    position:relative;
    text-align: left;
}

.side {
    width:25%;
    background-color:#766B6B;
}
.child {
    position:absolute;
    width:100%;
    height:100%;
}

.side span{
    display: block;
    color:white;
}
.mode{
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background-color: #524A4A;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    cursor: pointer;
}
.mode-activ {
    background: #E8A87E 0% 0% no-repeat padding-box;
    opacity: 0.91;
}
.mode span{
    display: block;
}
.side button{
    background-color: #645B5B;
    border: unset;
    color:white;
    font-size: 12px;
    padding: 10px;
    margin:5px;
    border-radius: 10px;
    cursor: pointer;
    font-family: 'Noto Sans TC', sans-serif;
}
.tumbPic, .someText {
  padding: 20px;
}

/* chatList*/
.material-icons {
  color: white;
}
.chartlist {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
}
i{
    cursor: pointer;
}
.submit {
  position: fixed;
  bottom: 10px;
  left: 30%;
  width: 60%;
  height: 50px;
  background-color: #968686;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  padding:10px;
  cursor: pointer;
}
.submit input {
  background-color: #968686;
  border-right-style: unset;
  border-left-style: solid;
  border-top-style: unset;
  border-bottom-style: unset;
  color: white;
  padding-left: 10px;
  width: 80%;
  height:30px
}
.subFn {
  width: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.subSend {
  display: flex;
  align-items: center;
}
.chatimg {
  vertical-align: middle;
  display: inline-block;
}
.chartlist li {
  display: flex;
  align-items: center;
  margin-top: 3%;
  /* flex-direction: row-reverse */
}
.host {
  flex-direction: row-reverse;
}
.chartlist ul {
  margin-top: 15px;
  margin-bottom: 150px;
}
.imgname {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  cursor: pointer;
}
.imgname span {
  color: white;
  font-size: 12px;
}
.chattime {
  font-size:6px;
  letter-spacing: 0.28px;
  color: rgb(202, 185, 185);
}
.chatlogguest {
  margin-left: 20px;
  margin-right: 20px;
  background-color: #524a4a;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  padding: 15px;
  max-width: 550px;
  position: relative;
  word-break: break-all;
  /* --left: -10;  */
}

.chatlogguest::before {
  position: absolute;
  top: 19px;
  left: -10px;
  content: " ";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 7.5px 13px 7.5px 0;
  border-color: transparent #524a4a transparent transparent;
}
.chatloghost {
  margin-left: 20px;
  margin-right: 20px;
  background-color: #524a4a;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  padding: 15px;
  max-width: 550px;
  position: relative;
  word-break: break-all;
}
.chatloghost::before {
  position: absolute;
  top: 19px;
  right: -10px;
  content: " ";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 7.5px 0 7.5px 13px;
  border-color: transparent transparent transparent #524a4a;
}
.modal {
  width: 550px;
  height: 300px;
  margin: 0px auto;
  padding: 40px;
  background: #766B6B 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #000000;
  border-radius: 21px;
  opacity: 1;
  transition: all 0.2s ease-in;
}
.modal h2 {
  letter-spacing: 2px;
}
.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}

.buttonGO {
  display: inline-block;
  padding: 7px;
  margin: 10px 30px;
  background: #DDA27C 0% 0% no-repeat padding-box;
  color: white;
  font-size: 1.2em;
  font-family: 'Noto Sans TC', sans-serif;
  width: 120px;
  border-radius: 20px;
  cursor: pointer;
}
.buttonCancel {
  display: inline-block;
  padding: 7px;
  margin: 10px 30px;
  background: #524A4A 0% 0% no-repeat padding-box;
  color: white;
  font-size: 1.2em;
  font-family: 'Noto Sans TC', sans-serif;
  width: 120px;
  border-radius: 20px;
  cursor: pointer;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
}
</style>
