import myJson from '../../../brand/tokens/clean.tokens.json' assert {type: 'json'};

export const TypeStyle = ({
  type = 'Heading',
}) => {
  
  let text = '';
  let tokenData = {};
  let row = '';
  tokenData = myJson['desktop'];
      tokenData = tokenData[type.toLowerCase()];
  let alt = false;
  console.log(tokenData);

  text = `<div class="mb-5"><h2 class="text-capitalize mb-3">${type}</h2>
              `;
    for (const property in tokenData) {
      if (property.indexOf('-alt') === -1) {
        row = `<div class="row align-items-center justify-content-start">
                        <div class="col-12"><${(property === "hero") ? 'h1 class="display-2"' : property}>${property} ${tokenData[property].fontWeight.value.replace('}','').split('.')[1]}</${(property === "hero") ? 'h1' : property}></div>
                    </div>`;
        text = text + row;
        row = '';
      }else {
        alt = true;
      }
    }
    text = text + `</div>`;

    if (alt) {
      text = text + `<div class="mb-4"><h2>Variations of ${type}</h2>`;

      for (const property in tokenData) {
        if (property.indexOf('-alt') > -1) {
          let row = `<div class="row align-items-center justify-content-start">
                          <div class="col-12"><${property} class="${property}-alt">${property} ${tokenData[property].fontWeight.value.replace('}','').split('.')[1]}</${property}></div>
                      </div>`;
          text = text + row;
        }
      }
    }

    text = text + `</div>`;

    return `<div>${text}</div>`;
};
