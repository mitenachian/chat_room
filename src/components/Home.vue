<template>
  <div class="home">
    <div class="flex-container">
      <div class="flex-item main">
        <div class="title">
            <h1>WELCOME</h1>
            <h3>阿貓阿狗聊天室</h3>
        </div>
        <div class="imgBox">
            <!-- 動物圖片隨著右邊的bar切換 -->
            <img :src="image(currentImg)">
        </div>
        <div class="inputBox">
           <input class="input" type="text" v-model="name" placeholder="Input your name..">
           <div style="color:#ffa488" v-if="feedback">{{ feedback }}</div>
        </div>
        <div class="inputBox">
          <button class="buttonEnter" @click="enterRoom()"><span>進入聊天</span></button>
        </div>
      </div>
      <div class="flex-item sidebar1">
        <div class="buttonBox">
          <!--點選切換 sidebar2中的貓狗列表-->
          <div class="bottonOutline">
            <button class="button button1" @click.prevent="changeView('dog')" :class="{'selectClass': view === 'dog' }"><h2>狗  狗</h2></button>
          </div>
          <div class="bottonOutline">
            <button class="button button1" @click.prevent="changeView('cat')" :class="{'selectClass': view === 'cat' }"><h2>貓  貓</h2></button>
          </div>
      </div>
      </div>
      <div class="flex-item sidebar2">
        <div>
          <div class="pngBox" v-if="view==='dog'">
              <div class="imgItem" v-for="(item, index) in dogList" :key="index" :class="{'selectImg': currentImg === item }">
                  <img :src="image(item)" @click="setCurrentImg(item)"/>
              </div>
          </div>
          <div class="pngBox" v-else>
              <div class="imgItem" v-for="(item, index) in catList" :key="index" :class="{'selectImg': currentImg === item }">
                  <img :src="image(item)" @click="setCurrentImg(item)"/>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      name: '',
      view: 'dog',
      currentImg: {
        imgUrl: '../assets/dog1.png',
        imgName: 'dog1.png'
      }, //目前選的圖
      catList: [{
        name: 'cat1',
        imgUrl: '../assets/cat1.png',
        imgName: 'cat1.png'
      },{
        name: 'cat2',
        imgUrl: '../assets/cat2.png',
        imgName: 'cat2.png'
      },{
        name: 'cat3',
        imgUrl: '../assets/cat3.png',
        imgName: 'cat3.png'
      },{
        name: 'cat4',
        imgUrl: '../assets/cat4.png',
        imgName: 'cat4.png'
      }],
      dogList: [{
        name: 'dog1',
        imgUrl: '../assets/dog1.png',
        imgName: 'dog1.png'
      },{
        name: 'dog2',
        imgUrl: '../assets/dog2.png',
        imgName: 'dog2.png'
      },{
        name: 'dog3',
        imgUrl: '../assets/dog3.png',
        imgName: 'dog3.png'
      },{
        name: 'dog4',
        imgUrl: '../assets/dog4.png',
        imgName: 'dog4.png'
      }],
    feedback: null,
    }
  },
  methods: {
    changeView(viewName) {
      this.view = viewName;
    },
    image(item) {
      return require(`../assets/${item.imgName}`);
    },
    setCurrentImg(item) {
      this.currentImg = item
    },
    enterRoom() {
      if(this.name && this.currentImg) {
        this.$router.push({
          name: 'ChatRoom',
          params: { name: this.name , tumb: this.currentImg.imgName },
        })
      } else {
        this.feedback = 'Hey~~ You must enter a name to join!'
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color:#fff;
  font-family: 'Fredoka One', cursive;
}
h3 {
  color:#fff;
  font-family: 'Noto Sans TC', sans-serif;
}
.home {
width: 980px;
height: 700px;
background: #524A4A 0% 0% no-repeat padding-box;
box-shadow: 0px 3px 6px #413737;
border-radius: 21px;
opacity: 1;
margin: 0 auto;
margin-top: 100px;
}
.flex-container {
  width: 100%;
  height: 100%;
  display: flex;
}
.sidebar1 {
  order: 1;
  flex: auto;
  margin: auto;
  justify-content: center;
  align-items: center; 
}

.sidebar2 {
  order: 3;
  flex: auto;
  margin: auto;
  justify-content: center;
  align-items: center; 
}

.main {
  order: 2;
  flex: 5 1 auto;
  margin: auto;
  justify-content: center;
  align-items: center; 
}
.button h3{
  font-size: 15px;
}
.button {
  cursor: pointer;
  margin:10px;
  width: 164px;
  height: 63px;
  background: #645B5B 0% 0% no-repeat padding-box;
  border: 2px solid #FCAA72;
  border-radius: 9px;
  opacity: 1;
}
.button1 {
  color: white;
  border: 2px solid #645B5B;
  
}
.button1:hover, .selectClass {
  background-color: rgb(153, 128, 128) 0% 0% no-repeat padding-box;
  color: #FCAA72; 
  border: 2px solid #FCAA72;
}
.imgBox {
  padding: 20px;
}
.imgBox img{
  width:141px;
  height:239px;
}
.inputBox {
  padding:20px;
}
.inputBox .input {
  outline: none;
  border: none;
  width : 400px;
  height: 40px;
  font-size:20px;
  color:#FFF;
  font-family: 'Noto Sans TC', sans-serif;
  background-color: #645B5B;
  border-radius: 5px;
  padding:5px;
}
.buttonEnter {
  cursor: pointer;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  width: 180px;
  height: 50px;
  border-radius: 30px;
  outline: none;
  border: none;
}
.buttonEnter:hover {
   background:rgb(153, 140, 140);
}
.buttonEnter span {
  color:#645B5B;
  font-size: 20px;
  font-family: 'Noto Sans TC', sans-serif;
}
.imgItem {
  width: 60px;
  height: auto;
  border: 2px solid #fff;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  cursor: pointer;
  opacity: 0.5;
}
.imgItem:hover , .selectImg {
  border: 2px solid #FCAA72;
  opacity: 1;
} 
.imgItem img {
  width: 60px;
  height: 90px;
  
}
</style>
