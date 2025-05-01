let eyeicons = document.getElementsByClassName("eyeicon");
let passes = document.getElementsByClassName("pass");

for (let i = 0; i < eyeicons.length; i++) {
  eyeicons[i].onclick = function() {
    if (passes[i].type === 'password') {
      passes[i].type = 'text';
      eyeicons[i].src = '../images/eye.png'
    } else {
      passes[i].type = 'password';
      eyeicons[i].src = '../images/visibility.png'

    }
  }
}

