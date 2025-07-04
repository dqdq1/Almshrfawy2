// رفع البحث إلى localStorage
const uploadForm = document.getElementById('uploadForm');
if (uploadForm) {
  uploadForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const desc = document.getElementById('desc').value;
    const category = document.getElementById('category').value;
    const file = document.getElementById('pdfFile').files[0];
    const reader = new FileReader();

    reader.onload = function () {
      const paper = { title, desc, category, pdf: reader.result };
      const saved = JSON.parse(localStorage.getItem("papers") || "[]");
      saved.push(paper);
      localStorage.setItem("papers", JSON.stringify(saved));
      alert("تم رفع البحث!");
      uploadForm.reset();
    };

    if (file) reader.readAsDataURL(file);
  });
}

// عرض المكتبة + فلترة حسب التصنيف
const library = document.getElementById('library');
if (library) {
  const saved = JSON.parse(localStorage.getItem("papers") || "[]");

  function displayPapers(data) {
    library.innerHTML = '';
    data.forEach(p => {
      const card = document.createElement('div');
      card.className = 'paper-card';
      card.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <small>📂 ${p.category}</small><br>
        <a href="preview.html?desc=${encodeURIComponent(p.desc)}&pdf=${encodeURIComponent(p.pdf)}" class="btn">عرض</a>
      `;
      library.appendChild(card);
    });
  }

  window.filterPapers = function (cat) {
    const filtered = cat === "الكل" ? saved : saved.filter(p => p.category === cat);
    displayPapers(filtered);
  };

  displayPapers(saved);
}
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('dark', document.body.classList.contains('dark-mode'));
}

window.onload = () => {
  if (localStorage.getItem('dark') === "true") {
    document.body.classList.add('dark-mode');
  }
}
