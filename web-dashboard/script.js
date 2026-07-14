// PocketCam local gallery client
// Fetches the photo list from the ESP32 and renders thumbnails.
// Replace the placeholder endpoint below once the firmware route is defined.

const GALLERY_ENDPOINT = "/photos";

async function loadGallery() {
  try {
    const res = await fetch(GALLERY_ENDPOINT);
    const photos = await res.json();
    renderGallery(photos);
  } catch (err) {
    console.error("Could not load photos from camera:", err);
  }
}

function renderGallery(photos) {
  const gallery = document.getElementById("gallery");
  const count = document.getElementById("photo-count");
  gallery.innerHTML = "";
  count.textContent = `${photos.length} photos`;

  photos.forEach((photo) => {
    const img = document.createElement("img");
    img.src = photo.url;
    img.alt = photo.filename;
    gallery.appendChild(img);
  });
}

document.getElementById("download-all").addEventListener("click", () => {
  // Placeholder: implement a zipped download route on the ESP32,
  // or trigger sequential downloads of each photo URL.
  console.log("Download all requested");
});

loadGallery();
