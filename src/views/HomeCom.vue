<template>
  <h1 style="text-align: center; margin-top: 20px">Danh sách lớp</h1>
  <input
    type="text"
    name=""
    id=""
    v-model="search"
    style="
      width: 30%;
      height: 40px;
      border-radius: 20px 0px 0px 20px;
      padding: 20px;
    "
    placeholder="Tìm kiếm..."
  />
  <button style="border-radius: 0px 20px 20px 0px; height: 43px; width: 40px">
    <i class="fa fa-search" aria-hidden="true"></i>
  </button>
  <div class="card m-2" style="background-color: rgba(40, 167, 69, 0)">
    <div class="card-body">
      <table
        class="table table-striped table-inverse table-responsive"
        style="margin-bottom: 50px"
      >
        <thead class="thead-inverse">
          <tr>
            <th>Mã lớp</th>
            <th>Giảng viên</th>
            <th>Tên lớp</th>
            <th>Số sinh viên</th>
            <th>Số tiết</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lop in Searching" :key="lop.id">
            <td scope="row">{{ lop.id }}</td>
            <td>{{ lop.giaovien }}</td>
            <td>
              {{ lop.tenlop }}
            </td>
            <td>{{ lop.soluong }}</td>
            <td>{{ lop.sotiet }}</td>
            <td>
              <router-link :to="{ path: `/class/${lop.id}` }">
                <button type="button" class="btn btn-success">
                  Chi tiết
                </button></router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script >
import {
  getFirestore,
  onSnapshot,
  collection,
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
  data: () => {
    return {
      // test: 0,
      lop: ref([]),
      search: "",
    };
  },
  mounted() {
    const latestQuery = query(collection(db, "lop"));

    const livemessages = onSnapshot(latestQuery, (snapshot) => {
      this.lop = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          giaovien: doc.data().giaovien,
          tenlop: doc.data().tenlop,
          soluong: doc.data().soluong,
          sotiet: doc.data().sotiet,
        };
      });
    });
    onUnmounted(livemessages);
  },
  computed: {
    Searching() {
      return this.lop.filter(
        (item) =>
          item.tenlop.toLowerCase().includes(this.search.toLowerCase()) ||
          item.giaovien.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    filteredList() {
      return this.lop.filter(
        (item) =>
          item.tenlop.toLowerCase().includes(this.filtertenlop.toLowerCase()) ||
          item.giaovien
            .toLowerCase()
            .includes(this.filtergiaovien.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
</style>