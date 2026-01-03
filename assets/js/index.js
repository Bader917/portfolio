var settingsButton = document.getElementById('settings-toggle');
var sideBader = document.getElementById('settings-sidebar');
var clsSidebar = document.getElementById('close-settings');

settingsButton.addEventListener(('click'), () => {
    showSettingsBox();
});

clsSidebar.addEventListener(('click'), () => {
    closeSidebarBox();
});

// Show SideBar Settings
function showSettingsBox() {
    settingsButton.style.right = '20rem';
    sideBader.classList.remove('translate-x-full');
}

// close SideBar Settings
function closeSidebarBox() {
    settingsButton.style.right = '0';
    sideBader.classList.add('translate-x-full');
}

// Close sidebar If User Click Outside The Setting Box
document.addEventListener(('click'), (event) => {
    if (!sideBader.contains(event.target) && !settingsButton.contains(event.target)) {
        closeSidebarBox();
    };
});

// Check If User Chosse Font Form List
var fontList = document.querySelectorAll('.font-option');
fontList.forEach((font) => {
    font.addEventListener(('click'), () => {
        var selectedFont = font.dataset.font;

        localStorage.setItem('selected-font', selectedFont);

        fontList.forEach((font) => {
            font.classList.remove('active');
            font.classList.add('border-slate-200');
            font.classList.remove('border-primary');
        });

        font.classList.add('active');
        font.classList.remove('border-slate-200');
        font.classList.add('border-primary');

        document.body.classList.remove('font-tajawal', 'font-cairo', 'font-alexandria');

        document.body.classList.add(`font-${selectedFont}`);
    })
});

// Check If LocalStorage Has Font
var savedFont = localStorage.getItem('selected-font');
if (savedFont) {

    document.body.classList.remove('font-tajawal', 'font-cairo', 'font-alexandria');
    document.body.classList.add(`font-${savedFont}`);

    fontList.forEach((font) => {
        if (font.dataset.font === savedFont) {
            font.classList.add('active');
            font.classList.remove('border-slate-200');
            font.classList.add('border-primary');
        } else {
            font.classList.remove('active');
            font.classList.add('border-slate-200');
        }
    });
}

// Toggle light & Night Mood
var themeButton = document.getElementById('theme-toggle-button');
var htmlDocument = document.documentElement;

// Save Thme To Local Storage
var savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Toggle Mood On User Click
themeButton.addEventListener('click', () => {
    var newTheme = htmlDocument.classList.contains('dark') ? 'light' : 'dark';
    setTheme(newTheme);
});

// Set New Theme
function setTheme(theme) {
    htmlDocument.classList.remove('light', 'dark');
    htmlDocument.classList.add(theme);
    localStorage.setItem('theme', theme);
}

var themes = [
    {
        primary: "#6366f1",
        secondary: "#8b5cf6",
        accent: "#a855f7"
    },
    {
        primary: "#ec4899",
        secondary: "#f97316",
        accent: "#fb923c"
    },
    {
        primary: "#10b981",
        secondary: "#059669",
        accent: "#34d399"
    },
    {
        primary: "#3b82f6",
        secondary: "#06b6d4",
        accent: "#22d3ee"
    },
    {
        primary: "#ef4444",
        secondary: "#f43f5e",
        accent: "#fb7185"
    },
    {
        primary: "#f59e0b",
        secondary: "#ea580c",
        accent: "#fbbf24"
    },
];

// Chosse Color Theme
var colorsCon = document.getElementById('theme-colors-grid');

themes.forEach(theme => {
    colorsCon.innerHTML +=
        `
    <button
      class="w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm"
      title="${theme.title}"
      data-primary="${theme.primary}"
      data-secondary="${theme.secondary}"
      data-accent="${theme.accent}"
      style="background: linear-gradient(135deg, ${theme.primary}, ${theme.secondary});">
    </button>
  `;
});

var button = document.querySelectorAll('#theme-colors-grid button');

button.forEach((btn) => {
    btn.addEventListener('click', () => {
        setColorTheme(btn);
        setActiveButton(btn);
    })
});

var root = document.documentElement;
function setColorTheme(btn) {
    var theme = {
        primary: btn.dataset.primary,
        secondary: btn.dataset.secondary,
        accent: btn.dataset.accent
    };

    root.style.setProperty('--color-primary', btn.dataset.primary);
    root.style.setProperty('--color-secondary', btn.dataset.secondary);
    root.style.setProperty('--color-accent', btn.dataset.accent);

    localStorage.setItem('selected-Theme', JSON.stringify(theme));
}

function setActiveButton(activeBtn) {
    button.forEach(btn => btn.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-white', 'dark:ring-offset-slate-900'));
    activeBtn.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-white', 'dark:ring-offset-slate-900');
}

window.addEventListener('DOMContentLoaded', () => {
    var savedTheme = localStorage.getItem('selected-Theme');
    if (!savedTheme) return;

    var theme = JSON.parse(savedTheme);

    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-accent', theme.accent);

    button.forEach(btn => {
        if (btn.dataset.primary === theme.primary &&
            btn.dataset.secondary === theme.secondary &&
            btn.dataset.accent === theme.accent) {
            btn.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-white', 'dark:ring-offset-slate-900');
        } else {
            btn.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-white', 'dark:ring-offset-slate-900');
        }
    });
});

// Handel Scroll To Top Button
var scrollTopButton = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 1200) {
        scrollTopButton.classList.remove('invisible', 'opacity-0');
    } else {
        scrollTopButton.classList.add('invisible', 'opacity-0');
    }
});

// Back To Top When User Click Scroll To Top Button
scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Handle Active Linke

// Using Ai To Handle This Function //
var navLinks = document.querySelectorAll('.nav-links a');
var sections = document.querySelectorAll('section');

function updateActiveLink() {
    let scrollPos = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
        var top = section.offsetTop;
        var bottom = top + section.offsetHeight;

        if (scrollPos >= top && scrollPos < bottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            var id = section.getAttribute('id');
            var activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

window.addEventListener('load', updateActiveLink);
window.addEventListener('scroll', updateActiveLink);

var portfolioItem = document.querySelectorAll('.portfolio-item');
var portfolioButtons = document.querySelectorAll('.portfolio-filter');
var portfolioContainer = document.getElementById('portfolio-grid');

portfolioButtons.forEach((button) => {
    button.addEventListener('click', (e) => {

        portfolioButtons.forEach(btn => {
            btn.classList.remove("active", "bg-linear-to-r", "from-primary", "to-secondary", "text-white", "shadow-lg", "shadow-primary/50");
            btn.classList.add("bg-white", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "border", "border-slate-300", "dark:border-slate-700");
        });

        e.target.classList.add("active", "bg-linear-to-r", "from-primary", "to-secondary", "text-white", "shadow-lg", "shadow-primary/50");
        e.target.classList.remove("bg-white", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "border", "border-slate-300", "dark:border-slate-700");

        var currentBtn = e.target.dataset.filter;
        filterPortfolio(currentBtn);

    });
})

function filterPortfolio(category) {
    portfolioItem.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Handle Testimonial Section Buttons
var tsCar = document.getElementById('testimonials-carousel');
var prev = document.getElementById('prev-testimonial');
var next = document.getElementById('next-testimonial');
var indicators = document.querySelectorAll('.carousel-indicator');

var index = 0;
var total = tsCar.children.length;
var step = 100 / 5;

function updateCarousel() {
    // translateX
    tsCar.style.transform = `translateX(${index * step}%)`;

    // Dott Update
    indicators.forEach((dot, i) => {
        dot.classList.remove('active', 'bg-accent', 'scale-125');
        dot.classList.add('bg-slate-400');

        if (i === index) {
            dot.classList.add('active', 'bg-accent', 'scale-125');
            dot.classList.remove('bg-slate-400');
        }
    });
}

// Prev button
prev.addEventListener('click', () => {
    index = index === 0 ? total - 1 : index - 1;
    updateCarousel();
});

// Next button
next.addEventListener('click', () => {
    index = index === total - 1 ? 0 : index + 1;
    updateCarousel();
});

// Pollit Dott Click
indicators.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        index = i;
        updateCarousel();
    });
});

// Call Function
updateCarousel();


var allCustomSelect = document.querySelectorAll('.custom-select');

allCustomSelect.forEach(custom => {
    var name = custom.dataset.name;
    var optionsBox = document.querySelector(
        `.custom-options[aria-labelledby="${name}-label"]`
    );
    var selectedText = custom.querySelector('.selected-text');

    custom.addEventListener('click', () => {
        document.querySelectorAll('.custom-options')
            .forEach(opt => opt.classList.add('hidden'));

        optionsBox.classList.toggle('hidden');
    });

    optionsBox.addEventListener('click', (e) => {
        var option = e.target.closest('.custom-option');
        if (!option) return;

        selectedText.textContent = option.dataset.value;
        optionsBox.classList.add('hidden');
    });
});


var form = document.forms[0];
var fNameInput = document.getElementById('full-name');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');
var masgeInput = document.getElementById('project-details');

// Regex
var regexes = {
    name: /^[A-Za-zأ-ي\s]{2,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^\+?\d{7,15}$/,
    message: /^.{10,500}$/s
};

// Remove Old Error
function removeError(input) {
    var oldError = input.parentElement.querySelector('.error-message');
    if (oldError) oldError.remove();
}

// Show Inputs Error
function showError(input, message) {
    removeError(input);
    var errorMsg = document.createElement('p');
    errorMsg.className = "error-message text-red-400 text-sm mt-1";
    errorMsg.textContent = message;
    input.parentElement.appendChild(errorMsg);
    input.style.border = "2px solid red";
}

// Function validation
function validateFields() {
    var isValid = true;

    // Full Name Input
    if (!regexes.name.test(fNameInput.value.trim())) {
        showError(fNameInput, "يرجى إدخال الاسم الكامل (حروف فقط)");
        isValid = false;
    } else {
        removeError(fNameInput);
        fNameInput.style.border = "";
    }

    // Email Input
    if (!regexes.email.test(emailInput.value.trim())) {
        showError(emailInput, "يرجى إدخال بريد إلكتروني صحيح");
        isValid = false;
    } else {
        removeError(emailInput);
        emailInput.style.border = "";
    }

    // Phone Number
    if (!regexes.phone.test(phoneInput.value.trim())) {
        showError(phoneInput, "يرجى إدخال رقم هاتف صحيح");
        isValid = false;
    } else {
        removeError(phoneInput);
        phoneInput.style.border = "";
    }

    // Form Message
    if (!regexes.message.test(masgeInput.value.trim())) {
        showError(masgeInput, "يجب أن تكون الرسالة بين 10 و500 حرف");
        isValid = false;
    } else {
        removeError(masgeInput);
        masgeInput.style.border = "";
    }

    return isValid;
}

// Form Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateFields()) {
        showSuccessPopup();
    }
});

function removeError(input) {
    var oldError = input.parentElement.querySelector('.error-message');
    if (oldError) oldError.remove();
    input.style.border = "";
}

function showError(input, message) {
    removeError(input);
    var errorMsg = document.createElement('p');
    errorMsg.className = "error-message text-red-400 text-sm mt-1";
    errorMsg.textContent = message;
    input.parentElement.appendChild(errorMsg);
    input.style.border = "2px solid red";
}

[fNameInput, emailInput, phoneInput, masgeInput].forEach(input => {
    input.addEventListener('input', () => {
        removeError(input);
    });
});

function showSuccessPopup() {
    // overlay
    var overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.background = 'rgba(0,0,0,0.6)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';

    // popup
    var popup = document.createElement('div');
    popup.className =
        "bg-slate-800 rounded-2xl p-8 max-w-md mx-4 text-center border border-slate-700 shadow-2xl transform transition-all duration-300";
    popup.style.opacity = '0';
    popup.style.scale = '0.9';

    popup.innerHTML = `
        <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
            </svg>
        </div>

        <h3 class="text-2xl font-bold mb-3 text-white">
            تم إرسال رسالتك بنجاح!
        </h3>

        <p class="text-slate-400 mb-6">
            شكراً لتواصلك. سأرد عليك في أقرب وقت ممكن.
        </p>

        <button class="success-popup-close bg-gradient-to-r from-primary to-secondary px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300">
            حسناً
        </button>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // animate in
    requestAnimationFrame(() => {
        popup.style.opacity = '1';
        popup.style.scale = '1';
    });

    // close function
    function closePopup() {
        popup.style.opacity = '0';
        popup.style.scale = '0.9';
        setTimeout(() => overlay.remove(), 300);
    }

    // Close Button
    popup.querySelector('.success-popup-close')
        .addEventListener('click', closePopup);

    clearFormInputs(form);

    // Close Message After 5 sec
    setTimeout(closePopup, 5000);
}

function clearFormInputs(form) {
    var fields = form.querySelectorAll('input, textarea');

    fields.forEach(field => {
        field.value = '';
        field.style.border = '';
    });

    form.querySelectorAll('.error-message').forEach(error => error.remove());
}