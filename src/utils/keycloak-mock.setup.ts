import * as KeycloakMock from '@aktraore/keycloak-mock';

import { Config } from '../../config/default';

export async function initiliazeKeycloakMock() {
    const { authServerUrl, realm, clientId, secret } = new Config().keycloak;

    const keycloackMockInstance = await KeycloakMock.createMockInstance({
        authServerURL: authServerUrl,
        realm: realm,
        clientID: clientId,
        clientSecret: secret,
    });

    KeycloakMock.activateMock(keycloackMockInstance);

    keycloackMockInstance.database.createUser({
        id: '4255c2ae-3f11-4a26-a401-3981c8845df3',
        firstName: 'first',
        lastName: 'last',
        email: 'abdoulaye.traore@smartfit.com',
        credentials: [
            {
                type: KeycloakMock.MockUserCredentialType.PASSWORD,
                value: 'testPassword!',
            },
        ],
    });
}

export function cleanupKeycloakMock() {
    const { authServerUrl } = new Config().keycloak;

    KeycloakMock.deactivateMock(KeycloakMock.getMock(authServerUrl));
}

export function getMockInstance() {
    const { authServerUrl } = new Config().keycloak;

    const instance = KeycloakMock.getMockInstance(authServerUrl);

    return instance;
}
