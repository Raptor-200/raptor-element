export default function () {
  if (PROD) {
    const logo = `
______________________________________________________________________________________________________________

    ______                __                         _______  __                                 __   
    |   __ \.---.-..-----.|  |_ .-----..----. ______ |    ___||  |.-----..--------..-----..-----.|  |_ 
    |      <|  _  ||  _  ||   _||  _  ||   _||______||    ___||  ||  -__||        ||  -__||     ||   _|
    |___|__||___._||   __||____||_____||__|          |_______||__||_____||__|__|__||_____||__|__||____|
                  |__|                                                                                
______________________________________________________________________________________________________________
                               author:Raptor-ZYZ
`;

    const rainbowGradient = `
background: linear-gradient(135deg, orange 60%, cyan);
background-clip: text;
color: transparent;
font-size: 16px; 
line-height: 1;
font-family: monospace;
font-weight: 600;
`;

    console.info(`%c${logo}`, rainbowGradient);
  } else if (DEV) {
    console.log("[RaptorUI]:dev mode...");
  }
}