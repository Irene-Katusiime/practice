console.log("Signup JS is running");

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("signupForm").addEventListener("submit", function (e) {
        const inputs = this.querySelectorAll("input, select");

        let hasEmpty = false;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add("error");
                hasEmpty = true;
            } else {
                input.classList.remove("error");
            }
        });

        if (hasEmpty) {
            e.preventDefault();
        }
    });
});