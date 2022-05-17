import WebStorage from "./scripts/WebStorage.js";

export const store = {
    memoryType: WebStorage.get('memoryType') || 'json',
    items: []
}