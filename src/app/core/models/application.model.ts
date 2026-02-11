export interface Application {
    id?: number,
    userId: number,
    offerId: number,
    apiSource: string,
    title: string,
    company: string,
    location: string,
    url: string,
    status: "pending" | "accepted" | "rejected",
    notes?: string,
    dateAdded: string
}