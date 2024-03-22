<template>
  <div style="">
    <img src="./assets/attendnet.png" alt="" style="width: 100%" />
  </div>
  <nav class="">
    <div class="container-fluid" style="color: #fff; background-color: #222">
      <div class="">
        <tr>
          <th><img style="width: 50%" src="./assets/2.png" alt="" /></th>
          <th>
            <router-link to="/" class="nav-link">
              <h5 class="nav-title">
                <i class="fa fa-home" aria-hidden="true"></i> Trang chủ
              </h5>
            </router-link>
          </th>
          <th>
            <router-link to="/result" class="nav-link">
              <h5 class="nav-title">
                <i class="fa fa-list" aria-hidden="true"></i> Thống kê
              </h5>
            </router-link>
          </th>
          <th>
            <router-link to="/qlsv" class="nav-link">
              <h5 class="nav-title">
                <i class="fa fa-user" aria-hidden="true"></i> Quản lý sinh viên
              </h5>
            </router-link>
          </th>
        </tr>
      </div>
    </div>
  </nav>
  <router-view />
  <div>
    <div class="row bg-dark" style="height: 50px; width: 100%">
      <h5 style="padding: 12px 50px; color: white">Thông tin về chúng tôi</h5>
    </div>
    <div
      class="row"
      style="padding: 100px 50px 100px 50px; background-color: whitesmoke"
    >
      <div class="col-6">
        <h4 style="padding-bottom: 10px">WEBSITE QUẢN LÝ ĐIỂM DANH</h4>
        <p style="text-align: justify">
          Website quản lý điểm danh giúp các giáo viên, giảng viên và các giáo
          sư,... Dễ dàng nắm bắt tình hình lớp, quản lý học sinh, tính chuyên
          cần. Để đưa ra điểm số chuyên cần và điều kiện được thi cuối kỳ
        </p>
      </div>
      <div class="col-3">
        <h4 style="padding-bottom: 10px">Team phát triển</h4>
        <p>Huỳnh Vĩnh Đạt</p>
        <p>Nguyễn Hoài Nam</p>
        <p>Nguyễn Tấn</p>
      </div>
      <div class="col-3">
        <h4 style="padding-bottom: 10px">Công nghệ sử dụng</h4>
        <p>HTML/CSS</p>
        <p>Bootstrap</p>
        <p>Vue.JS</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  onSnapshot,
  collection,
  doc,
  deleteDoc,
  setDoc,
  addDoc,
  query,
} from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { onUnmounted, ref } from "vue";
const firebaseConfig = {
  apiKey: "AIzaSyA4aqfsaGQYdfin1wRgo88Jw7BquQM8Ac4",
  authDomain: "quanlydiemdanh-58a1e.firebaseapp.com",
  projectId: "quanlydiemdanh-58a1e",
  storageBucket: "quanlydiemdanh-58a1e.appspot.com",
  messagingSenderId: "926888491554",
  appId: "1:926888491554:web:54ce190aff46d439bae87b",
  measurementId: "G-3384LT8ZGT",
};
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export default {
  name: "App",
  components: {},
  methods: {
    add: function () {
      addDoc(collection(db, "messages"), { text: this.$refs.newmessage.value });
    },
    update: function (message) {
      setDoc(doc(db, "messages", message.id), {
        text: message.text,
      });
    },
    deletemess: function (id) {
      deleteDoc(doc(db, "messages", id));
    },
  },
  data: () => {
    return {
      messages: ref([]),
    };
  },

  mounted() {
    const latestQuery = query(collection(db, "messages"));
    const livemessages = onSnapshot(latestQuery, (snapshot) => {
      this.messages = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          tenlop: doc.data().tenlop,
        };
      });
    });
    onUnmounted(livemessages);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.a1 {
  color: white;
  text-decoration: none;
}
.nav-link {
  text-decoration: none; /* Loại bỏ gạch chân */
  color: white;
}

.nav-title {
  margin-right: 120px;
  margin-left: -80px;
  position: relative;
}

.nav-title:hover::after {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #fff;
  transition: 0.5s;
  margin-bottom: -8px;
}
</style>