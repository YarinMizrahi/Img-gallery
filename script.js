const gallery = document.getElementById('gallery');
let page = 1;
const accessKey = 'RwmdLTrTN0i89M8CYJuAnNrqmOfollXzYgaR1O2t6Yo';

async function fetchPhotos() {
    try {
        const response = await fetch(
            `https://api.unsplash.com/photos?client_id=${accessKey}&page=${page}&per_page=15`
        );
        const data = await response.json();

        data.forEach(photo => {
            const imgElement = document.createElement('div');
            imgElement.classList.add('gallery-item');
            imgElement.innerHTML = `
                <img 
                    src="${photo.urls.small}" 
                    alt="${photo.alt_description || 'Image'}" 
                    loading="lazy">
                <div class="info">
                    <div class="title">${photo.user.name}</div>
                    <div class="description">${photo.alt_description || 'No description available'}</div>
                </div>`;
            gallery.appendChild(imgElement);

            // הפעלת אנימציה עם GSAP
            gsap.from(imgElement, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out",
            });
        });

        page++;
    } catch (error) {
        console.error('Error fetching photos:', error);
    }
}

// קריאה ראשונית של התמונות
fetchPhotos();

// מאזין לגלילה להוספת תמונות נוספות
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        fetchPhotos();
    }
});
