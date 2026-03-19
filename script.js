// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ===== FADE-IN ON SCROLL =====
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach(el => fadeObserver.observe(el));

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.querySelectorAll('a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-72px 0px 0px 0px' });

sections.forEach(section => navObserver.observe(section));

// ===== PRODUCT DATA =====
const productData = {
  'spinning-rings': {
    title: 'Spinning Rings',
    subtitle: 'High-precision spinning rings for spinning, doubling, and twisting machines',
    specs: [
      ['Material', 'High-strength alloy steel with high chromium & high carbon content'],
      ['Hardness', 'Optimized heat-treatment for perfect balance of hardness & toughness'],
      ['Surface Finish', 'Ultra-fine mirror polish with special anti-friction coating'],
      ['Speed Rating', 'Up to 22,000 RPM'],
      ['Size Range', '36mm to 285mm running diameter'],
      ['Ring Types', 'Flange Type, Solid Screw Fitting, Press Fitting, Reversible, Multi Groove, Conical, Self Lubricating with Aluminium Adopter, Reduced, Enlarge Ring'],
      ['Concentricity', 'Perfect concentricity to minimize vibration at high speeds'],
      ['Corrosion Protection', 'Special rust-preventive treatment for humid environments']
    ],
    customization: ['Any size or design per customer requirements', 'Special shapes & flange designs', 'Brand-specific compatibility', 'Bulk packaging options'],
    useCases: ['MEI/NMM Ring Frames', 'L.R Ring Frames', 'Saco-Lowell Machines', 'Heavy Doublers', 'Twisting machines']
  },
  'textile-spindles': {
    title: 'Textile Spindles',
    subtitle: 'Dynamically balanced spindles for high-speed textile operations',
    specs: [
      ['Material', 'EN31 steel blade, LM6 aluminium plug, EN24 alloy wharves'],
      ['Balancing', 'Two-plane soft bearing dynamic balancing for vibration-free operation'],
      ['Speed Rating', 'Up to 22,000 RPM (25,000 RPM in select models)'],
      ['Surface Treatment', 'Optional hard-chrome plating for rust prevention'],
      ['Bolsters', 'Premium bolsters – HD-44, HD-55, HD-66, HD-68 & HD-77'],
      ['Spindle Types', 'Aluminium Plug (Manual/Auto Doffing), Rabbeth (Bare Blade), Straight Built, Heavy-Duty, Extra Heavy-Duty'],
      ['Brake System', 'Custom-designed brake integration for better control'],
      ['Tolerance', '\u00b10.003mm concentricity']
    ],
    customization: ['Custom lengths & wharve profiles', 'Manual or Auto Doffing configurations', 'Germany-make or Indian-make bolsters', 'Brand-specific replacement compatibility'],
    useCases: ['Ring spinning frames', 'Ring doublers', 'Twisting machines', 'High-speed winding machines']
  },
  'lappet-hooks': {
    title: 'Lappet Hooks',
    subtitle: 'Precision-crafted hooks for smooth yarn guidance',
    specs: [
      ['Material', 'High-grade spring steel'],
      ['Surface Finish', 'Mirror-polished for smooth yarn passage'],
      ['Hardness', '55-58 HRC'],
      ['Treatment', 'Heat-treated and tempered'],
      ['Wire Diameter', '2mm to 6mm'],
      ['Hook Angle', 'Precision-formed angles per OEM spec'],
      ['Coating', 'Anti-wear ceramic coating available'],
      ['Compatibility', 'Universal and brand-specific designs']
    ],
    customization: ['Custom hook angles', 'Special wire gauges', 'Brand-specific patterns', 'Bulk roll packaging'],
    useCases: ['Ring spinning frames', 'Leno weaving machines', 'Yarn guiding systems', 'Compact spinning machines']
  },
  'machinery-parts': {
    title: 'Machinery Parts',
    subtitle: 'Custom-manufactured components for textile machinery',
    specs: [
      ['Materials', 'EN31 Steel, EN24 Alloy, Aluminium, Brass'],
      ['Manufacturing', 'CNC turning, VMC milling, grinding'],
      ['Accuracy', 'Up to \u00b10.002mm precision'],
      ['Finishes', 'Chrome plating, anodizing, powder coating'],
      ['Batch Size', 'Prototype to high-volume production'],
      ['Quality Check', 'CMM inspection available'],
      ['Lead Time', '2-4 weeks (standard orders)'],
      ['Documentation', 'Material certificates, inspection reports']
    ],
    customization: ['Reverse engineering from samples', 'CAD/CAM design support', 'Material alternatives', 'Special surface treatments'],
    useCases: ['Spindle brakes & brake liners', 'Flange type bobbins', 'Top rollers & calendar rollers', 'Scrolls, C-clamps & auto doffing cutters']
  }
};

// ===== MODAL FUNCTIONS =====
const modal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');

function openModal(productId) {
  const product = productData[productId];
  if (!product) return;

  let specsHTML = '';
  product.specs.forEach(function(spec) {
    specsHTML += '<tr><td>' + spec[0] + '</td><td>' + spec[1] + '</td></tr>';
  });

  let customHTML = '';
  product.customization.forEach(function(item) {
    customHTML += '<span>' + item + '</span>';
  });

  let useCaseHTML = '';
  product.useCases.forEach(function(item) {
    useCaseHTML += '<span>' + item + '</span>';
  });

  modalBody.innerHTML =
    '<h2>' + product.title + '</h2>' +
    '<p class="modal-subtitle">' + product.subtitle + '</p>' +
    '<h3>Technical Specifications</h3>' +
    '<table class="spec-table">' + specsHTML + '</table>' +
    '<h3>Customization Options</h3>' +
    '<div class="modal-tags">' + customHTML + '</div>' +
    '<h3>Applications</h3>' +
    '<div class="modal-tags">' + useCaseHTML + '</div>' +
    '<div class="modal-cta">' +
      '<a href="#contact" class="btn btn-primary" onclick="closeModal()">Request Quote</a>' +
      '<a href="https://wa.me/919924932073?text=Hi%2C%20I%27m%20interested%20in%20' + encodeURIComponent(product.title) + '.%20Please%20share%20details." class="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">WhatsApp Inquiry</a>' +
    '</div>';

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal on overlay click
modal.addEventListener('click', function(e) {
  if (e.target === modal) closeModal();
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

// ===== FORM HANDLING =====
function handleSubmit(e) {
  e.preventDefault();
  var form = e.target;
  var success = document.getElementById('formSuccess');

  // Show success message
  success.classList.add('show');

  // Reset form
  form.reset();

  // Hide success after 5 seconds
  setTimeout(function() {
    success.classList.remove('show');
  }, 5000);
}