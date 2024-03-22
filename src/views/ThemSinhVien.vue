<template>
  <div class="m-4">
    <div class="card">
      <div class="card-header"><h3>Quản Lý Sinh Viên</h3></div>
      <div class="card-body">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label for="">Nhập họ tên:</label>
                <input
                  type="text"
                  ref="newmessage"
                  class="form-control"
                  placeholder="Tên sinh viên"
                />
                <input
                  type="hidden"
                  ref="diemdanh"
                  class="input-field"
                  placeholder="điemanh"
                  :value="0"
                />
                <input
                  type="hidden"
                  ref="ngayht"
                  class="input-field"
                  placeholder="điemanh"
                  :value="true"
                />
                <input
                  type="hidden"
                  ref="show"
                  class="input-field"
                  placeholder="điemanh"
                  :value="true"
                />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="">Chọn môn học:</label>
                <select class="form-control" name="" id="">
                  <option value="">Chọn môn học</option>
                  <option
                    ref="lop"
                    v-for="(Lop, index) in lop"
                    :key="index"
                    :value="Lop.id"
                  >
                    {{ Lop.mon }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <br />
              <button @click="addNewMess" class="add-button">Add New</button>
            </div>
          </div>
          <hr />
          <div class="row">
            <table class="table">
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>Mssv</th>
                  <th>Họ tên</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(message, index) in sinhvien"
                  :key="message.id"
                  class="message"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ message.id }}</td>

                  <td>{{ message.ten }}</td>

                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  //   addDoc,
  setDoc,
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
  data: () => {
    return {
      sinhvien: ref([]),
      lop: ref([]),
      mssv: 0,
      selectedLops: [], // Array to store selected Lop.id values
      vang: [],
    };
  },
  methods: {
    addNewMess: function () {
      const selectedLops = this.selectedLops;
      const masosv = this.mssv + 1;
      const masosvString = masosv.toString();
      const uniqueLops = [...new Set(selectedLops)]; // Remove duplicates (optional)
      const vang = Array(uniqueLops.length).fill(0); // Create vang with length matching uniqueLops and all values set to 0

      setDoc(doc(collection(db, "sinhvien"), masosvString), {
        ten: this.$refs.newmessage.value,
        IdLop: uniqueLops,
        vang: vang,
        diemdanh: Number(this.$refs.diemdanh.value),
        ngayht: Boolean(this.$refs.ngayht.value),
        show: Boolean(this.$refs.show.value),
      });

      this.newmessage = "";
      this.selectedLops = [];
    },
    deleteMess: function (id) {
      deleteDoc(doc(db, "sinhvien", id));
    },
  },

  mounted() {
    const latestQuery = query(collection(db, "sinhvien"));
    const livestudent = onSnapshot(latestQuery, (snapshot) => {
      this.sinhvien = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ten: doc.data().ten,
          IdLop: doc.data().IdLop,
          diemdanh: doc.data().diemdanh,
          ngayht: doc.data().ngayht,
          show: doc.data().show,
          vang: doc.data().vang,
        };
      });
      this.mssv = snapshot.docs.length;
      console.log(this.mssv);
      return (this.mssv = snapshot.docs.length);
    });
    onUnmounted(livestudent);
    // Query sinh viên từ Firestore
    const latestQueryLop = query(collection(db, "lop"));
    const livemessagesLop = onSnapshot(latestQueryLop, (snapshot) => {
      this.lop = snapshot.docs.map((doc) => {
        const Lop = {
          id: doc.id,
          ten: doc.data().giaovien,
          mon: doc.data().tenlop,

          // Thêm lopId vào dữ liệu sinh viên
        };
        console.log("Lop:", Lop); // Log each student to check lopId
        return Lop;
      });
    });

    onUnmounted(livemessagesLop);
  },
};
</script>

<style>
.add-button {
  padding: 5px 10px;
  border: none;
  background-color: #02198b;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
</style>
