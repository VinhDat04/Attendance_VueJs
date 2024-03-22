<template>
  <div v-for="(Lop, index) in lop" :key="index">
    <div v-if="Lop.id == this.classId">
      <h1>{{ Lop.mon }}</h1>
    </div>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th>Stt</th>
        <th>Mã sinh viên</th>
        <th>Tên sinh viên</th>
        <th>Điểm Danh</th>
        <th>Ngày Điểm Danh</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(sv, index) in filteredStudents" :key="index">
        <td scope="row">
          {{ index + 1 }}
        </td>
        <td scope="row">{{ sv.id }}</td>
        <td>{{ sv.ten }}</td>
        <td>
          <div v-if="sv.ngayht">
            <button type="button" class="btn btn-primary" @click="ngaynow(sv)">
              {{ sv.ngaynow }}
            </button>
          </div>
          <div v-if="!sv.ngayht">
            <input type="date" name="" id="" v-model="ngay" />
          </div>
        </td>
        <td>
          <div v-if="sv.show">
            <div v-if="sv.ngayht">
              <button
                type="button"
                class="btn btn-success"
                @click="Cokochinhngay(sv)"
              >
                O
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="Vangkochinhngay(sv)"
              >
                X
              </button>
            </div>
            <div v-if="!sv.ngayht">
              <button
                type="button"
                class="btn btn-success"
                @click="Cochinhngay(sv)"
              >
                O
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="Vangcochinhngay(sv)"
              >
                X
              </button>
            </div>
          </div>
          <div v-if="!sv.show">
            <div v-if="sv.ngayht">
              <button
                type="button"
                class="btn btn-success"
                @click="addkochinhngay(sv)"
              >
                Cập nhật
              </button>
            </div>
            <div v-if="!sv.ngayht">
              <button
                type="button"
                class="btn btn-danger"
                @click="addcochinhngay(sv)"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </td>
        <td></td>
      </tr>
      <tr></tr>
    </tbody>
  </table>
</template>

<script>
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  setDoc,
  doc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { initializeApp } from "firebase/app"; // Import initializeApp function separately
import { onUnmounted, ref } from "vue";
import moment from "moment";
import Swal from "sweetalert2";
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
const db = getFirestore(app);

export default {
  data() {
    return {
      sinhvien: ref([]),
      lop: ref([]),
      classId: null, // Lưu trữ ID của lớp
      ten: [],
      mssv: [],
      ngaylop: [],
      tongvang: [],
      addSuccessMessage: null,
      show: true,
      diemdanh: 0,
      disable: true,
      ngay: "",
      ngayht: true,
    };
  },
  methods: {
    ngaynow(sv) {
      const newVang = [...sv.vang];

      setDoc(doc(db, "sinhvien", sv.id), {
        IdLop: sv.IdLop,
        ten: sv.ten,
        vang: newVang,
        show: true,
        diemdanh: 5,
        ngayht: false,
      });
    },

    Vangkochinhngay: function (sv) {
      const vangIndex = sv.IdLop.indexOf(this.classId); //lấy vị trí mã lớp
      const newVang = [...sv.vang];
      newVang[vangIndex] += 5;
      setDoc(doc(db, "sinhvien", sv.id), {
        IdLop: sv.IdLop,
        ten: sv.ten,
        vang: newVang,
        show: false,
        diemdanh: 5,
        ngayht: true,
      });
    },
    Cokochinhngay(sv) {
      const newVang = [...sv.vang];
      setDoc(doc(db, "sinhvien", sv.id), {
        IdLop: sv.IdLop,
        ten: sv.ten,
        vang: newVang,
        show: false,
        diemdanh: 0,
        ngayht: true,
      });
    },
    Vangcochinhngay: function (sv) {
      const vangIndex = sv.IdLop.indexOf(this.classId); //lấy vị trí mã lớp
      const newVang = [...sv.vang];
      newVang[vangIndex] += 5;
      setDoc(doc(db, "sinhvien", sv.id), {
        IdLop: sv.IdLop,
        ten: sv.ten,
        vang: newVang,
        show: false,
        diemdanh: 5,
        ngayht: false,
      });
    },
    Cochinhngay(sv) {
      const newVang = [...sv.vang];
      setDoc(doc(db, "sinhvien", sv.id), {
        IdLop: sv.IdLop,
        ten: sv.ten,
        vang: newVang,
        show: false,
        diemdanh: 0,
        ngayht: false,
      });
    },

    addkochinhngay: async function (sv) {
      // const formattedDate = moment(this.ngay).format("DD-MM-YYYY");
      const timestamp = Timestamp.now();
      const dateString = moment(timestamp.toDate()).format("DD-MM-YYYY");
      const vangIndex = sv.IdLop.indexOf(this.classId); //lấy vị trí mã lớp
      const newVang = [...sv.vang];
      const vang = newVang[vangIndex];

      if (!this.tongvang.includes(vang)) {
        return this.tongvang.push(vang);
      }
      console.log(dateString);

      try {
        // đổi khóa chính thành mã lớp
        await addDoc(collection(db, "ketqua"), {
          idlop: this.classId,
          ten: sv.ten, //add mảng tên trên vào
          mssv: sv.id, //add mảng mssv trên vào
          ngay: dateString,
          tongvang: vang,
          diemdanh: sv.diemdanh,
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Cập nhật thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Cập nhật thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error(error);
      }
      setDoc(doc(db, "sinhvien", sv.id), {
        IdLop: sv.IdLop,
        ten: sv.ten,
        vang: newVang,
        show: true,
        diemdanh: 0,
        ngayht: true,
      });
    },
    addcochinhngay: async function (sv) {
      const formattedDate = moment(this.ngay).format("DD-MM-YYYY");

      const vangIndex = sv.IdLop.indexOf(this.classId); //lấy vị trí mã lớp
      const newVang = [...sv.vang];
      const vang = newVang[vangIndex];

      if (!this.tongvang.includes(vang)) {
        return this.tongvang.push(vang);
      }

      try {
        // đổi khóa chính thành mã lớp
        await addDoc(collection(db, "ketqua"), {
          idlop: this.classId,
          ten: sv.ten, //add mảng tên trên vào
          mssv: sv.id, //add mảng mssv trên vào
          ngay: formattedDate,
          tongvang: vang,
          diemdanh: sv.diemdanh,
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Cập nhật thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Cập nhật thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error(error);
      }
      setDoc(doc(db, "sinhvien", sv.id), {
        IdLop: sv.IdLop,
        ten: sv.ten,
        vang: newVang,
        show: true,
        diemdanh: 0,
        ngayht: true,
      });
    },
  },
  computed: {
    // Sử dụng computed property để lọc sinh viên dựa trên classId
    filteredStudents() {
      // Lọc ra sinh viên dựa trên việc kiểm tra sự tồn tại của classId trong IdLop (giả định IdLop là mảng)
      return this.sinhvien.filter((sv) => {
        // VD: Nếu IdLop là một mảng
        return sv.IdLop && sv.IdLop.some((lop) => lop === this.classId);
        // Hoặc nếu IdLop là một giá trị duy nhất, sử dụng:
        // return sv.IdLop === this.classId;
      });
    },
  },
  mounted() {
    // Lấy classId từ route
    this.classId = this.$route.params.id;
    console.log("Class ID:", this.classId); // Log the classId
    const timestamp = Timestamp.now();
    const dateString = moment(timestamp.toDate()).format("DD-MM-YYYY");
    // Query sinh viên từ Firestore
    const latestQuery = query(collection(db, "sinhvien"));
    const livemessages = onSnapshot(latestQuery, (snapshot) => {
      this.sinhvien = snapshot.docs.map((doc) => {
        const sv = {
          id: doc.id,
          ten: doc.data().ten,
          lopId: doc.data().classId,
          IdLop: doc.data().IdLop,
          vang: doc.data().vang,
          show: doc.data().show,
          diemdanh: doc.data().diemdanh,
          ngaynow: dateString,
          ngayht: doc.data().ngayht,

          // Thêm lopId vào dữ liệu sinh viên
        };
        console.log("Sinh viên:", sv); // Log each student to check lopId
        return sv;
      });
    });

    onUnmounted(livemessages);
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
