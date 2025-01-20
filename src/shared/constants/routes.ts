export const API = 'api';
export const version =  (version: string) => `v${version}`;

export const versionedAPI = (versionNumber: string) => `/${API}/${version(versionNumber)}`;