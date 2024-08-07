export const isDefined = <T>(prop?: T): prop is T => prop !== null && prop !== undefined;
