export interface host{
    node_id: number;
    name: string;
    ip: string;
    new_ip: string;
    selected: boolean;
};

export interface host_det {
    node_id: number;
    name: string;
    ip: string;
};

export interface host_app {
    node_id: number;
    name: string;
    ip: string;
    postgres: boolean;
    apache: boolean;
}