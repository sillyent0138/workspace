/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { PeopleService } from '../../services/PeopleService';
import { AuthManager } from '../../auth/AuthManager';
import { google } from 'googleapis';

// Mock the googleapis module
jest.mock('googleapis');
jest.mock('../../utils/logger');

describe('PeopleService', () => {
    let peopleService: PeopleService;
    let mockAuthManager: jest.Mocked<AuthManager>;
    let mockPeopleAPI: any;

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();

        // Create mock AuthManager
        mockAuthManager = {
            getAuthenticatedClient: jest.fn(),
        } as any;

        // Create mock People API
        mockPeopleAPI = {
            people: {
                get: jest.fn(),
            },
        };

        // Mock the google constructors
        (google.people as jest.Mock) = jest.fn().mockReturnValue(mockPeopleAPI);

        // Create PeopleService instance
        peopleService = new PeopleService(mockAuthManager);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('initialize', () => {
        it('should initialize People API client', async () => {
            const mockAuthClient = { access_token: 'test-token' };
            mockAuthManager.getAuthenticatedClient.mockResolvedValue(mockAuthClient as any);

            await peopleService.initialize();

            expect(mockAuthManager.getAuthenticatedClient).toHaveBeenCalledTimes(1);
            expect(google.people).toHaveBeenCalledWith(
                expect.objectContaining({
                    version: 'v1',
                    auth: mockAuthClient,
                })
            );
        });
    });

    describe('getUserProfile', () => {
        beforeEach(async () => {
            const mockAuthClient = { access_token: 'test-token' };
            mockAuthManager.getAuthenticatedClient.mockResolvedValue(mockAuthClient as any);
            await peopleService.initialize();
        });

        it('should return a user profile', async () => {
            const mockUser = {
                data: {
                    resourceName: 'people/110001608645105799644',
                    names: [{
                        displayName: 'Test User',
                    }],
                    emailAddresses: [{
                        value: 'test@example.com',
                    }],
                },
            };
            mockPeopleAPI.people.get.mockResolvedValue(mockUser);

            const result = await peopleService.getUserProfile({ userId: '110001608645105799644' });

            expect(mockPeopleAPI.people.get).toHaveBeenCalledWith({
                resourceName: 'people/110001608645105799644',
                personFields: 'names,emailAddresses',
            });
            expect(JSON.parse(result.content[0].text)).toEqual({ results: [{ person: mockUser.data }] });
        });

        it('should handle errors during getUserProfile', async () => {
            const apiError = new Error('API Error');
            mockPeopleAPI.people.get.mockRejectedValue(apiError);

            const result = await peopleService.getUserProfile({ userId: '110001608645105799644' });

            expect(JSON.parse(result.content[0].text)).toEqual({ error: 'API Error' });
        });
    });
});
