function toggleMenu() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            const toggle = document.getElementById('menuToggle');

            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            toggle.classList.toggle('active');
        }

        function closeMenu(event) {
            if (event) event.preventDefault();
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            const toggle = document.getElementById('menuToggle');

            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            toggle.classList.remove('active');
        }
        document.addEventListener('click', function(event) {
            const sidebar = document.getElementById('sidebar');
            const toggle = document.getElementById('menuToggle');
            
            if (!sidebar.contains(event.target) && !toggle.contains(event.target)) {
                closeMenu();
            }
        });