export type RouteType = {
    path: string,
    label: string,
    always?: boolean,
    authenticated?: boolean,
    client?: boolean,
    admin?: boolean,
    no_authenticated?: boolean,
}