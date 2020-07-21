function openPage(page) {
    let element = document.getElementById(page);
  currentPage=page
  element.style.display="block"
    
  }
  function closePage(page) {
    let element = document.getElementById(page);
    element.parentNode.removeChild(element);
    
  }