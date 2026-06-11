document.querySelectorAll('.nav-links li').forEach(item => {
    item.addEventListener('click', function(e) {
        document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
        this.classList.add('active');
    });
});