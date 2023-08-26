import parse from 'html-react-parser';
import myJson from '../../../brand/tokens/clean.tokens.json' assert { type: 'json' };

const Jfile: any = myJson;

export interface IPalette {
  type: 'Blue' | 'Neutral' | 'Green' | 'Yellow' | 'Red';
  style: 'card' | 'list';
}
const WCAG_MINIMUM_RATIOS = [
  ['AA Large', 4.5],
  ['AA', 4.5],
  ['AAA', 7],
];

const meetsMinimumRequirements = (ratio: any) => {
  let didPass = false;
  let maxLevel = null;

  for (const [level, minRatio] of WCAG_MINIMUM_RATIOS) {
    if (ratio < minRatio) break;

    didPass = true;
    maxLevel = level;
  }

  return didPass;
};

const contrastRatio = (luminance1: any, luminance2: any) => {
  let lighterLum = Math.max(luminance1, luminance2);
  let darkerLum = Math.min(luminance1, luminance2);

  return (lighterLum + 0.05) / (darkerLum + 0.05);
};

const luminance = (r: any, g: any, b: any) => {
  let [lumR, lumG, lumB] = [r, g, b].map((component) => {
    let proportion = component / 255;

    return proportion <= 0.03928
      ? proportion / 12.92
      : Math.pow((proportion + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * lumR + 0.7152 * lumG + 0.0722 * lumB;
};

const checkContrast = (color1: any, color2: any) => {
  let [luminance1, luminance2] = [color1, color2].map((color) => {
    /* Remove the leading hash sign if it exists */
    color = color.startsWith('#') ? color.slice(1) : color;

    let r = parseInt(color.slice(0, 2), 16);
    let g = parseInt(color.slice(2, 4), 16);
    let b = parseInt(color.slice(4, 6), 16);

    return luminance(r, g, b);
  });

  return contrastRatio(luminance1, luminance2);
};

export const ColorPalette = ({ type = 'Blue', style = 'list' }: IPalette) => {
  let color = type.toLowerCase();
  let tokenData = Jfile[color];
  let tokenId, variable, ratio, didPass;

  let text =
    style === 'list'
      ? `<div class="row align-items-center justify-content-start">
                <div class="col-3 mb-2">Tokens</div>
                <div class="col-8 mb-2">Variables</div>
              </div>`
      : '';
  for (const property in tokenData) {
    tokenId = 1000 - parseInt(property);
    ratio = checkContrast('#21252d', tokenData[property].value);
    didPass = meetsMinimumRequirements(ratio);

    variable =
      color === 'neutral' && property !== 'white'
        ? `$gray-${tokenId}`
        : property.toLowerCase() === 'white'
        ? `$white`
        : color === 'blue'
        ? `$primary-${property}`
        : `$${color}-${property}`;

    let row = `<div class="row align-items-center justify-content-start">
          <div class="col-3"><h6 class="m-0 ${property}">$${color}-${property}</h6></div>
          <div class="col-3" style="background-color: ${
            tokenData[property].value
          }">
            <div class="row">
              <h6 class="col-12 my-2 ${property} ${
      didPass ? '' : 'text-white'
    }">
                <small class="fw-light">
                  ${tokenData[property].value} 
                </small><br />
                ${variable}
              </h6>
            </div>
        </div>
        <div class="col-6"><small>${
          tokenData[property].description !== undefined
            ? tokenData[property].description
            : ''
        }</small>
        </div>
      </div>`;
    text = text + row;
  }

  return <div>{parse(text) as string}</div>;
};

export default ColorPalette;
