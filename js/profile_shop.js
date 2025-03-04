console.log("ไฟล์ profile_shop.js ถูกโหลดแล้ว");
document.addEventListener("DOMContentLoaded", function () {
    loadProfile();
});
document.addEventListener("DOMContentLoaded", function () {
    console.log("โหลดหน้าโปรไฟล์");
    loadProfile();
});

function loadProfile() {
    console.log("กำลังโหลดข้อมูลโปรไฟล์...");
    const shopName = localStorage.getItem("shopName") || "ยังไม่มีข้อมูล";
    const shopTime = localStorage.getItem("shopTime") || "ยังไม่มีข้อมูล";
    const shopAddress = localStorage.getItem("shopAddress") || "ยังไม่มีข้อมูล";
    const phoneNumber = localStorage.getItem("phoneNumber") || "ยังไม่มีข้อมูล";
    const serviceList = localStorage.getItem("serviceList") || "ยังไม่มีข้อมูล";
    const imageSrc = localStorage.getItem("shopImage");

    document.getElementById("shopNameView").innerText = shopName;
    document.getElementById("shopTimeView").innerText = shopTime;
    document.getElementById("shopAddress").innerText = shopAddress;
    document.getElementById("phoneNumber").innerText = phoneNumber;
    document.getElementById("serviceListView").innerText = serviceList;

    if (imageSrc) {
        document.getElementById("shopImageView").src = imageSrc;
    } else {
        document.getElementById("shopImageView").src = "../../img/default.jpg";
    }
}

function editProfile() {
    console.log("เข้าสู่โหมดแก้ไข");
    document.getElementById("profileView").classList.add("hidden");
    document.getElementById("editForm").classList.remove("hidden");
}

function editProfile() {
    console.log("เข้าสู่โหมดแก้ไข");

    // ซ่อนหน้าโปรไฟล์
    document.getElementById("profileView").style.display = "none";

    // แสดงฟอร์มแก้ไข
    document.getElementById("editForm").style.display = "block";

    // โหลดข้อมูลเก่าลงใน input
    document.getElementById("shopName").value = document.getElementById("shopNameView").innerText;
    document.getElementById("shopTime").value = document.getElementById("shopTimeView").innerText;
    document.getElementById("shopAddress").value = document.getElementById("shopAddressView").innerText;
    document.getElementById("phoneNumber").value = document.getElementById("phoneNumberView").innerText;
    document.getElementById("serviceList").value = document.getElementById("serviceListView").innerText;

    // โหลดรูปภาพ (ถ้ามี)
    const imgSrc = document.getElementById("shopImageView").src;
    document.getElementById("shopImage").src = imgSrc ? imgSrc : "../../img/default.jpg";
}

document.getElementById("uploadImage").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("shopImage").src = e.target.result;
            localStorage.setItem("shopImage", e.target.result); // บันทึกรูปภาพลง LocalStorage ทันที
        };
        reader.readAsDataURL(file);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("editForm").classList.add("hidden"); // ซ่อนฟอร์มแก้ไขก่อน
    loadProfile(); // โหลดข้อมูลโปรไฟล์
});

function saveProfile() {
    console.log("บันทึกข้อมูลโปรไฟล์...");

    // ดึงค่าจากฟอร์ม
    const shopName = document.getElementById("shopName").value;
    const shopTime = document.getElementById("shopTime").value;
    const shopAddress = document.getElementById("shopAddress").value; // เปลี่ยนจาก shopAddressInput
    const phoneNumber = document.getElementById("phoneNumber").value;
    const serviceList = document.getElementById("serviceList").value;
    const shopImage = document.getElementById("shopImage").src; // รูปภาพร้าน

    // บันทึกลง LocalStorage
    localStorage.setItem("shopName", shopName);
    localStorage.setItem("shopTime", shopTime);
    localStorage.setItem("shopAddress", shopAddress);
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("serviceList", serviceList);
    localStorage.setItem("shopImage", shopImage);

    alert("บันทึกข้อมูลเรียบร้อย!");

    // โหลดข้อมูลใหม่เข้าโปรไฟล์
    loadProfile();

    // กลับไปที่หน้าโปรไฟล์
    cancelEdit();
}

function cancelEdit() {
    console.log("ยกเลิกการแก้ไข");

    // แสดงหน้าโปรไฟล์อีกครั้ง
    document.getElementById("profileView").style.display = "block";

    // ซ่อนฟอร์มแก้ไข
    document.getElementById("editForm").style.display = "none";
}
