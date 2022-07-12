function changeAttributes() {
  let h2 = document.querySelector('h2');
  let p = document.querySelector('p');

  h2.removeAttribute('id');
  p.setAttribute('class', 'text');
}