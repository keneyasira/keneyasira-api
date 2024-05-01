export function errorToPlainObject(error: Error) {
    return Object.assign(
        { name: error.name, message: error.message, stackTrace: error.stack },
        error,
    );
}
