import parse from 'html-react-parser';
import myJson from '../../../brand/tokens/clean.tokens.json' assert { type: 'json' };

const Jfile: any = myJson;

export interface ITypeStyle {
  type: 'Heading' | 'Paragraph' | 'Quote';
}

export const Typography = ({ type = 'Heading' }: ITypeStyle) => {
  let text = '';
  let tokenData: any = {};
  let row = '';
  tokenData = Jfile['desktop'];
  tokenData = tokenData[type.toLowerCase()];
  let alt = false;

  text = `<div class="mb-5">`;
  for (const property in tokenData) {
    if (property.indexOf('-alt') === -1) {
      row = `<div class="row align-items-center justify-content-start">
                        <div class="col-12 content-section"><${
                          property === 'hero'
                            ? 'h1 class="display-2"'
                            : property
                        }>${property} ${
        tokenData[property].fontWeight.value.replace('}', '').split('.')[1]
      }</${property === 'hero' ? 'h1' : property}></div>
                    </div>`;
      text = text + row;
      row = '';
    } else {
      alt = true;
    }
  }
  text = text + `</div>`;

  if (alt) {
    text = text + `<div class="mb-4"><h2>Variations of ${type}</h2>`;

    for (const property in tokenData) {
      if (property.indexOf('-alt') > -1) {
        let row = `<div class="row align-items-center justify-content-start">
                          <div class="col-12 content-section"><${property} class="${property}">${property} ${
          tokenData[property].fontWeight.value.replace('}', '').split('.')[1]
        }</${property}></div>
                      </div>`;
        text = text + row;
      }
    }
  }

  text = text + `</div>`;

  return <div>{parse(text) as string}</div>;
};

export default Typography;
