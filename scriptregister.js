// Wait for the DOM to be fully responsive and parsed
document.addEventListener("DOMContentLoaded", () => {
    
    // Accessibility zoom engine (Preserving your exact features)
    const btnZoomIn = document.getElementById("btn-zoom-in");
    const btnZoomOut = document.getElementById("btn-zoom-out");

    let currentFontSize = 100;

    const updateFontSize = (size) => {
        document.documentElement.style.fontSize = `${size}%`;
    };

    if (btnZoomIn && btnZoomOut) {
        btnZoomIn.addEventListener("click", () => {
            if (currentFontSize < 140) {
                currentFontSize += 10;
                updateFontSize(currentFontSize);
            }
        });

        btnZoomOut.addEventListener("click", () => {
            if (currentFontSize > 90) {
                currentFontSize -= 10;
                updateFontSize(currentFontSize);
            }
        });

        // Key event support (Space / Enter) for accessibility
        const accessibilityButtons = [btnZoomIn, btnZoomOut];
        accessibilityButtons.forEach(button => {
            button.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    button.click();
                }
            });
        });
    }
});

// 1. Process Registration Form Submission (From register.html)
function handleRegister(event) {
    event.preventDefault();
    
    // Get the first name to customize the welcome message
    const name = document.getElementById('reg-first-name').value;
    
    alert(`Account Created Successfully!\n\nWelcome to ConnectCare, ${name}.\nLet's set up the senior profile next.`);
    
    // Redirects automatically to the senior profile specifications page
    window.location.href = "senior-profile.html";
}

// 2. Process Senior Profile Specifications Submission (From senior-profile.html)
function handleSeniorProfile(event) {
    event.preventDefault();
    
    // Get fields to verify insertion
    const seniorName = document.getElementById('senior-name').value;
    const careType = document.getElementById('service-needed').value;
    
    alert(`Profile Created Successfully!\n\nMedical and care specifications for "${seniorName}" have been saved.\nWe are matching you with our best team for: ${careType}.`);
    
    // Redirects to home page or main dashboard
    window.location.href = "index.html";
}