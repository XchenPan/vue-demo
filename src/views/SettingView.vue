<script setup>
import HeaderFill from "../components/HeaderFill.vue"
import { UserFilled, Edit, Promotion } from "@element-plus/icons-vue"
</script>

<template>
    <div>
        <HeaderFill />
        <div class="setting">
            <div class="container flex">
                <div class="left">
                    <ul>
                        <li><router-link to="/setting/base-info" active-class="active"><el-icon><UserFilled /></el-icon><span>基本信息</span></router-link></li>
                        <li><router-link to="/setting/change-password" active-class="active"><el-icon><Edit /></el-icon><span>修改密码</span></router-link></li>
                        <li><router-link to="/setting/join-ours" active-class="active"><el-icon><Promotion /></el-icon><span>加入我们</span></router-link></li>
                    </ul>
                </div>
                <div class="right">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    height: 600px;
    background: #ddd;
    justify-content: left;
    padding: 40px 40px;
}

.left {
    width: 300px;
}

.left ul {
    padding: 0;
}
.left li a {
    color: rgba(0, 0, 0, .6);
    font-size: 16px;
    display: flex;
    padding: 10px 10px;
    width: 300px;
    align-items: center;
}

.left li a span {
    padding: 0 10px;
}
.right {
    width: 860px;
    padding-left: 30px;
}

.active {
    background-color: #338ed9;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
}
.active * {
    color: aliceblue;
}
</style>