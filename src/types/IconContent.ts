export type IconContent = {
    iconContent: string;
    iconViewBox: string;
};

export type getIconContentType = (iconGroup: string, iconName: string) => IconContent