export const DefaultColors = {
    // Typos
    typoDefault: "#191919",
    typoDefaultFn (mode?: string) { return mode == "dark" ? "#f0f0f0" : this.typoDefault},
    typoLight: "#5c5c5c",
    typoLightFn (mode?: string) { return mode == "dark" ? "#e0e0e0": this.typoLight},
    typoLighter: "#a8a8a8",
    typoLightest: "#c2c2c2",
    divider: "#e0e0e0",
    link: "#0060C9",
    linkHover: "#0080A9",
    // Status
    statusDefault: "#757575",
    statusInfo: "#1E88E5",
    statusWarning: "#FFB907",
    statusSuccsess: "#1D9C72",
    statusError: "#E53935",
    // Others
    backgroundColor: "#fff",
    backgroundColorFn (mode?: string) { return mode == "dark" ? "#101010": this.backgroundColor},
    appBackgroundColor: "#d8d8d8",
    appBackgroundColorFn (mode?: string) { return mode == "dark" ? "#242628": this.appBackgroundColor},
}