const iconPath = './icons/';

export const appAssets = {
  icons: {
    ic_eye_open: require(`${iconPath}ic_eye_open.png`),
    ic_eye_close: require(`${iconPath}ic_eye_close.png`),
    ic_google: require(`${iconPath}ic_google.png`),
    ic_apple: require(`${iconPath}ic_apple.png`),
    ic_edit: require(`${iconPath}ic_edit.png`),
    ic_delete: require(`${iconPath}ic_delete.png`),
    ic_filter: require(`${iconPath}ic_filter.png`),
    ic_logout: require(`${iconPath}ic_logout.png`),
    ic_add: require(`${iconPath}ic_add.png`),
    ic_check: require(`${iconPath}ic_check.png`),
    ic_back_arrow: require(`${iconPath}ic_back_arrow.png`),
  },
} as const;
