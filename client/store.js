import WebStorage from "./scripts/WebStorage";

export const store = {
    memoryType: WebStorage.get('memoryType') || 'json',
    items: []
}