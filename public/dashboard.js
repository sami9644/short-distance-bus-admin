const modal = document.getElementById('modalContainer');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');

// Open modal
openBtn.onclick = () => {
    modal.style.display = 'flex';
}

// Close modal via X button
closeBtn.onclick = () => {
    modal.style.display = 'none';
}

// Close modal if user clicks anywhere outside the white box
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}