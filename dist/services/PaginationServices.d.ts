import { Repository, ObjectLiteral, FindOptionsOrder } from 'typeorm';
interface PaginationResult<T> {
    error: boolean;
    data: T[];
    currentPage: number;
    lastPage: number;
    totalItems: number;
}
export declare class PaginationServices {
    static paginate<t extends ObjectLiteral>(repository: Repository<t>, page?: number, limite?: number, order?: FindOptionsOrder<t>): Promise<PaginationResult<t>>;
}
export {};
//# sourceMappingURL=PaginationServices.d.ts.map