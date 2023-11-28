document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-input");
    const importButton = document.getElementById("import-button");
  
    importButton.addEventListener("click", function () {
      fileInput.click();
    });
  
    fileInput.addEventListener("change", function () {
      const file = fileInput.files[0];
  
      if (file) {
        readFile(file);
      }
    });
  
    function readFile(file) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const content = e.target.result;
        try {
          const videosData = JSON.parse(content);
          processVideosData(videosData);
        } catch (error) {
          console.error("Error parsing JSON file:", error);
        }
      };
  
      reader.readAsText(file);
    }
  
    function processVideosData(videosData) {
      // Here you can access the fields like video_title, views, trending_data, etc.
      console.log("Video Title:", videosData.video_title);
      console.log("Views:", videosData.views);
      console.log("Trending Data:", videosData.trending_data);
      console.log("Category ID:", videosData.category_id);
      console.log("Channel Title:", videosData.channel_title);
      console.log("Views Likes Ratio:", videosData.views_likes_ratio);
      console.log("Click Rate:", videosData.click_rate);
      console.log("Tags:", videosData.tags);
  
      // Insert video to database here???
    }
  });
  