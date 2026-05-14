const iconPath = './icons/';

export const appAssets = {
  icons: {
    ic_eye_open: require(`${iconPath}ic_eye_open.png`),
    ic_eye_close: require(`${iconPath}ic_eye_close.png`),
    ic_google: require(`${iconPath}ic_google.png`),
    ic_apple: require(`${iconPath}ic_apple.png`),
    ic_back_arrow: require(`${iconPath}ic_back_arrow.png`),
  },
} as const;
