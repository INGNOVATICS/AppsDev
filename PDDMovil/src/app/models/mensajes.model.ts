export interface Mensaje{
    key?: string,
    messageText: string
    metaId: string,
    metaName: string,
    requesterId: string,
    requesterName: string,
    responseText?: string,
    responserId: string,
    responserName: string,
    status?: number
  }