export function convertUuidToPath(uuid: string): string {
    if (uuid) {
        return uuid.replace(/-/g, '_');
    }

    return uuid;
}

export function constructPathFromStrings(values: string[]): string {
    return values.map(convertUuidToPath).join('.');
}

export function constructPathWithTagId(path: string | undefined | null, tagId: string): string {
    return path ? constructPathFromStrings([path, tagId]) : convertUuidToPath(tagId);
}
