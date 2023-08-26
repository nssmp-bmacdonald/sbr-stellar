const getParentNode = (element, level = 1) => { 
    while (level-- > 0) {
      element = element.parentNode;
      if (!element) return null;
    }
    return element;
}

export default getParentNode;