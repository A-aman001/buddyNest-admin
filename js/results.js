let services = JSON.parse(localStorage.getItem('services')) || [];
function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function () {
        document.getElementById('preview').src = reader.result;
        document.getElementById('preview').style.display = 'block';
    };
    reader.readAsDataURL(event.target.files[0]);
}
function addService() {
    const name = document.getElementById('shopName').value;
    const details = document.getElementById('serviceDetails').value;
    const extra = document.getElementById('extraDetails').value;
    const file = document.getElementById('fileInput').files[0];
    if (!name || !details) return alert("กรุณากรอกข้อมูลให้ครบ!");
    const reader = new FileReader();
    reader.onload = function (event) {
        services.push({ name, details, extra, image: event.target.result });
        localStorage.setItem('services', JSON.stringify(services));
        renderServices();
    };
    if (file) reader.readAsDataURL(file);
    else {
        services.push({ name, details, extra, image: "" });
        localStorage.setItem('services', JSON.stringify(services));
        renderServices();
    }
}
function renderServices() {
    const list = document.getElementById('serviceList');
    list.innerHTML = "";
    services.forEach((service, index) => {
        list.innerHTML += `
                    <div class="service-item">
                        ${service.image ? `<img src="${service.image}" width="50">` : ""}
                        <strong>${service.name}</strong> - ${service.details}
                        <span class="remove-btn" onclick="removeService(${index})">ลบ</span>
                    </div>
                `;
    });
}
function removeService(index) {
    services.splice(index, 1);
    localStorage.setItem('services', JSON.stringify(services));
    renderServices();
}
function saveAndGo() {
    localStorage.setItem('services', JSON.stringify(services));
    window.location.href = "results.html";
}
renderServices();
document.addEventListener("DOMContentLoaded", function () {
    const resultsContainer = document.querySelector(".cards"); // จุดที่จะแสดงการ์ด
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    function renderCards() {
        resultsContainer.innerHTML = ""; // เคลียร์ก่อนเพิ่มข้อมูลใหม่

        savedBookings.forEach((booking, index) => {
            const card = document.createElement("section");
            card.classList.add("card");
            card.innerHTML = `
                <a href="h.html">
                    <img src="${booking.image}" alt="${booking.name}" style="width: 80%; border-radius: 10px;">
                    <p>ร้าน: ${booking.name}</p>
                    <p>บริการ: ${booking.service}</p>
                    <p>วันที่จอง: ${booking.date}</p>
                    <p>เวลา: ${booking.time}</p>
                    <button onclick="removeBooking(${index})">❌ ลบ</button>
                </a>
            `;
            resultsContainer.appendChild(card);
        });
    }

    renderCards(); // โหลดข้อมูลเมื่อเปิดหน้า

    // ฟังก์ชันลบการจอง
    window.removeBooking = function (index) {
        savedBookings.splice(index, 1); // ลบรายการออก
        localStorage.setItem("bookings", JSON.stringify(savedBookings)); // อัปเดตข้อมูล
        renderCards(); // โหลดใหม่
    };
});