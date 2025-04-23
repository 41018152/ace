// translate.js
document.addEventListener("DOMContentLoaded", function() {
    const openCameraBtn = document.getElementById('open-camera');
    const takePhotoBtn = document.getElementById('take-photo');
    const openGalleryBtn = document.getElementById('open-gallery');
    const translateImageBtn = document.getElementById('translate-image');
    const backToMainTranslateBtn = document.getElementById('back-to-main-translate');
    const resultContainer = document.getElementById('translate-result');
    const videoElement = document.getElementById('camera-video');
    const canvasElement = document.getElementById('photo-canvas');
    const context = canvasElement.getContext('2d');
    const inputFile = document.getElementById('image-file');
    
    let currentImage = null;
  
    // 開啟鏡頭
    openCameraBtn.addEventListener('click', function() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function(stream) {
            videoElement.srcObject = stream;
            videoElement.play();
          })
          .catch(function(error) {
            alert('無法啟動攝影機：' + error.message);
          });
      } else {
        alert("不支援攝影機功能");
      }
    });
  
    // 拍照按鈕
    takePhotoBtn.addEventListener('click', function() {
      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;
      context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
      currentImage = canvasElement.toDataURL('image/png');
      processImage(currentImage);
    });
  
    // 開啟相簿選擇圖片
    openGalleryBtn.addEventListener('click', function() {
      inputFile.click();
    });
  
    inputFile.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          currentImage = e.target.result;
          processImage(currentImage);
        };
        reader.readAsDataURL(file);
      }
    });
  
    // 圖片翻譯處理
    function processImage(imageData) {
      // 假設這裡是圖片翻譯處理的地方
      resultContainer.innerHTML = `<p>正在翻譯圖片...</p>`;
      setTimeout(() => {
        resultContainer.innerHTML = `<p>翻譯結果：<br>這是一張圖片的翻譯結果。</p>`;
      }, 2000);
    }
  
    // 返回主頁
    backToMainTranslateBtn.addEventListener('click', function() {
      document.getElementById("translate-container").style.display = "none";
      document.getElementById("main-container").style.display = "block";
    });
  
    // 編輯JS功能的按鈕，這裡是範例，實際上會用別的方式進行編輯
    document.getElementById('edit-translate-js').addEventListener('click', function() {
      alert("你正在編輯 translate.js，這裡可以放置你的編輯功能。");
    });
  });
  