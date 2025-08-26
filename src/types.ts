export interface Options {
    url: string;
    backend: string;
    target: string;
    config?: string;
    include?: string;
    exclude?: string;
    name?: string;
    emoji?: string;
    append_type?: string;
    append_info?: string;
    scv?: string;
    udp?: string;
    list?: string;
    sort?: string;
    fdn?: string;
    insert?: string;
}

declare const layui: any;
declare const $: any;

interface Window {
    BACKEND_CONFIG_ENV: string;
}
