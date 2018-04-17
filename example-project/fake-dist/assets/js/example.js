'use strict';

document.addEventListener("DOMContentLoaded", function () {
  var emptySpan = document.getElementById('dynamic-content-span');
  if (!!emptySpan){
    emptySpan.innerHTML = 'Dynamic assigned content';
  }
})