export const clx = (...classes: (string | undefined | false)[]) : string => {
    return classes.filter(Boolean).join(" ")
};