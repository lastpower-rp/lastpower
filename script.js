document.addEventListener('DOMContentLoaded', function() {
    // Expandable rules sections
    const expandableSections = document.querySelectorAll('.rules-section h2');
    expandableSections.forEach(section => {
        section.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });

    // Safe zone image modal
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("safeZoneImage");
    const captionText = document.getElementById("caption");
    const safeZones = document.getElementsByClassName("safe-zone");

    for (let i = 0; i < safeZones.length; i++) {
        safeZones[i].onclick = function(e) {
            e.preventDefault();
            modal.style.display = "block";
            modalImg.src = this.getAttribute("data-image");
            captionText.innerHTML = this.textContent;
        }
    }

    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});