export type RouteType = {
    path: string,
    label: string,
    always?: boolean,
    authenticated?: boolean,
    admin?: boolean,
    no_authenticated?: boolean,
}