export interface Job {
    id?: number,
    name: string,
    type: string,
    publication_date: string,
    short_name: string,
    model_type: string,
    locations: [{ name: string }],
    categoris: [],
    levels: [],
    tags: [],
    company: { name: string, id: number, short_name: string },
    refs: {
        landing_page: string
    },
    contents: string
}

export interface JobResponse {
    page: number;
    page_count: number;
    items_per_page: number;
    total: number;
    results: Job[];
}