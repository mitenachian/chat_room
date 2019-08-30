<template>
    <div class="side">
        <img :src="image(this.tumb)"/>
        <span>{{this.name}}</span>
        <span>星期一,天氣晴, 大家安安</span>
        <button>編輯</button>
        <div class="mode" >
            <span>大廳<br />模式</span>
        </div>
        <div class="mode" >
            <span>系統<br />配對</span>
        </div>
    </div>
</template>
<script>
export default {
  name: 'side',
}
</script>
<style scoped>
.side{
    width:25%;
    height:100%;
    background-color:#766B6B; 
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.side span{
    display: block;
    color:white;
}
.mode{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #524A4A;
    display: flex;
    justify-content: center;
    align-items: center;
}
.mode span{
    display: block;
}
.side button{
    background-color: #645B5B;
    border: unset;
    color:white;
    font-size: 12px;
}
</style>