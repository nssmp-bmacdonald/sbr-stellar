import parse from 'html-react-parser';
import myJson from '../../../brand/tokens/clean.tokens.json' assert { type: 'json' };

const Jfile: any = myJson;

export interface ISpacing {
  type: 'outset' | 'inset';
}

export const Spacing = ({ type = 'outset' }: ISpacing) => {
  let text = '';
  let tokenData: any = {};
  let row = '';
  tokenData = Jfile['spacing'];
  tokenData = tokenData[type.toLowerCase()];
  let alt = false;

  text = `<div class="mb-5">
            <div class="row align-items-center justify-content-start">
              <div class="col-2">Name</div>
              <div class="col-3">Token</div>
              <div class="col-3">Variables</div>
              <div class="col-3 text-center">Value</div>
        `;
  for (const property in tokenData) {
    if (type === 'outset') {
      row = `<div class="row align-items-center justify-content-start mt-3">
                <div class="col-4">
                  <div style="width:50px;height:50px;border-radius:4px;border:1px solid #ced2db;display:flex;align-items: center;justify-content: center;"></div> 
                </div>
                <div class="col-3">$borderRadius-${property}</div>
                <div class="col-2">$border-radius-${property}</div>
                <div class="col-3 text-center">${tokenData[property].value}px</div>
            </div>`;
    }

    text = text + row;
    row = '';
  }

  text = text + `</div>`;

  text = text + `</div>`;

  return <div>{parse(text) as string}</div>;
};

export default Spacing;
