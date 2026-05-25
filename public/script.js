const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const overlay = document.getElementById("overlay");

function toggleMenu() {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
  overlay.classList.toggle("active");
}

const searchInput = document.getElementById("searchInput");

const suggestions = document.getElementById("suggestions");

if (searchInput) {
  searchInput.addEventListener("input", async () => {
    let value = searchInput.value.trim();

    if (!value) {
      suggestions.style.display = "none";

      return;
    }

    let response = await fetch(`/listing/suggestions?search=${value}`);

    let data = await response.json();

    suggestions.innerHTML = "";

    if (data.length === 0) {
      suggestions.style.display = "none";

      return;
    }

    data.forEach((item) => {
      const div = document.createElement("div");

      div.classList.add("suggestion-item");

      div.innerHTML = `
          <strong>${item.title}</strong>
          <br>
          <small>
            ${item.location},
            ${item.country}
          </small>
        `;

      div.addEventListener("click", () => {
        window.location.href = `/listing/${item._id}`;
      });

      suggestions.appendChild(div);
    });

    suggestions.style.display = "block";
  });

  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target)) {
      suggestions.style.display = "none";
    }
  });
}
