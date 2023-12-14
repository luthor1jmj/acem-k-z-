document.addEventListener("DOMContentLoaded", function () {
    const itemsPerPage = 16;
    let currentPage = 1;

    const videoList = [
       //  { title: "", url: "videolar2/2 (1).mp4", thumbnail: "resimler2/2 (1).png", category: "category1", description: "" },


       { title: "Kızıl afet den bir sakso", url: "videolar/1.mp4", thumbnail: "resimler/1.png", category: "category1", description: "Kızıl saçlı afet erkeğinin taşşaklarına kadar yalıyor" },
       
       { title: "Kızıl yarrak istiyor", url: "videolar/3.mp4", thumbnail: "resimler/3.png", category: "category2", description: "Kızıl saçlı kadın erkeği için domalıyor(admin tavsiysi)" },
      
       { title: "Fazntezik üni liler", url: "videolar/5.mp4", thumbnail: "resimler/5.png", category: "category2", description: "Üniversiteli gençler fazntezi peşinde" },
       { title: "Sarışına nefes aldırmıyor", url: "videolar/6.mp4", thumbnail: "resimler/6.png", category: "category2", description: "seni ilk siktiğimde kaç yaşındayıdn diye soruyor" },
       { title: "İnci gibi kızdan sakso", url: "videolar/7.mp4", thumbnail: "resimler/7.png", category: "category1", description: "Taş gibi liseli sevgilisine sakso çektiriyor" }, 
      
       { title: "Küçük bi sakso", url: "videolar1/1 (2).mp4", thumbnail: "resimler1/1 (2).png", category: "category1", description: "" },
    
       { title: "Adanalı keko 1", url: "videolar1/1 (4).mp4", thumbnail: "resimler1/1 (4).png", category: "category2", description: "" },
       { title: "Adanalı keko 2", url: "videolar1/1 (5).mp4", thumbnail: "resimler1/1 (5).png", category: "category1", description: "" },
      
      { title: "Çok azgın çok", url: "videolar1/1 (7).mp4", thumbnail: "resimler1/1 (7).png", category: "category2", description: "" },
     

       

    ];

    const videosContainer = document.getElementById("videos");
    const searchInput = document.getElementById("searchInput");
    const categorySelect = document.getElementById("categorySelect");
    const prevPageButton = document.getElementById("prevPage");
    const nextPageButton = document.getElementById("nextPage");
    const currentPageElement = document.getElementById("currentPage");

    // Sayfa yüklendiğinde önceki sayfa numarasını kontrol et
    const savedPage = sessionStorage.getItem("currentPage");
    if (savedPage) {
        currentPage = Math.ceil(savedPage / itemsPerPage);
    }

    renderVideos(videoList);

    // Arama ve kategori seçimi değişikliklerine göre video listesini güncelle
    searchInput.addEventListener("input", updateVideoList);
    categorySelect.addEventListener("change", updateVideoList);

    // Sayfalama butonlarına tıklama olayları
    prevPageButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            renderVideos(videoList);
            updatePageSelect();
        }
    });

    nextPageButton.addEventListener("click", function () {
        const maxPage = Math.ceil(videoList.length / itemsPerPage);
        if (currentPage < maxPage) {
            currentPage++;
            renderVideos(videoList);
            updatePageSelect();
        }
    });

    // Sayfa seçim çubuğunu doldur
    populatePageSelect();

    // Sayfa seçim çubuğuna değişiklik olayı ekle
    const pageSelect = document.getElementById("pageSelect");
    pageSelect.addEventListener("change", function () {
        currentPage = parseInt(pageSelect.value, 10);
        renderVideos(videoList);
    });

    function renderVideos(videoList) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentVideos = videoList.slice(startIndex, endIndex);

        videosContainer.innerHTML = "";

        currentVideos.forEach((video, index) => {
            const videoWrapper = document.createElement("div");
            videoWrapper.classList.add("video-wrapper");

            const thumbnailElement = document.createElement("img");
            thumbnailElement.src = video.thumbnail;
            thumbnailElement.alt = video.title;

            const titleElement = document.createElement("h2");
            titleElement.textContent = video.title;

            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = video.description || "Açıklama yok";

            videoWrapper.appendChild(thumbnailElement);
            videoWrapper.appendChild(titleElement);
            videoWrapper.appendChild(descriptionElement);

            // Video resmine ve başlığa tıklama olayı ekle
            thumbnailElement.addEventListener("click", () => redirectToVideoPage(video));
            titleElement.addEventListener("click", () => redirectToVideoPage(video));

            videosContainer.appendChild(videoWrapper);
        });

        currentPageElement.textContent = currentPage;
        updatePageSelect();
    }

    function updateVideoList() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;

        const filteredVideos = videoList.filter((video) => {
            const titleMatch = video.title.toLowerCase().includes(searchTerm);
            const categoryMatch =
                selectedCategory === "all" || video.category === selectedCategory;

            return titleMatch && categoryMatch;
        });

        currentPage = 1;
        renderVideos(filteredVideos);
    }

    function populatePageSelect() {
        const maxPage = Math.ceil(videoList.length / itemsPerPage);
        const pageSelect = document.getElementById("pageSelect");

        pageSelect.innerHTML = "";

        for (let i = 1; i <= maxPage; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            pageSelect.appendChild(option);
        }

        pageSelect.value = currentPage;
    }

    function updatePageSelect() {
        const pageSelect = document.getElementById("pageSelect");
        pageSelect.value = currentPage;
    }

    function redirectToVideoPage(video) {
        // Yeni bir sayfaya yönlendirme işlemini gerçekleştirir.
        sessionStorage.setItem("currentPage", currentPage * itemsPerPage); // Sayfa numarasını sakla
        window.location.href = `video.html?src=${encodeURIComponent(video.url)}&title=${encodeURIComponent(video.title)}&description=${encodeURIComponent(video.description)}`;
    }
});
