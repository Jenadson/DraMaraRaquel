    (function() {
      'use strict';

      // MOBILE MENU
      var hamburger = document.getElementById('hamburger');
      var navLinks = document.getElementById('navLinks');

      if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
          var isOpen = navLinks.classList.toggle('open');
          hamburger.classList.toggle('active');
          hamburger.setAttribute('aria-expanded', isOpen);
        });

        navLinks.querySelectorAll('a').forEach(function(link) {
          link.addEventListener('click', function() {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
          });
        });
      }

      // NAVBAR SCROLL EFFECT
      var navbar = document.getElementById('navbar');

      if (navbar) {
        window.addEventListener('scroll', function() {
          var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

          if (currentScroll > 100) {
            navbar.style.background = 'rgba(5,5,5,0.98)';
            navbar.style.borderBottomColor = 'rgba(200,157,102,0.2)';
          } else {
            navbar.style.background = 'rgba(5,5,5,0.96)';
            navbar.style.borderBottomColor = 'rgba(200,157,102,0.15)';
          }
        });
      }

      // BACK TO TOP
      var backToTop = document.getElementById('backToTop');

      if (backToTop) {
        window.addEventListener('scroll', function() {
          if (window.pageYOffset > 400) {
            backToTop.classList.add('visible');
          } else {
            backToTop.classList.remove('visible');
          }
        });

        backToTop.addEventListener('click', function() {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }

      // SCROLL REVEAL
      var revealElements = document.querySelectorAll('.reveal');

      function checkReveal() {
        var windowHeight = window.innerHeight;
        var revealPoint = 120;

        revealElements.forEach(function(el) {
          var rect = el.getBoundingClientRect();
          if (rect.top < windowHeight - revealPoint) {
            el.classList.add('active');
          }
        });
      }

      window.addEventListener('scroll', checkReveal);
      window.addEventListener('load', function() {
        setTimeout(checkReveal, 100);
      });

      // PHONE MASK
      var phoneInput = document.getElementById('phone');
      if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
          var value = e.target.value.replace(/\D/g, '');
          if (value.length <= 2) {
            e.target.value = '(' + value;
          } else if (value.length <= 7) {
            e.target.value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
          } else {
            e.target.value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7, 11);
          }
        });
      }

      // FORM SUBMISSION
      var contactForm = document.getElementById('contactForm');
      var formSuccess = document.getElementById('formSuccess');

      if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
          e.preventDefault();

          var name = document.getElementById('name').value.trim();
          var email = document.getElementById('email').value.trim();
          var phone = document.getElementById('phone').value.trim();
          var errors = [];

          if (!name) errors.push('Nome é obrigatório.');
          if (!email || !email.includes('@') || !email.includes('.')) errors.push('E-mail inválido.');
          if (!phone || phone.replace(/\D/g, '').length < 10) errors.push('Telefone inválido.');

          if (errors.length > 0) {
            alert('Por favor, corrija os seguintes campos:\n\n' + errors.join('\n'));
            return;
          }

          var btn = contactForm.querySelector('button[type="submit"]');
          var originalText = btn.innerHTML;
          btn.innerHTML = 'Enviando...';
          btn.disabled = true;

          var formData = {
            name: name,
            email: email,
            phone: phone,
            area: document.getElementById('area').value,
            message: document.getElementById('message').value.trim()
          };

          console.log('Form data:', formData);

          setTimeout(function() {
            contactForm.style.display = 'none';
            if (formSuccess) {
              formSuccess.classList.add('show');
            }
            btn.innerHTML = originalText;
            btn.disabled = false;
          }, 1500);
        });
      }

      // SMOOTH SCROLL FOR NAV ANCHORS
      document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
          var href = anchor.getAttribute('href');
          if (href === '#') return;
          var target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            var navHeight = navbar ? navbar.offsetHeight : 0;
            var targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
          }
        });
      });

    })();
