import parse from 'html-react-parser';
import myJson from '../../../brand/tokens/clean.tokens.json' assert { type: 'json' };

const Jfile: any = myJson;

export interface IBoxStyle {
  type: 'Border' | 'Corner Radius' | 'Shadow';
}

export const BoxStyle = ({ type = 'Border' }: IBoxStyle) => {
  let text = '';
  let tokenData: any = {};
  let row = '';
  let value =
    type === 'Border'
      ? type.toLowerCase()
      : type === 'Corner Radius'
      ? 'borderRadius'
      : 'dropShadow';
  tokenData = Jfile[value];

  text = `<div class="mb-5">
            <div class="row align-items-center justify-content-start">
              <div class="col-2">Name</div>
              <div class="col-3">Tokens</div>
              <div class="col-3">Variables</div>
              <div class="col-3 text-center">Value</div>
        `;
  for (const property in tokenData) {
    if (type === 'Border') {
      if (tokenData[property].type === 'borderWidth') {
        row = `<div class="row align-items-center justify-content-start mt-3">
              <div class="col-2">
                <div style="width:50px;height:50px;border-radius:4px;border:${tokenData[property].value}px solid #ced2db;display:flex;align-items: center;justify-content: center;">${property}</div> 
              </div>
              <div class="col-3">$border-${property}</div>
              <div class="col-3">map-get($border-widths, ${tokenData[property].value})</div>
              <div class="col-3 text-center">${tokenData[property].value}px</div>
          </div>`;
      }
    } else if (type === 'Corner Radius') {
      row = `<div class="row align-items-center justify-content-start mt-3">
                  <div class="col-2">
                    <div style="width:50px;height:50px;border-radius:4px;border:1px solid #ced2db;display:flex;align-items: center;justify-content: center;"></div> 
                  </div>
                  <div class="col-3">$borderRadius-${property}</div>
                  <div class="col-3">$border-radius-${property}</div>
                  <div class="col-3 text-center">${tokenData[property].value}px</div>
              </div>`;
    } else {
      let val = '';
      let shadow = tokenData[property];
      for (const value in shadow) {
        if (value !== undefined || shadow[value].value !== undefined) {
          val = val + `${value}: ${shadow[value].value}<br>`;
        }
      }
      row = `<div class="row align-items-center justify-content-start mt-3">
                <div class="col-2">
                  <div class="shadow-${property}" style="width:50px;height:50px;border-radius:4px;border:1px solid #ced2db;display:flex;align-items: center;justify-content: center;">${property}</div> 
                </div>
                <div class="col-3">$dropShadow-${property}</div>
                <div class="col-3">$box-shadow-${property}</div>
                <div class="col-3">
                  ${val}
                </div>
        </div>`;
    }
    text = text + row;
    row = '';
  }
  text = text + `</div>`;

  text = text + `</div>`;

  return <div>{parse(text) as string}</div>;
};

export default BoxStyle;
