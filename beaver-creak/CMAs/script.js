document.querySelectorAll('.tab-buttons').forEach(buttonGroup => {
    const buttons = buttonGroup.querySelectorAll('.tab-btn');
    const section = buttonGroup.nextElementSibling;

    buttons.forEach(button => {
        button.addEventListener('click', () => {

            // Reset buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Hide panels
            section.querySelectorAll('.tab-panel').forEach(panel => {
                panel.classList.remove('active');
            });

            // Show target panel
            const target = button.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });
});
