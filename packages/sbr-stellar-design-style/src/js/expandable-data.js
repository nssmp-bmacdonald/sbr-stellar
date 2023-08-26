//
// Variables
//
const expandableButtons = document.querySelectorAll('[data-expand-button]');
const expandable = document.querySelectorAll('[data-toggle="data-expand"]');
const expandSmoothItems = document.querySelectorAll('[data-toggle="expand-smooth"]');
//
// Methods
//

function toggleText(e) {
  const expandableElement = e.target.closest('[data-expandable]')
  expandableElement.classList.toggle('expanded')
  setExpandButtonText(e.target)
}

function setExpandButtonText(button) {
  const expandableElement = button.closest('[data-expandable]')
  const expanded = expandableElement.classList.contains('expanded')
  button.innerText = expanded ? 'Read Less' : 'Read More'
}

//
// Inits & Event Listeners
//
expandableButtons.forEach(button => {
    button.addEventListener('click', toggleText)
    setExpandButtonText(button)
  })

  expandable.forEach((sExpandable) => {
    sExpandable.addEventListener("click", (event) => {
      if (event.currentTarget.hasAttribute('data-target')) {
          let mainTarget = document.getElementById(event.currentTarget.getAttribute('data-target'));
          let oldText = event.currentTarget.innerHTML;
      
          event.currentTarget.innerHTML = event.currentTarget.getAttribute('data-text');
          event.currentTarget.setAttribute('data-text', oldText);
          if (mainTarget.getAttribute('data-expanded') === "true" ) {
            mainTarget.setAttribute('data-expanded', "false");
            event.currentTarget.setAttribute('aria-expanded', "false");
          }else  {
            mainTarget.setAttribute('data-expanded', "true");
            event.currentTarget.setAttribute('aria-expanded', "true");
          } 
      }
    });
});

expandSmoothItems.forEach((itemsExpandable) => {
  itemsExpandable.addEventListener("click", (event) => {

    if (event.currentTarget.hasAttribute('data-target')) {
      let itemTarget = document.getElementsByClassName(event.currentTarget.getAttribute('data-target'));
      
      let oldText = event.currentTarget.firstChild.innerHTML;
      
      event.currentTarget.firstChild.innerHTML = event.currentTarget.getAttribute('data-text');
      event.currentTarget.setAttribute('data-text', oldText);

      if (event.currentTarget.getAttribute('data-expanded') === "true" ) {
        event.currentTarget.setAttribute('aria-expanded', "false");
      }else {
        event.currentTarget.setAttribute('aria-expanded', "true");
      }


      Array.from(itemTarget).forEach((items) => {
        if (items.getAttribute('data-expanded') === "true" ) {
          items.setAttribute('data-expanded', "false");
        }else  {
          items.setAttribute('data-expanded', "true");
        } 
      });
    }
  });
});
