import { Op, type WhereOptions } from 'sequelize';

import type { Establishment } from '../establishment/models/establishment.model';
import {
    EstablishmentSearchParams,
    SearchParams,
    SortOrder,
    SortParams,
} from '../typings/query.typings';
import type { User } from '../user/models/user.model';

export function transformSortParamsToSequelizeFormat(
    sortOptions: SortParams[],
): [string, SortOrder][] {
    return sortOptions.map(({ field, order }) => [field, order]);
}

export function buildUserSearchQuery(search?: SearchParams): WhereOptions<User> {
    if (!search) return {};

    const conditions = [];

    if (search?.firstName && !search?.nameSearch) {
        conditions.push({
            firstName: { [Op.iLike]: `%${search.firstName}%` },
        });
    }

    if (search?.lastName && !search?.nameSearch) {
        conditions.push({
            lastName: { [Op.iLike]: `%${search.lastName}%` },
        });
    }

    if (search?.email) {
        conditions.push({
            email: { [Op.iLike]: `%${search.email}%` },
        });
    }

    if (search?.phone) {
        conditions.push({
            phone: { [Op.iLike]: `%${search.phone.replace('+', '').trim()}%` },
        });
    }

    if (search?.nameSearch) {
        conditions.push(
            {
                firstName: { [Op.iLike]: `%${search.nameSearch}%` },
            },
            {
                lastName: { [Op.iLike]: `%${search.nameSearch}%` },
            },
        );
    }

    return conditions.length > 0 ? { [Op.or]: conditions } : {};
}

export function buildEstablishmentSearchQuery(
    search?: EstablishmentSearchParams,
): WhereOptions<Establishment> {
    if (!search) return {};

    const conditions = [];

    if (search.name && !search.nameSearch) {
        conditions.push({
            name: { [Op.iLike]: `%${search.name}%` },
        });
    }

    if (search.address && !search.locationSearch) {
        conditions.push({
            address: { [Op.iLike]: `%${search.address}%` },
        });
    }

    if (search.phone) {
        conditions.push({
            phone: { [Op.iLike]: `%${search.phone.replace('+', '').trim()}%` },
        });
    }

    if (search.city && !search.locationSearch) {
        conditions.push({
            city: { [Op.iLike]: `%${search.city}%` },
        });
    }

    if (search.country && !search.locationSearch) {
        conditions.push({
            country: { [Op.iLike]: `%${search.country}%` },
        });
    }

    if (search.nameSearch) {
        conditions.push({
            name: { [Op.iLike]: `%${search.nameSearch}%` },
        });
    }

    if (search.locationSearch) {
        conditions.push(
            {
                country: { [Op.iLike]: `%${search.locationSearch}%` },
            },
            {
                city: { [Op.iLike]: `%${search.locationSearch}%` },
            },
            {
                address: { [Op.iLike]: `%${search.locationSearch}%` },
            },
        );
    }

    return conditions.length > 0 ? { [Op.or]: conditions } : {};
}
