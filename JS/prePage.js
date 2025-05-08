const radios = document.querySelectorAll('input[name="CorF"]');
const submitBtn = document.getElementById("submitBtn");
let selected; 
radios.forEach(radio => {
    radio.addEventListener("change", () => {
        selected = document.querySelector('input[name="CorF"]:checked');
        submitBtn.disabled = false;

    });

    document.getElementById("submitBtn").addEventListener("click", function () {
        if (selected && selected.value === "freelancer") {
        window.location.href = "../freelancerRegister.html";
        } else if (selected && selected.value === "client") {
        window.location.href = "../clientRegister.html";
        }
    });
});

