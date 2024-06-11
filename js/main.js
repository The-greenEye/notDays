let inpTitle = document.getElementById("title");
let inpAbout = document.getElementById("about");
let clicked = document.getElementById("click-send");

// تحقق من وجود بيانات مخزنة واسترجاعها إذا كانت موجودة
let data = JSON.parse(localStorage.getItem("dataTypeing")) || [];

// إضافة مستمع الحدث للنقر على الزر
clicked.addEventListener('click', function () {
  // إنشاء كائن جديد للبيانات
  let dataPush = {
    title: inpTitle.value.trim(),
    about: inpAbout.value.trim(),
  };

  // التحقق من أن العناوين والوصف ليست فارغة
  if(dataPush.title && dataPush.about) {
    // إضافة البيانات الجديدة إلى المصفوفة وتحديث التخزين المحلي
    data.push(dataPush);
    localStorage.setItem("dataTypeing", JSON.stringify(data));

    // إعادة تعيين القيم في الحقول
    inpTitle.value = "";
    inpAbout.value = "";
  } else {
    console.error('العنوان والوصف لا يمكن أن يكونا فارغين');
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/service-worker.js").then(
      function (registration) {
        // تسجيل ناجح
        console.log("ServiceWorker registration successful with scope: ", registration.scope);
      },
      function (err) {
        // فشل التسجيل
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // العودة بالملفات من الذاكرة المؤقتة إذا كانت متوفرة
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
