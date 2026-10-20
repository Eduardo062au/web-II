"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationServices = void 0;
class PaginationServices {
    static async paginate(repository, page = 1, limite = 10, order = {}) {
        const totalRecords = await repository.count();
        const lastPage = Math.ceil(totalRecords / limite);
        if (page > lastPage && lastPage > 0) {
            throw new Error(`Página Inválida. O total de páginas é ${lastPage}`);
        }
        const offset = (page - 1) * limite;
        const data = await repository.find({
            skip: offset,
            take: limite,
            order: order,
        });
        return {
            error: false,
            data: data,
            currentPage: page,
            lastPage: lastPage,
            totalItems: totalRecords
        };
    }
}
exports.PaginationServices = PaginationServices;
//# sourceMappingURL=PaginationServices.js.map