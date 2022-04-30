export interface cpu_metric {
    measure: any[];
    time: string[];
    alerts: Set<string>;
}

export interface mem_metric {
    measure: any[];
    time: string[];
    alerts: Set<string>;
}

export interface net_metric {
    measure: any[];
    time: string[];
    alerts: Set<string>;
}

export interface postgres_metric{
    measure: any[];
    time: string[];
    alerts: Set<string>;
} 


export interface apache_metric{
    measure: any[];
    time: string[];
    alerts: Set<string>;
}  